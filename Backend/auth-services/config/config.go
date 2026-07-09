package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBUser     string
	DBPass     string
	DBName     string
	DBPort     string
	PgPoolUser string
	PgPoolPass string
	RedisAddr  string
	RedisPass  string
	NGINXPort  string
	JWTSecret  string
}

func Load() Config {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("failed to load env file")
	}

	return Config{
		DBUser:     MustEnv("POSTGRES_USER"),
		DBPass:     MustEnv("POSTGRES_PASSWORD"),
		DBName:     MustEnv("POSTGRES_DB"),
		DBPort:     MustEnv("DB_PORT"),
		PgPoolUser: MustEnv("PGPOOL_PCP_USER"),
		PgPoolPass: MustEnv("PGPOOL_PCP_PASSWORD"),
		RedisAddr:  MustEnv("REDIS_ADDR"),
		RedisPass:  MustEnv("REDIS_PASSWORD"),
		NGINXPort:  MustEnv("NGINX_PORT"),
		JWTSecret:  MustEnv("JWT_SECRET"),
	}
}

func MustEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("variable %s is not configured", key)
	}
	return v
}
