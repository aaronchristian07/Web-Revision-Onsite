package repository

import (
	"context"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/model"
	"gorm.io/gorm"
)

type authRepo struct {
	db *gorm.DB
}

func NewAuthRepo(db *gorm.DB) AuthRepoInterface {
	return &authRepo{db: db}
}

func (a *authRepo) CreateUser(ctx context.Context, req *model.User) error {
	return a.db.WithContext(ctx).Create(req).Error
}

func (a *authRepo) UpdateUser(ctx context.Context, req *model.User) error {
	return a.db.WithContext(ctx).Save(req).Error
}

func (a *authRepo) FindByEmail(ctx context.Context, email string) (*model.User, error) {
	var user model.User
	err := a.db.WithContext(ctx).Where("email = ?", email).First(&user).Error
	return &user, err
}

func (a *authRepo) FindByID(ctx context.Context, id string) (*model.User, error) {
	var user model.User
	err := a.db.WithContext(ctx).Where("id = ?", id).First(&user).Error
	return &user, err
}

func (a *authRepo) FindByUsername(ctx context.Context, username string) (*model.User, error) {
	var user model.User
	err := a.db.WithContext(ctx).Where("username = ?", username).First(&user).Error
	return &user, err
}

func (a *authRepo) SaveRefreshToken(ctx context.Context, token *model.RefreshToken) error {
	return a.db.WithContext(ctx).Create(token).Error
}

func (a *authRepo) FindRefreshToken(ctx context.Context, token string) (*model.RefreshToken, error) {
	var rt model.RefreshToken
	err := a.db.WithContext(ctx).Where("token = ?", token).First(&rt).Error
	return &rt, err
}

func (a *authRepo) DeleteRefreshToken(ctx context.Context, token *model.RefreshToken) error {
	return a.db.WithContext(ctx).Where("token = ?", token).Delete(&model.RefreshToken{}).Error
}
