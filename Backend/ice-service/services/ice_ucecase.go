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

func (i *iceService) GetIceCreamDetail(ctx context.Context, id string) (*dto.IceCreamResponse, error) {
	item , err := i.repo.FindByID(ctx,id)
	if err != nil{
		return nil,errors.New("ESkrim tidak ditemukan")
	}

	return &dto.IceCreamResponse{
		IceCreamID: item.IceCreamID,
		IceCreamName: item.IceCreamName,
		IceCreamFlavor: item.IceCreamFlavor,
		IceCreamPrice: item.IceCreamPrice,
		IceCreamDesc: item.IceCreamDesc,
		ImageURL: item.IceCreamImageURL,
	},nil
}

func (i *iceService) GetIceCreamList(ctx context.Context, req *dto.ListIceCreamRequest) (*dto.ListIceCreamResponse, error) {
	limit := req.Limit
	if limit <= 0 {
		limit = 10
	}
	page := req.Page
	if page <= 0 {
		page = 1
	}

	items, err := i.repo.GetIceCreamMenu(ctx, req.Keyword, limit, page)
	if err != nil {
		return nil, errors.New("gagal mengambil daftar ESkrim")
	}

	total, err := i.repo.CountIceCream(ctx, req.Keyword)
	if err != nil {
		return nil, errors.New("gagal menghitung jumlah ESkrim")
	}

	responses := make([]dto.IceCreamResponse, 0, len(items))
	for _, item := range items {
		responses = append(responses, dto.IceCreamResponse{
			IceCreamID:     item.IceCreamID,
			IceCreamName:   item.IceCreamName,
			IceCreamFlavor: item.IceCreamFlavor,
			IceCreamPrice:  item.IceCreamPrice,
			IceCreamDesc:   item.IceCreamDesc,
			ImageURL:       item.IceCreamImageURL,
		})
	}

	return &dto.ListIceCreamResponse{
		Items: responses,
		Total: total,
	}, nil
}

func (i *iceService) CreateIceCream(ctx context.Context, req *dto.CreateIceCreamRequest) (*dto.MessageResponse, error) {
	icecream := &model.IceCream{
		IceCreamName:   req.IceCreamName,
		IceCreamPrice:  req.IceCreamPrice,
		IceCreamFlavor: req.IceCreamFlavor,
		IceCreamDesc:   req.IceCreamDesc,
	}
	if err := i.repo.CreateIceCream(ctx, icecream); err != nil {
		return nil, errors.New("gagal buat ESkrim")
	}
	return &dto.MessageResponse{
		Message: "Success",
	}, nil
}

func (i *iceService) UpdateIceCream(ctx context.Context, req *dto.UpdateIceCreamRequest) (*dto.MessageResponse, error) {
	icecream := &model.IceCream{
		IceCreamName:   req.IceCreamName,
		IceCreamPrice:  req.IceCreamPrice,
		IceCreamFlavor: req.IceCreamFlavor,
		IceCreamDesc:   req.IceCreamDesc,
	}
	if err := i.repo.UpdateIceCream(ctx, icecream); err != nil {
		return nil, errors.New("gagal buat ESkrim")
	}
	return &dto.MessageResponse{
		Message: "Success",
	}, nil
}

func (i *iceService) DeleteIceCream(ctx context.Context, req *dto.DeleteIceCreamRequest) (*dto.MessageResponse, error) {
	iceCream, err := i.repo.FindByID(ctx, req.IceCreamID)
	if err != nil {
		return nil, errors.New("tidak ada ESkrim ditemukan")
	}
	if err := i.repo.DeleteIceCream(ctx, iceCream.IceCreamID); err != nil {
		return nil, errors.New("gagal Delete ESkrim")
	}
	return &dto.MessageResponse{
		Message: "Success",
	}, nil
}
