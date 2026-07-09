package cmd

import (
	"log"
	"time"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/config"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/repository"
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

	rdb := redis.NewClient(&redis.Options{
		Addr:         config.RedisAddr,
		DialTimeout:  10 * time.Second,
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		PoolSize:     10,
		PoolTimeout:  30 * time.Second,
	})

	userRepo := repository.NewUserRepo(db)

	// no need otp, etc. find another use for redis
	// otpRepo := cache.NewRedisOTPStore(clusterClient)
	// tokenBlacklist := cache.NewRedisTokenBlacklist(clusterClient)
	// refreshStore := cache.NewRedisRefreshStore(clusterClient)

	// authUseCase := usecase.NewAuthUseCase(userRepo, otpRepo, tokenBlacklist, refreshStore, config)
	// authHandler := http.NewAuthHandler(authUseCase)
}
