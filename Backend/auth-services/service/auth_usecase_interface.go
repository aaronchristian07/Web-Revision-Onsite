package service

import (
	"context"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/dto"
)

type AuthService interface {
	Register(ctx context.Context, req *dto.RegisterRequest) (*dto.MessageResponse, error)
	Login(ctx context.Context, req *dto.LoginRequest) (*dto.AuthResponse, error)
	ValidateToken(ctx context.Context, token string) (*dto.ValidateTokenResponse, error)
	RefreshToken(ctx context.Context, token string) (*dto.AuthResponse, error)
}
