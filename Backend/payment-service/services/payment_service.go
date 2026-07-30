package services

import (
	"context"
	"errors"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/dto"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/model"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/repository"
)

type paymentService struct {
	repo repository.PaymentRepoInterface
}

func NewPaymentService(repo repository.PaymentRepoInterface) PaymentService {
	return &paymentService{repo: repo}
}

func (s *paymentService) AddToCart(ctx context.Context, userID string, req *dto.AddToCartRequest) (*dto.MessageResponse, error) {
	if req.IceCreamID == "" {
		return nil, errors.New("ice_cream_id tidak boleh kosong")
	}
	if req.Quantity <= 0 {
		return nil, errors.New("jumlah barang harus lebih dari 0")
	}

	item := &model.CartItem{
		UserID:        userID,
		IceCreamID:    req.IceCreamID,
		IceCreamName:  req.IceCreamName,
		IceCreamPrice: req.IceCreamPrice,
		Quantity:      req.Quantity,
		Selected:      true,
	}

	if err := s.repo.AddToCart(ctx, item); err != nil {
		return nil, errors.New("gagal menambahkan ke keranjang")
	}

	return &dto.MessageResponse{
		Message: "Berhasil menambahkan es krim ke keranjang",
	}, nil
}

func (s *paymentService) GetCart(ctx context.Context, userID string, req *dto.GetCartRequest) (*dto.GetCartResponse, error) {
	limit := req.Limit
	if limit <= 0 {
		limit = 10
	}
	page := req.Page
	if page <= 0 {
		page = 1
	}

	items, err := s.repo.GetCartItems(ctx, userID, limit, page)
	if err != nil {
		return nil, errors.New("gagal mengambil keranjang")
	}

	totalItems, err := s.repo.CountCartItems(ctx, userID)
	if err != nil {
		return nil, errors.New("gagal menghitung item keranjang")
	}

	selectedTotalPrice, err := s.repo.GetSelectedItemsTotalPrice(ctx, userID)
	if err != nil {
		return nil, errors.New("gagal menghitung total harga pilihan")
	}

	itemResponses := make([]dto.CartItemResponse, 0, len(items))
	for _, item := range items {
		itemResponses = append(itemResponses, dto.CartItemResponse{
			ID:            item.ID,
			IceCreamID:    item.IceCreamID,
			IceCreamName:  item.IceCreamName,
			IceCreamPrice: item.IceCreamPrice,
			Quantity:      item.Quantity,
			Selected:      item.Selected,
			Subtotal:      item.IceCreamPrice * item.Quantity,
		})
	}

	return &dto.GetCartResponse{
		Items:              itemResponses,
		TotalItems:         totalItems,
		SelectedTotalPrice: selectedTotalPrice,
		Page:               page,
		Limit:              limit,
	}, nil
}

func (s *paymentService) UpdateCartItem(ctx context.Context, userID string, req *dto.UpdateCartItemRequest) (*dto.MessageResponse, error) {
	item, err := s.repo.GetCartItemByID(ctx, req.CartItemID)
	if err != nil {
		return nil, errors.New("item keranjang tidak ditemukan")
	}

	if item.UserID != userID {
		return nil, errors.New("tidak memiliki akses ke item ini")
	}

	if req.Quantity > 0 {
		item.Quantity = req.Quantity
	}

	if req.Selected != nil {
		item.Selected = *req.Selected
	}

	if err := s.repo.UpdateCartItem(ctx, item); err != nil {
		return nil, errors.New("gagal memperbarui item keranjang")
	}

	return &dto.MessageResponse{
		Message: "Berhasil memperbarui item keranjang",
	}, nil
}

func (s *paymentService) RemoveCartItem(ctx context.Context, userID string, itemID string) (*dto.MessageResponse, error) {
	if itemID == "" {
		return nil, errors.New("id item keranjang wajib diisi")
	}

	if err := s.repo.DeleteCartItem(ctx, itemID, userID); err != nil {
		return nil, errors.New("gagal menghapus item dari keranjang")
	}

	return &dto.MessageResponse{
		Message: "Berhasil menghapus item dari keranjang",
	}, nil
}

