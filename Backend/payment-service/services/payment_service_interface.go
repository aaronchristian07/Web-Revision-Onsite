package services

import (
	"context"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/dto"
)

type PaymentService interface {
	AddToCart(ctx context.Context, userID string, req *dto.AddToCartRequest) (*dto.MessageResponse, error)
	GetCart(ctx context.Context, userID string, req *dto.GetCartRequest) (*dto.GetCartResponse, error)
	UpdateCartItem(ctx context.Context, userID string, req *dto.UpdateCartItemRequest) (*dto.MessageResponse, error)
	RemoveCartItem(ctx context.Context, userID string, itemID string) (*dto.MessageResponse, error)
	Checkout(ctx context.Context, userID string, username string, req *dto.CheckoutRequest) (*dto.CheckoutResponse, error)
	ListMyOrders(ctx context.Context, userID string, req *dto.ListOrdersRequest) (*dto.ListOrdersResponse, error)
	ListAllOrders(ctx context.Context, req *dto.ListOrdersRequest) (*dto.ListOrdersResponse, error)
	UpdateOrderStatus(ctx context.Context, userID string, role string, orderID string, status string) (*dto.MessageResponse, error)
	GetOrderStats(ctx context.Context) (*dto.OrderStatsResponse, error)
}
