package main

import (
	"log"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/config"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/handler/http"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/model"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/repository"
	service "github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/services"
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

	if err := db.AutoMigrate(&model.IceCream{}); err != nil {
		log.Fatalf("failed to migrate database: %s", err)
	}

	iceRepo := repository.NewIceRepo(db)
	iceService := service.NewIceService(iceRepo)
	iceHandler := http.NewIceHandler(iceService)

	router := gin.Default()
	router.GET("/health", func(c *gin.Context) {
		c.Status(200)
	})

	iceGroup := router.Group("/ice-cream")
	{
		iceGroup.GET("", iceHandler.GetIceCreamList)
		iceGroup.GET("/:id", iceHandler.GetIceCreamDetail)
		iceGroup.POST("", iceHandler.CreateIceCream)
		iceGroup.PUT("", iceHandler.UpdateIceCream)
		iceGroup.DELETE("", iceHandler.DeleteIceCream)
	}

	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("failed to start server: %s", err)
	}
}
