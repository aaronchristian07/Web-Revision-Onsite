package http

import (
	"net/http"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/dto"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/auth-service/service"
	"github.com/gin-gonic/gin"
)

type authUsecase struct {
	uc service.AuthService
}

func NewAuthUsecase(uc service.AuthService) *authUsecase {
	return &authUsecase{uc: uc}
}

func (a *authUsecase) Register(c *gin.Context) {
	var req *dto.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	resp, err := a.uc.Register(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, resp)
}

func (a *authUsecase) Login(c *gin.Context) {
	var req *dto.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	resp, err := a.uc.Login(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, resp)
}

func (a *authUsecase) ValidateToken(c *gin.Context) {
	var body struct {
		Token string `json:"token" binding:"required"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	resp, err := a.uc.ValidateToken(c.Request.Context(), body.Token)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, resp)
}

// Me echoes back the identity AuthMiddleware pulled off the access token.
func (a *authUsecase) Me(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"user_id":  c.GetString("user_id"),
		"email":    c.GetString("email"),
		"username": c.GetString("username"),
		"role":     c.GetString("role"),
	})
}

func (a *authUsecase) RefreshToken(c *gin.Context) {
	var req *dto.RefreshTokenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	resp, err := a.uc.RefreshToken(c.Request.Context(), req.RefreshToken)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, resp)
}
