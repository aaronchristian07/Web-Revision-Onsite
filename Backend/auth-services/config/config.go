package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	DBString   string
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
	// no .env in the container image - compose injects the env directly.
	// MustEnv below is what actually enforces that the vars are present.
	_ = godotenv.Load()

	return Config{
		DBString:   MustEnv("DB_STRING"),
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
