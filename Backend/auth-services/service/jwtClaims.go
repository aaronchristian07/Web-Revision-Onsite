package service

import "github.com/golang-jwt/jwt/v5"

type jwtClaims struct {
	Email  string `json:"email"`
	UserID string `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}
