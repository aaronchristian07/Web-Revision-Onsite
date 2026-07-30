package repository

import (
	"context"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/model"
)

type IceRepoInterface interface {
	CreateIceCream(ctx context.Context, req *model.IceCream) error
	UpdateIceCream(ctx context.Context, req *model.IceCream) error
	DeleteIceCream(ctx context.Context, id string) error
	FindByID(ctx context.Context, id string) (*model.IceCream, error)
	CountIceCream(ctx context.Context , keyword string) (int64,error)
	GetIceCreamMenu(ctx context.Context, keyword string, limit int, page int) ([]*model.IceCream, error)
}
