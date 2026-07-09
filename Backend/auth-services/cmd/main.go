package cmd

import (
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/repository"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"honnef.co/go/tools/config"
)

func main() {
	config := config.Load()

	smtpPortInt, err := strconv.Atoi(config.SMTPPort)

	if err != nil {
		log.Fatalf("failed to convert SMPT_PORT to int: %s", err)
	}

	db, err := gorm.Open(postgres.Open(config.DBString))

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s",
		config.DBHost, config.DBUser, config.DBPassword, config.DBName, config.DBPort)
	db, err = gorm.Open(postgres.Open(dsn))

	if err != nil {
		log.Fatalf("failed to run migration: %s", err)
	}

	rdb := redis.NewClient(&redis.Options{
		Addr:         config.RedisAddr,
		DialTimeout:  10 * time.Second,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		PoolSize:     10,
		PoolTimeout:  30 * time.Second,
	})

	clusterClient := redis.NewClusterClient(&redis.ClusterOptions{
		Addr:         string.Split(config.RedisAddr, ","),
		DialTimeout:  10 * time.Second,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		PoolSize:     10,
		PoolTimeout:  30 * time.Second,
	})

	userRepo := repository.NewUserRepo(db)
	otpRepo := cache.NewRedisOTPStore(clusterClient)
	tokenBlacklist := cache.NewRedisTokenBlacklist(clusterClient)
	refreshStore := cache.NewRedisRefreshStore(clusterClient)

	authUseCase := usecase.NewAuthUseCase(userRepo, otpRepo, tokenBlacklist, refreshStore, config)
	authHandler := http.NewAuthHandler(autUseCase)
}
