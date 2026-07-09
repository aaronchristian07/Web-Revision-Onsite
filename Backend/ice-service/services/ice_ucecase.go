package service

import (
	"context"
	"errors"

	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/dto"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/model"
	"github.com/Acad600-TPA/WEB-MT-AO-KY-ON-CJ-261/ice-service/repository"
)

type iceService struct {
	repo repository.IceRepoInterface
}

func NewIceService(repo repository.IceRepoInterface) IceService {
	return &iceService{repo: repo}
}

func (i *iceService) CreateIceCream(ctx context.Context, req *dto.CreateIceCreamRequest) (*dto.MessageResponse, error){
	icecream := &model.IceCream {
		IceCreamName: req.IceCreamName,
		IceCreamPrice: req.IceCreamPrice,
		IceCreamFlavor: req.IceCreamFlavor,
		IceCreamDesc: req.IceCreamDesc,
	}
	if err := i.repo.CreateIceCream(ctx, icecream); err != nil {
		return nil, errors.New("gagal buat ESkrim")
	}
	return &dto.MessageResponse{
		Message: "Success",
	}, nil
}

func (i *iceService) UpdateIceCream(ctx context.Context, req *dto.UpdateIceCreamRequest) (*dto.MessageResponse, error){
	icecream := &model.IceCream {
		IceCreamName: req.IceCreamName,
		IceCreamPrice: req.IceCreamPrice,
		IceCreamFlavor: req.IceCreamFlavor,
		IceCreamDesc: req.IceCreamDesc,
	}
	if err := i.repo.UpdateIceCream(ctx, icecream); err != nil {
		return nil, errors.New("gagal buat ESkrim")
	}
	return &dto.MessageResponse{
		Message: "Success",
	}, nil
}
	
func (i *iceService) DeleteIceCream (ctx context.Context, req *dto.DeleteIceCreamRequest) (*dto.MessageResponse, error){
	iceCream, err := i.repo.FindByID(ctx, req.IceCreamID)
	if err != nil {
		return nil, errors.New("tidak ada ESkrim ditemukan")
	}
	if err:= i.repo.DeleteIceCream(ctx,iceCream.IceCreamID); err != nil {
		return nil, errors.New("gagal Delete ESkrim")
	} 
	return &dto.MessageResponse{
		Message: "Success",
	}, nil
}