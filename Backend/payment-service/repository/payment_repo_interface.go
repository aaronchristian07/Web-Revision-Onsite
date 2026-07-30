package repository

import (
	"context"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/model"
)

type PaymentRepoInterface interface {
	AddToCart(ctx context.Context, item *model.CartItem) error
	GetCartItems(ctx context.Context, userID string, limit int, page int) ([]*model.CartItem, error)
	CountCartItems(ctx context.Context, userID string) (int64, error)
	GetSelectedItemsTotalPrice(ctx context.Context, userID string) (int, error)
	GetCartItemByID(ctx context.Context, id string) (*model.CartItem, error)
	FindCartItem(ctx context.Context, userID string, iceCreamID string) (*model.CartItem, error)
	UpdateCartItem(ctx context.Context, item *model.CartItem) error
	DeleteCartItem(ctx context.Context, id string, userID string) error
	CreateOrderWithItems(ctx context.Context, order *model.Order, cartItemIDs []string) error
}
