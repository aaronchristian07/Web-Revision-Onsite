package http

import (
	"net/http"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/dto"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/services"
	"github.com/gin-gonic/gin"
)

type PaymentHandler struct {
	svc services.PaymentService
}

func NewPaymentHandler(svc services.PaymentService) *PaymentHandler {
	return &PaymentHandler{svc: svc}
}

func (h *PaymentHandler) AddToCart(c *gin.Context) {
	userID := c.GetString("user_id")
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id tidak ditemukan"})
		return
	}

	var req dto.AddToCartRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := h.svc.AddToCart(c.Request.Context(), userID, &req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, resp)
}

func (h *PaymentHandler) GetCart(c *gin.Context) {
	userID := c.GetString("user_id")
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id tidak ditemukan"})
		return
	}

	var req dto.GetCartRequest
	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := h.svc.GetCart(c.Request.Context(), userID, &req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, resp)
}

func (h *PaymentHandler) UpdateCartItem(c *gin.Context) {
	userID := c.GetString("user_id")
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id tidak ditemukan"})
		return
	}

	var req dto.UpdateCartItemRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	resp, err := h.svc.UpdateCartItem(c.Request.Context(), userID, &req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, resp)
}

func (h *PaymentHandler) RemoveCartItem(c *gin.Context) {
	userID := c.GetString("user_id")
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id tidak ditemukan"})
		return
	}

	itemID := c.Param("id")
	if itemID == "" {
		var req dto.RemoveCartItemRequest
		if err := c.ShouldBindJSON(&req); err == nil && req.CartItemID != "" {
			itemID = req.CartItemID
		}
	}

	if itemID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id item keranjang wajib diisi"})
		return
	}

	resp, err := h.svc.RemoveCartItem(c.Request.Context(), userID, itemID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, resp)
}

func (h *PaymentHandler) Checkout(c *gin.Context) {
	userID := c.GetString("user_id")
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user_id tidak ditemukan"})
		return
	}

	var req dto.CheckoutRequest
	_ = c.ShouldBindJSON(&req)

	resp, err := h.svc.Checkout(c.Request.Context(), userID, &req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, resp)
}
