package repository

import (
	"context"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/model"
	"gorm.io/gorm"
)

type iceRepo struct {
	db *gorm.DB
}

type paginate struct {
	limit	int
	page 	int
}

func NewIceRepo(db *gorm.DB) IceRepoInterface {
	return &iceRepo{db: db}
}

// CreateIceCream implements IceRepoInterface.
func (i *iceRepo) CreateIceCream(ctx context.Context, req *model.IceCream) error {
	return i.db.WithContext(ctx).Create(req).Error
}

// DeleteIceCream implements IceRepoInterface.
func (i *iceRepo) DeleteIceCream(ctx context.Context, id string) error {
	return i.db.WithContext(ctx).Delete(&id).Error
}

// UpdateIceCream implements IceRepoInterface.
func (i *iceRepo) UpdateIceCream(ctx context.Context, req *model.IceCream) error {
	return i.db.WithContext(ctx).Save(req).Error
}

// FindByID implements IceRepoInterface.
func (i *iceRepo) FindByID(ctx context.Context, id string) (*model.IceCream, error) {
	var icecream model.IceCream
	err := i.db.WithContext(ctx).Where("id = ?", id).First(&icecream).Error
	return &icecream, err
}

// GetIceCreamMenu implements IceRepoInterface.
func (i *iceRepo) GetIceCreamMenu(ctx context.Context, limit int, page int) ([]*model.IceCream, error) {
	var icecream []*model.IceCream
	err := i.db.WithContext(ctx).Scopes(newPaginate(limit, page).paginatedResult).Find(&icecream).Error
	return icecream, err
}

func newPaginate(limit int, page int) *paginate {
   return &paginate{limit: limit, page: page}
}

func (p *paginate) paginatedResult(db *gorm.DB) *gorm.DB {
   offset := (p.page - 1) * p.limit
   return db.Offset(offset).Limit(p.limit)
}