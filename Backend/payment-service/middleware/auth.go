package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type JWTClaims struct {
	Email    string `json:"email"`
	UserID   string `json:"user_id"`
	Username string `json:"username"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

func AuthMiddleware(jwtSecret string) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")

		if authHeader != "" && strings.HasPrefix(authHeader, "Bearer ") {
			tokenString := strings.TrimPrefix(authHeader, "Bearer ")
			token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(t *jwt.Token) (interface{}, error) {
				return []byte(jwtSecret), nil
			})

			if err == nil && token.Valid {
				if claims, ok := token.Claims.(*JWTClaims); ok {
					c.Set("user_id", claims.UserID)
					c.Set("email", claims.Email)
					c.Set("username", claims.Username)
					c.Set("role", claims.Role)
					c.Next()
					return
				}
			}
		}

		if userID := c.GetHeader("X-User-ID"); userID != "" {
			c.Set("user_id", userID)
			c.Next()
			return
		}

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "token otentikasi tidak valid atau tidak ada",
		})
		c.Abort()
	}
}
