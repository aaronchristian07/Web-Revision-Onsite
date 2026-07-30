package middleware

import (
	"net/http"
	"strings"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/config"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/service"
	"github.com/gin-gonic/gin"
)

const bearerPrefix = "Bearer "

func AuthMiddleware(cfg config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if !strings.HasPrefix(authHeader, bearerPrefix) {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"error":   "missing or invalid authorization header",
			})
			return
		}

		tokenString := strings.TrimPrefix(authHeader, bearerPrefix)
		claims, err := service.ParseAccessToken(tokenString, cfg.JWTSecret)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"success": false,
				"error":   "invalid access token",
			})
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("email", claims.Email)
		c.Set("role", claims.Role)
		c.Next()
	}
}
