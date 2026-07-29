package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBString string
	Port     string
}

func Load() Config {
	_ = godotenv.Load()
	return Config{
		DBString: MustEnv("DB_STRING"),
		Port:     MustEnv("ICE_SERVICE_PORT"),
	}
}

func MustEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("variable %s is not configured", key)
	}
	return v
}
