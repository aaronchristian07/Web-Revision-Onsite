package main

import (
	"log"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/config"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/handler/http"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/middleware"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/model"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/repository"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/payment-service/services"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	cfg := config.Load()

	db, err := gorm.Open(postgres.Open(cfg.DBString))
	if err != nil {
		log.Fatalf("failed to connect to db: %s", err)
	}

	if err := db.AutoMigrate(&model.CartItem{}, &model.Order{}, &model.OrderItem{}); err != nil {
		log.Fatalf("failed to migrate database: %s", err)
	}

	paymentRepo := repository.NewPaymentRepo(db)
	paymentSvc := services.NewPaymentService(paymentRepo)
	paymentHandler := http.NewPaymentHandler(paymentSvc)

	router := gin.Default()
	router.GET("/health", func(c *gin.Context) {
		c.Status(200)
	})

	paymentGroup := router.Group("/payment", middleware.AuthMiddleware(cfg.JWTSecret))
	{
		paymentGroup.POST("/cart", paymentHandler.AddToCart)
		paymentGroup.GET("/cart", paymentHandler.GetCart)
		paymentGroup.PUT("/cart", paymentHandler.UpdateCartItem)
		paymentGroup.DELETE("/cart", paymentHandler.RemoveCartItem)
		paymentGroup.DELETE("/cart/:id", paymentHandler.RemoveCartItem)
		paymentGroup.POST("/checkout", paymentHandler.Checkout)
	}

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("failed to start server: %s", err)
	}
}
