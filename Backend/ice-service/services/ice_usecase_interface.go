package service

import (
	"context"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/dto"
)

type IceService interface {
	CreateIceCream(ctx context.Context, req *dto.CreateIceCreamRequest) (*dto.MessageResponse, error)
	UpdateIceCream(ctx context.Context, req *dto.UpdateIceCreamRequest) (*dto.MessageResponse, error)
	DeleteIceCream(ctx context.Context, req *dto.DeleteIceCreamRequest) (*dto.MessageResponse, error)
	GetIceCreamList(ctx context.Context , req *dto.ListIceCreamRequest) (*dto.ListIceCreamResponse,error)
	GetIceCreamDetail(ctx context.Context,id string )(*dto.IceCreamResponse,error)
}
