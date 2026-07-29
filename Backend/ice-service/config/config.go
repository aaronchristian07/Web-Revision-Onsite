package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBString              string
	Port                  string
	SeaweedEndpoint       string
	SeaweedPublicEndpoint string
	SeaweedAccessKey      string
	SeaweedSecretKey      string
	SeaweedBucket         string
}

func Load() Config {
	_ = godotenv.Load()
	return Config{
		DBString:              MustEnv("DB_STRING"),
		Port:                  MustEnv("ICE_SERVICE_PORT"),
		SeaweedEndpoint:       MustEnv("SEAWEED_S3_ENDPOINT"),
		SeaweedPublicEndpoint: MustEnv("SEAWEED_S3_PUBLIC_ENDPOINT"),
		SeaweedAccessKey:      MustEnv("SEAWEED_ACCESS_KEY"),
		SeaweedSecretKey:      MustEnv("SEAWEED_SECRET_KEY"),
		SeaweedBucket:         MustEnv("SEAWEED_BUCKET"),
	}
}

func MustEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("variable %s is not configured", key)
	}
	return v
}
