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
	ListOrdersByUser(ctx context.Context, userID string, page int, limit int) ([]*model.Order, int64, error)
	ListAllOrders(ctx context.Context, keyword string, status string, dateFrom string, dateTo string, page int, limit int) ([]*model.Order, int64, error)
	GetOrderByID(ctx context.Context, id string) (*model.Order, error)
	UpdateOrderStatus(ctx context.Context, id string, status string) error
	GetOrderStats(ctx context.Context) (totalRevenue int64, totalOrders int64, pendingOrders int64, err error)
}
