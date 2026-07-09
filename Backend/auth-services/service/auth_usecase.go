package service

import (
	"context"
	"errors"
	"time"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/dto"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/model"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/repository"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type authService struct {
	repo      repository.AuthRepoInterface
	jwtSecret string
}

func NewAuthService(repo repository.AuthRepoInterface, jwtSecret string) AuthService {
	return &authService{repo: repo, jwtSecret: jwtSecret}
}

func (a *authService) generateAccessToken(userid, email, role string) (string, error) {
	claims := &jwtClaims{
		Email:  email,
		UserID: userid,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(5 * time.Minute)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(a.jwtSecret))
}

func (a *authService) Register(ctx context.Context, req *dto.RegisterRequest) (*dto.MessageResponse, error) {
	_, err := a.repo.FindByUsername(ctx, req.Username)
	if err == nil {
		return nil, errors.New("Sudah ada usernamenya")
	}

	_, err = a.repo.FindByEmail(ctx, req.Email)
	if err == nil {
		return nil, errors.New("Email sudah ada")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("bcrypt gagal")
	}

	user := &model.User{
		Username: req.Username,
		Password: string(hashedPassword),
		Email:    req.Email,
		Role:     "customer",
	}

	if err := a.repo.CreateUser(ctx, user); err != nil {
		return nil, errors.New("ga bisa buat akun gr gr reponya error")
	}

	return &dto.MessageResponse{
		Message: "Success",
	}, nil
}

func (a *authService) Login(ctx context.Context, req *dto.LoginRequest) (*dto.AuthResponse, error) {
	user, err := a.repo.FindByEmail(ctx, req.Email)
	if err != nil {
		return nil, errors.New("Tidak terdaftar di db ")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, errors.New("gagal bcrypt")
	}

	accessToken, err := a.generateAccessToken(user.ID, user.Email, user.Role)
	if err != nil {
		return nil, errors.New("generated accesstoken gagal")
	}

	refreshTokenID := uuid.New().String()
	refreshToken := &model.RefreshToken{
		UserID: user.ID,
		Email:  user.Email,
		Role:   user.Role,
		Token:  refreshTokenID,
	}

	if err := a.repo.SaveRefreshToken(ctx, refreshToken); err != nil {
		return nil, errors.New("gagal save refreshToken")
	}

	return &dto.AuthResponse{
		AccessToken:  accessToken,
		RefreshToken: refreshTokenID,
		UserID:       user.ID,
		Role:         user.Role,
	}, nil
}

func (a *authService) ValidateToken(ctx context.Context, token string) (*dto.ValidateTokenResponse, error) {
	ParsedToken, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		return []byte(a.jwtSecret), nil
	})

	if err != nil {
		return &dto.ValidateTokenResponse{
			Valid: false,
		}, nil
	}

	claims, ok := ParsedToken.Claims.(*jwtClaims)
	if !ok {
		return &dto.ValidateTokenResponse{
			Valid: false,
		}, nil
	}

	return &dto.ValidateTokenResponse{
		Valid:  true,
		Email:  claims.Email,
		UserID: claims.UserID,
		Role:   claims.Role,
	}, nil

}

func (a *authService) RefreshToken(ctx context.Context, token string) (*dto.AuthResponse, error) {
	storedToken, err := a.repo.FindRefreshToken(ctx, token)
	if err != nil {
		return nil, errors.New("Not find")
	}

	if time.Now().After(storedToken.ExpiresAt) {
		a.repo.DeleteRefreshToken(ctx, token)
		return nil, errors.New("refresh token gone")
	}

	user, err := a.repo.FindByID(ctx, storedToken.UserID)
	if err != nil {
		return nil, errors.New("tidak ketemu user itu")
	}

	accessToken, err := a.generateAccessToken(user.ID, user.Email, user.Role)
	if err != nil {
		return nil, errors.New("access token failed to generate")
	}

	return &dto.AuthResponse{
		AccessToken:  accessToken,
		RefreshToken: token,
		UserID:       user.ID,
		Role:         user.Role,
	}, nil
}
