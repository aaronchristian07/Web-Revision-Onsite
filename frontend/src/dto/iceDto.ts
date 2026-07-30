export interface CreateIceCreamRequest {
	ice_cream_name   : string
	ice_cream_flavor : string
	ice_cream_price  : number   
	ice_cream_desc   : string
	image_url       : string
}

export interface DeleteIceCreamRequest {
	ice_cream_id : string
}

export interface UpdateIceCreamRequest {
	ice_cream_id     : string
	ice_cream_name   : string
	ice_cream_flavor : string
	ice_cream_price  : number   
	ice_cream_desc   : string
	image_url       : string
}

export interface MessageResponse {
	message : string
}

export interface IceCreamResponse {
	ice_cream_id     : string
	ice_cream_name   : string
	ice_cream_flavor : string
	ice_cream_price  : number   
	ice_cream_desc   : string
	image_url       : string
}

export interface ListIceCreamRequest {
	keyword : string
	page    : number   
	limit   : number   
}

export interface ListIceCreamResponse {
	items : IceCreamResponse[]
	total : number
}
