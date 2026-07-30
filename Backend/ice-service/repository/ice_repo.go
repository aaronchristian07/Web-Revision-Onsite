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
	limit int
	page  int
}

func NewIceRepo(db *gorm.DB) IceRepoInterface {
	return &iceRepo{db: db}

}

func (i *iceRepo) CountIceCream(ctx context.Context, keyword string) (int64, error) {
	var total int64
	query := i.db.WithContext(ctx).Model(&model.IceCream{})
	if keyword != "" {
		like := "%" + keyword + "%"
		query = query.Where("ice_cream_name ILIKE ? OR ice_cream_flavor ILIKE ?", like, like)
	}
	err := query.Count(&total).Error
	return total, err
}

func (i *iceRepo) GetIceCreamMenu(ctx context.Context, keyword string, limit int, page int) ([]*model.IceCream, error) {
	var icecream []*model.IceCream
	query := i.db.WithContext(ctx)
	if keyword != "" {
		like := "%" + keyword + "%"
		query = query.Where("ice_cream_name ILIKE ? OR ice_cream_flavor ILIKE ?", like, like)
	}
	err := query.Scopes(newPaginate(limit, page).paginatedResult).Find(&icecream).Error
	return icecream, err
}

// CreateIceCream implements IceRepoInterface.
func (i *iceRepo) CreateIceCream(ctx context.Context, req *model.IceCream) error {
	return i.db.WithContext(ctx).Create(req).Error
}

// DeleteIceCream implements IceRepoInterface.
func (i *iceRepo) DeleteIceCream(ctx context.Context, id string) error {
	return i.db.WithContext(ctx).Delete(&model.IceCream{},"ice_cream_id= ?",id).Error
}

// UpdateIceCream implements IceRepoInterface.
func (i *iceRepo) UpdateIceCream(ctx context.Context, req *model.IceCream) error {
	return i.db.WithContext(ctx).Save(req).Error
}

// FindByID implements IceRepoInterface.
func (i *iceRepo) FindByID(ctx context.Context, id string) (*model.IceCream, error) {
	var icecream model.IceCream
	err := i.db.WithContext(ctx).Where("ice_cream_id = ?", id).First(&icecream).Error
	return &icecream, err
}

func newPaginate(limit int, page int) *paginate {
	return &paginate{limit: limit, page: page}
}

func (p *paginate) paginatedResult(db *gorm.DB) *gorm.DB {
	offset := (p.page - 1) * p.limit
	return db.Offset(offset).Limit(p.limit)
}
