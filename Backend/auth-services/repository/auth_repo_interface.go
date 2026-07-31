package repository

import (
	"context"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/model"
)

type AuthRepoInterface interface {
	CreateUser(ctx context.Context, req *model.User) error
	UpdateUser(ctx context.Context, req *model.User) error
	DeleteUser(ctx context.Context, id string) error

	FindByEmail(ctx context.Context, email string) (*model.User, error)
	FindByID(ctx context.Context, id string) (*model.User, error)
	FindByUsername(ctx context.Context, username string) (*model.User, error)

	SaveRefreshToken(ctx context.Context, token *model.RefreshToken) error
	FindRefreshToken(ctx context.Context, token string) (*model.RefreshToken, error)
	DeleteRefreshToken(ctx context.Context, token string) error
	DeleteRefreshTokensByUserID(ctx context.Context, userID string) error
}
