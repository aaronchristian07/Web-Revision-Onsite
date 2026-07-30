import axios from "axios";
import type {
    AddToCartRequest,
    CheckoutRequest,
    CheckoutResponse,
    GetCartRequest,
    GetCartResponse,
    MessageResponse,
    RemoveCartItemRequest,
    UpdateCartItemRequest,
} from "../dto/paymentDto";
import { API_BASE_URL } from "../lib/api";
import { parseApiError } from "../lib/error";

interface AddToCartApiProps {
    req: AddToCartRequest;
    setError: (error: string) => void;
}

export const AddToCartApi = async ({ req, setError }: AddToCartApiProps): Promise<MessageResponse | null> => {
    try {
        const response = await axios.post<MessageResponse>(
            `${API_BASE_URL}/payment/cart`,
            req
        )
        if (response && response.data) {
            return response.data;
        }

        return null;
    } catch (err) {
        setError(parseApiError(err))
        return null;
    }
}

interface GetCartApiProps {
    req: GetCartRequest;
    setError: (error: string) => void;
}

export const GetCartApi = async ({ req, setError }: GetCartApiProps): Promise<GetCartResponse | null> => {
    try {
        const response = await axios.get<GetCartResponse>(
            `${API_BASE_URL}/payment/cart`,
            { params: req }
        )
        if (response && response.data) {
            return response.data;
        }

        return null;
    } catch (err) {
        setError(parseApiError(err))
        return null;
    }
}

interface UpdateCartItemApiProps {
    req: UpdateCartItemRequest;
    setError: (error: string) => void;
}

export const UpdateCartItemApi = async ({ req, setError }: UpdateCartItemApiProps): Promise<MessageResponse | null> => {
    try {
        const response = await axios.put<MessageResponse>(
            `${API_BASE_URL}/payment/cart`,
            req
        )
        if (response && response.data) {
            return response.data;
        }

        return null;
    } catch (err) {
        setError(parseApiError(err))
        return null;
    }
}

interface EmptyCartApiProps {
    req: RemoveCartItemRequest;
    setError: (error: string) => void;
}

export const EmptyCartApi = async ({ req, setError }: EmptyCartApiProps): Promise<MessageResponse | null> => {
    try {
        const response = await axios.delete<MessageResponse>(
            `${API_BASE_URL}/payment/cart`,
            { data: req }
        )
        if (response && response.data) {
            return response.data;
        }

        return null;
    } catch (err) {
        setError(parseApiError(err))
        return null;
    }
}

interface RemoveCartItemApiProps {
    itemId: number;
    setError: (error: string) => void;
}

export const RemoveCartItemApi = async ({ itemId, setError }: RemoveCartItemApiProps): Promise<MessageResponse | null> => {
    try {
        const response = await axios.delete<MessageResponse>(
            `${API_BASE_URL}/payment/cart`,
            { params: {id: itemId} }
        )
        if (response && response.data) {
            return response.data;
        }

        return null;
    } catch (err) {
        setError(parseApiError(err))
        return null;
    }
}

interface CheckoutCartApiProps {
    req: CheckoutRequest;
    setError: (error: string) => void;
}

export const CheckoutCartApi = async ({ req, setError }: CheckoutCartApiProps): Promise<CheckoutResponse | null> => {
    try {
        const response = await axios.post<CheckoutResponse>(
            `${API_BASE_URL}/payment/checkout`,
            req
        )
        if (response && response.data) {
            return response.data;
        }

        return null;
    } catch (err) {
        setError(parseApiError(err))
        return null;
    }
}