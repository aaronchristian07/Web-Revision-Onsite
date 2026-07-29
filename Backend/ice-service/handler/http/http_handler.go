package http

import (
	"net/http"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/dto"
	services "github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/services"
	"github.com/gin-gonic/gin"
)

type iceHandler struct {
	uc services.IceService
}

func NewIceHandler(uc services.IceService) *iceHandler {
	return &iceHandler{uc: uc}
}

func (i *iceHandler) CreateIceCream(c *gin.Context) {
	var req *dto.CreateIceCreamRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	resp, err := i.uc.CreateIceCream(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, resp)
}
func (i *iceHandler) UpdateIceCream(c *gin.Context) {
      var req *dto.UpdateIceCreamRequest
      if err := c.ShouldBindJSON(&req); err != nil {
              c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
              return
      }

      resp, err := i.uc.UpdateIceCream(c.Request.Context(), req)
      if err != nil {
              c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
              return
      }

      c.JSON(http.StatusOK, resp)
}

func (i *iceHandler) DeleteIceCream(c *gin.Context) {
      var req *dto.DeleteIceCreamRequest
      if err := c.ShouldBindJSON(&req); err != nil {
              c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
              return
      }

      resp, err := i.uc.DeleteIceCream(c.Request.Context(), req)
      if err != nil {
              c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
              return
      }

      c.JSON(http.StatusOK, resp)
}

func (i *iceHandler) GetIceCreamList(c *gin.Context) {
      var req dto.ListIceCreamRequest
      if err := c.ShouldBindQuery(&req); err != nil {
              c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
              return
      }

      resp, err := i.uc.GetIceCreamList(c.Request.Context(), &req)
      if err != nil {
              c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
              return
      }

      c.JSON(http.StatusOK, resp)
}

func (i *iceHandler) GetIceCreamDetail(c *gin.Context) {
      id := c.Param("id")

      resp, err := i.uc.GetIceCreamDetail(c.Request.Context(), id)
      if err != nil {
              c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
              return
      }

      c.JSON(http.StatusOK, resp)
}
