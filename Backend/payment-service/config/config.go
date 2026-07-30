package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBString  string
	Port      string
	JWTSecret string
}

func Load() Config {
	_ = godotenv.Load()
	return Config{
		DBString:  MustEnv("DB_STRING"),
		Port:      GetEnvOrDefault("PAYMENT_SERVICE_PORT", "8003"),
		JWTSecret: GetEnvOrDefault("JWT_SECRET", "kelompokehhh321"),
	}
}

func MustEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("variable %s is not configured", key)
	}
	return v
}

func GetEnvOrDefault(key, fallback string) string {
	v := os.Getenv(key)
	if v == "" {
		return fallback
	}
	return v
}
