export interface AddToCartRequest {
	ice_cream_id    : string
	ice_cream_name  : string
	ice_cream_price : number
	quantity      : number
}

export interface UpdateCartItemRequest {
	cart_item_id : string
	quantity   : number
	selected   : boolean | null
}

export interface RemoveCartItemRequest {
	cart_item_id : string
}

export interface GetCartRequest {
	page  : number
	limit : number
}

export interface CartItemResponse {
	id            : string
	ice_cream_id    : string
	ice_cream_name  : string
	ice_cream_price : number   
	quantity      : number   
	selected      : boolean
	subtotal      : number   
}

export interface GetCartResponse {
	items :               CartItemResponse[]
	total_items :          number
	selected_total_price :  number             
	page :                number           
	limit :               number           
}

export interface CheckoutRequest {
	cart_item_ids : string[]
}

export interface CheckoutResponse {
	order_id    : string
	total_price : number   
	status     : string
	message    : string
}

export interface MessageResponse {
	message : string
}

export interface OrderItemResponse {
	ice_cream_id    : string
	ice_cream_name  : string
	ice_cream_price : number
	quantity      : number
	subtotal      : number
}

export interface OrderResponse {
	id          : string
	username    : string
	status      : string
	total_price : number
	created_at  : string
	items       : OrderItemResponse[]
}

export interface ListOrdersRequest {
	keyword?   : string
	status?    : string
	date_from? : string
	date_to?   : string
	page       : number
	limit      : number
}

export interface ListOrdersResponse {
	items : OrderResponse[]
	total : number
}

export interface UpdateOrderStatusRequest {
	status : string
}

export interface OrderStatsResponse {
	total_revenue  : number
	total_orders   : number
	pending_orders : number
}
