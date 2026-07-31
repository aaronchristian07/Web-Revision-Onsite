package dto

import "time"

type AddToCartRequest struct {
	IceCreamID    string `json:"ice_cream_id" binding:"required"`
	IceCreamName  string `json:"ice_cream_name" binding:"required"`
	IceCreamPrice int    `json:"ice_cream_price" binding:"required"`
	Quantity      int    `json:"quantity" binding:"required,min=1"`
}

type UpdateCartItemRequest struct {
	CartItemID string `json:"cart_item_id" binding:"required"`
	Quantity   int    `json:"quantity"`
	Selected   *bool  `json:"selected"`
}

type RemoveCartItemRequest struct {
	CartItemID string `json:"cart_item_id"`
}

type GetCartRequest struct {
	Page  int `form:"page"`
	Limit int `form:"limit"`
}

type CartItemResponse struct {
	ID            string `json:"id"`
	IceCreamID    string `json:"ice_cream_id"`
	IceCreamName  string `json:"ice_cream_name"`
	IceCreamPrice int    `json:"ice_cream_price"`
	Quantity      int    `json:"quantity"`
	Selected      bool   `json:"selected"`
	Subtotal      int    `json:"subtotal"`
}

type GetCartResponse struct {
	Items              []CartItemResponse `json:"items"`
	TotalItems         int64              `json:"total_items"`
	SelectedTotalPrice int                `json:"selected_total_price"`
	Page               int                `json:"page"`
	Limit              int                `json:"limit"`
}

type CheckoutRequest struct {
	CartItemIDs []string `json:"cart_item_ids"`
}

type CheckoutResponse struct {
	OrderID    string `json:"order_id"`
	TotalPrice int    `json:"total_price"`
	Status     string `json:"status"`
	Message    string `json:"message"`
}

type MessageResponse struct {
	Message string `json:"message"`
}

type OrderItemResponse struct {
	IceCreamID    string `json:"ice_cream_id"`
	IceCreamName  string `json:"ice_cream_name"`
	IceCreamPrice int    `json:"ice_cream_price"`
	Quantity      int    `json:"quantity"`
	Subtotal      int    `json:"subtotal"`
}

type OrderResponse struct {
	ID         string              `json:"id"`
	Username   string              `json:"username"`
	Status     string              `json:"status"`
	TotalPrice int                 `json:"total_price"`
	CreatedAt  time.Time           `json:"created_at"`
	Items      []OrderItemResponse `json:"items"`
}

type ListOrdersRequest struct {
	Keyword  string `form:"keyword"`
	Status   string `form:"status"`
	DateFrom string `form:"date_from"`
	DateTo   string `form:"date_to"`
	Page     int    `form:"page"`
	Limit    int    `form:"limit"`
}

type ListOrdersResponse struct {
	Items []OrderResponse `json:"items"`
	Total int64           `json:"total"`
}

type UpdateOrderStatusRequest struct {
	Status string `json:"status" binding:"required"`
}

type OrderStatsResponse struct {
	TotalRevenue  int64 `json:"total_revenue"`
	TotalOrders   int64 `json:"total_orders"`
	PendingOrders int64 `json:"pending_orders"`
}