func (s *paymentService) Checkout(ctx context.Context, userID string, username string, req *dto.CheckoutRequest) (*dto.CheckoutResponse, error) {
	order := &model.Order{
		UserID:   userID,
		Username: username,
	}

	if err := s.repo.CreateOrderWithItems(ctx, order, req.CartItemIDs); err != nil {
		return nil, err
	}

	return &dto.CheckoutResponse{
		OrderID:    order.ID,
		TotalPrice: order.TotalPrice,
		Status:     order.Status,
		Message:    "Checkout berhasil diproses",
	}, nil
}

func toOrderResponse(o *model.Order) dto.OrderResponse {
	items := make([]dto.OrderItemResponse, 0, len(o.OrderItems))
	for _, item := range o.OrderItems {
		items = append(items, dto.OrderItemResponse{
			IceCreamID:    item.IceCreamID,
			IceCreamName:  item.IceCreamName,
			IceCreamPrice: item.IceCreamPrice,
			Quantity:      item.Quantity,
			Subtotal:      item.Subtotal,
		})
	}

	return dto.OrderResponse{
		ID:         o.ID,
		Username:   o.Username,
		Status:     o.Status,
		TotalPrice: o.TotalPrice,
		CreatedAt:  o.CreatedAt,
		Items:      items,
	}
}

func (s *paymentService) ListMyOrders(ctx context.Context, userID string, req *dto.ListOrdersRequest) (*dto.ListOrdersResponse, error) {
	limit := req.Limit
	if limit <= 0 {
		limit = 10
	}
	page := req.Page
	if page <= 0 {
		page = 1
	}

	orders, total, err := s.repo.ListOrdersByUser(ctx, userID, page, limit)
	if err != nil {
		return nil, errors.New("gagal mengambil daftar transaksi")
	}

	items := make([]dto.OrderResponse, 0, len(orders))
	for _, o := range orders {
		items = append(items, toOrderResponse(o))
	}

	return &dto.ListOrdersResponse{Items: items, Total: total}, nil
}

func (s *paymentService) ListAllOrders(ctx context.Context, req *dto.ListOrdersRequest) (*dto.ListOrdersResponse, error) {
	limit := req.Limit
	if limit <= 0 || limit > 25 {
		limit = 25
	}
	page := req.Page
	if page <= 0 {
		page = 1
	}

	orders, total, err := s.repo.ListAllOrders(ctx, req.Keyword, req.Status, req.DateFrom, req.DateTo, page, limit)
	if err != nil {
		return nil, errors.New("gagal mengambil daftar transaksi")
	}

	items := make([]dto.OrderResponse, 0, len(orders))
	for _, o := range orders {
		items = append(items, toOrderResponse(o))
	}

	return &dto.ListOrdersResponse{Items: items, Total: total}, nil
}

func (s *paymentService) UpdateOrderStatus(ctx context.Context, userID string, role string, orderID string, status string) (*dto.MessageResponse, error) {
	if status == "" {
		return nil, errors.New("status wajib diisi")
	}

	order, err := s.repo.GetOrderByID(ctx, orderID)
	if err != nil {
		return nil, errors.New("transaksi tidak ditemukan")
	}

	if role != "admin" && order.UserID != userID {
		return nil, errors.New("tidak memiliki akses ke transaksi ini")
	}

	if err := s.repo.UpdateOrderStatus(ctx, orderID, status); err != nil {
		return nil, errors.New("gagal memperbarui status transaksi")
	}

	return &dto.MessageResponse{Message: "Berhasil memperbarui status transaksi"}, nil
}

func (s *paymentService) GetOrderStats(ctx context.Context) (*dto.OrderStatsResponse, error) {
	totalRevenue, totalOrders, pendingOrders, err := s.repo.GetOrderStats(ctx)
	if err != nil {
		return nil, errors.New("gagal mengambil statistik transaksi")
	}

	return &dto.OrderStatsResponse{
		TotalRevenue:  totalRevenue,
		TotalOrders:   totalOrders,
		PendingOrders: pendingOrders,
	}, nil
}
