package middleware

import (
	"net/http"
	"strings"
	"utils"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/config"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware(cfg config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "error": "missing invalid or authorization header"})
			c.Abort()
			return
		}
		tokenString := strings.TrimPrefix(authHeader, "Bearer")
		claims, err := utils.ValidateToken(tokenString, cfg.JWT_SECRET)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"success": false, "error": "invalid access token"})
			c.Abort()
			return
		}
		c.Set("user_id", claims.user_id)
		c.Set("role", claims.role)
		c.Next()
	}
}
