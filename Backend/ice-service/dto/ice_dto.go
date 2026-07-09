package dto

type CreateIceCreamRequest struct{
	IceCreamName	string	`json:"ice_cream_name"`
	IceCreamFlavor	string	`json:"ice_cream_flavor"`
	IceCreamPrice	int		`json:"ice_cream_price"`
	IceCreamDesc	string	`json:"ice_cream_desc"`
}

type DeleteIceCreamRequest struct{
	IceCreamID	string	`json:"ice_cream_id"`
}

type UpdateIceCreamRequest struct{
	IceCreamID		string `json:"ice_cream_id"`
	IceCreamName	string	`json:"ice_cream_name"`
	IceCreamFlavor	string	`json:"ice_cream_flavor"`
	IceCreamPrice	int		`json:"ice_cream_price"`
	IceCreamDesc	string	`json:"ice_cream_desc"`
}

type MessageResponse struct{
	Message	string	`json:"message"`
}