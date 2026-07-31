package main

import (
	"context"
	"log"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/config"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/handler/http"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/middleware"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/model"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/repository"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/service"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/storage"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	config := config.Load()

	// for email
	// smtpPortInt, err := strconv.Atoi(config.SMTPPort)
	// if err != nil {
	// 	log.Fatalf("failed to convert SMPT_PORT to int: %s", err)
	// }

	db, err := gorm.Open(postgres.Open(config.DBString))
	if err != nil {
		log.Fatalf("failed to connect to db: %s", err)
	}

	if err := db.AutoMigrate(&model.User{}, &model.RefreshToken{}); err != nil {
		log.Fatalf("failed to migrate database: %s", err)
	}

	// rdb := redis.NewClient(&redis.Options{
	// 	Addr:         config.RedisAddr,
	// 	DialTimeout:  10 * time.Second,
	// 	ReadTimeout:  30 * time.Second,
	// 	WriteTimeout: 30 * time.Second,
	// 	PoolSize:     10,
	// 	PoolTimeout:  30 * time.Second,
	// })
	// no need otp, etc. find another use for redis
	// otpRepo := cache.NewRedisOTPStore(clusterClient)
	// tokenBlacklist := cache.NewRedisTokenBlacklist(clusterClient)
	// refreshStore := cache.NewRedisRefreshStore(clusterClient)

	imageStorage, err := storage.NewImageStorage(
		config.SeaweedEndpoint,
		config.SeaweedPublicEndpoint,
		config.SeaweedAccessKey,
		config.SeaweedSecretKey,
		config.SeaweedProfileBucket,
	)
	if err != nil {
		log.Fatalf("failed to init image storage: %s", err)
	}
	if err := imageStorage.EnsureBucket(context.Background()); err != nil {
		log.Fatalf("failed to ensure storage bucket: %s", err)
	}

	authRepo := repository.NewAuthRepo(db)
	authService := service.NewAuthService(authRepo, config.JWTSecret)
	authUsecase := http.NewAuthUsecase(authService, imageStorage)

	router := gin.Default()
	router.GET("/health", func(c *gin.Context) {
		c.Status(200)
	})

	authGroup := router.Group("/auth")
	{
		authGroup.POST("/register", authUsecase.Register)
		authGroup.POST("/login", authUsecase.Login)
		authGroup.POST("/validate-token", authUsecase.ValidateToken)
		authGroup.POST("/refresh", authUsecase.RefreshToken)

		protected := authGroup.Group("")
		protected.Use(middleware.AuthMiddleware(config))
		protected.GET("/me", authUsecase.Me)
		protected.PUT("/me", authUsecase.UpdateProfile)
		protected.POST("/me/avatar", authUsecase.UploadAvatar)
	}

	if err := router.Run(":8001"); err != nil {
		log.Fatalf("failed to start server: %s", err)
	}
}
