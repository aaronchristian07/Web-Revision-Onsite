package dto

type CreateIceCreamRequest struct {
	IceCreamName   string `json:"ice_cream_name"`
	IceCreamFlavor string `json:"ice_cream_flavor"`
	IceCreamPrice  int    `json:"ice_cream_price"`
	IceCreamDesc   string `json:"ice_cream_desc"`
	ImageURL       string `json:"image_url"`
}

type DeleteIceCreamRequest struct {
	IceCreamID string `json:"ice_cream_id"`
}

type UpdateIceCreamRequest struct {
	IceCreamID     string `json:"ice_cream_id"`
	IceCreamName   string `json:"ice_cream_name"`
	IceCreamFlavor string `json:"ice_cream_flavor"`
	IceCreamPrice  int    `json:"ice_cream_price"`
	IceCreamDesc   string `json:"ice_cream_desc"`
	ImageURL       string `json:"image_url"`
}

type MessageResponse struct {
	Message string `json:"message"`
}

type IceCreamResponse struct {
	IceCreamID     string `json:"ice_cream_id"`
	IceCreamName   string `json:"ice_cream_name"`
	IceCreamFlavor string `json:"ice_cream_flavor"`
	IceCreamPrice  int    `json:"ice_cream_price"`
	IceCreamDesc   string `json:"ice_cream_desc"`
	ImageURL       string `json:"image_url"`
}

type ListIceCreamRequest struct {
	Keyword string `form:"keyword"`
	Page    int    `form:"page"`
	Limit   int    `form:"limit"`
}

type ListIceCreamResponse struct {
	Items []IceCreamResponse `json:"items"`
	Total int64              `json:"total"`
}
