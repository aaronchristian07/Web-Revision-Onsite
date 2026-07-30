package repository

import (
	"context"
	"errors"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/model"
	"gorm.io/gorm"
)

type paymentRepo struct {
	db *gorm.DB
}

func NewPaymentRepo(db *gorm.DB) PaymentRepoInterface {
	return &paymentRepo{db: db}
}

func (r *paymentRepo) AddToCart(ctx context.Context, item *model.CartItem) error {
	var existing model.CartItem
	err := r.db.WithContext(ctx).
		Where("user_id = ? AND ice_cream_id = ?", item.UserID, item.IceCreamID).
		First(&existing).Error

	if err == nil {
		existing.Quantity += item.Quantity
		existing.IceCreamPrice = item.IceCreamPrice
		existing.IceCreamName = item.IceCreamName
		return r.db.WithContext(ctx).Save(&existing).Error
	}

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return r.db.WithContext(ctx).Create(item).Error
	}

	return err
}

func (r *paymentRepo) GetCartItems(ctx context.Context, userID string, limit int, page int) ([]*model.CartItem, error) {
	var items []*model.CartItem
	offset := (page - 1) * limit
	err := r.db.WithContext(ctx).
		Where("user_id = ?", userID).
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&items).Error
	return items, err
}

func (r *paymentRepo) CountCartItems(ctx context.Context, userID string) (int64, error) {
	var total int64
	err := r.db.WithContext(ctx).
		Model(&model.CartItem{}).
		Where("user_id = ?", userID).
		Count(&total).Error
	return total, err
}

func (r *paymentRepo) GetSelectedItemsTotalPrice(ctx context.Context, userID string) (int, error) {
	var total int
	row := r.db.WithContext(ctx).
		Model(&model.CartItem{}).
		Select("COALESCE(SUM(ice_cream_price * quantity), 0)").
		Where("user_id = ? AND selected = ?", userID, true).
		Row()

	err := row.Scan(&total)
	return total, err
}

func (r *paymentRepo) GetCartItemByID(ctx context.Context, id string) (*model.CartItem, error) {
	var item model.CartItem
	err := r.db.WithContext(ctx).Where("id = ?", id).First(&item).Error
	return &item, err
}

func (r *paymentRepo) FindCartItem(ctx context.Context, userID string, iceCreamID string) (*model.CartItem, error) {
	var item model.CartItem
	err := r.db.WithContext(ctx).Where("user_id = ? AND ice_cream_id = ?", userID, iceCreamID).First(&item).Error
	return &item, err
}

func (r *paymentRepo) UpdateCartItem(ctx context.Context, item *model.CartItem) error {
	return r.db.WithContext(ctx).Save(item).Error
}

func (r *paymentRepo) DeleteCartItem(ctx context.Context, id string, userID string) error {
	return r.db.WithContext(ctx).
		Where("id = ? AND user_id = ?", id, userID).
		Delete(&model.CartItem{}).Error
}

func (r *paymentRepo) CreateOrderWithItems(ctx context.Context, order *model.Order, cartItemIDs []string) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		var cartItems []model.CartItem
		query := tx.Where("user_id = ?", order.UserID)

		if len(cartItemIDs) > 0 {
			query = query.Where("id IN ?", cartItemIDs)
		} else {
			query = query.Where("selected = ?", true)
		}

		if err := query.Find(&cartItems).Error; err != nil {
			return err
		}

		if len(cartItems) == 0 {
			return errors.New("tidak ada barang di keranjang yang dipilih untuk checkout")
		}

		var totalPrice int
		var orderItems []model.OrderItem
		var deleteIDs []string

		for _, item := range cartItems {
			subtotal := item.IceCreamPrice * item.Quantity
			totalPrice += subtotal
			deleteIDs = append(deleteIDs, item.ID)

			orderItems = append(orderItems, model.OrderItem{
				IceCreamID:    item.IceCreamID,
				IceCreamName:  item.IceCreamName,
				IceCreamPrice: item.IceCreamPrice,
				Quantity:      item.Quantity,
				Subtotal:      subtotal,
			})
		}

		order.TotalPrice = totalPrice
		order.Status = "PAID"

		if err := tx.Create(order).Error; err != nil {
			return err
		}

		for i := range orderItems {
			orderItems[i].OrderID = order.ID
		}

		if err := tx.Create(&orderItems).Error; err != nil {
			return err
		}

		if err := tx.Where("id IN ?", deleteIDs).Delete(&model.CartItem{}).Error; err != nil {
			return err
		}

		return nil
	})
}
