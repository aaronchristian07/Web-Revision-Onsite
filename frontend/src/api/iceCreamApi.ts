import axios from "axios";
import type {
    CreateIceCreamRequest,
    DeleteIceCreamRequest,
    GetIceCreamDetailRequest,
    IceCreamResponse,
    ListIceCreamRequest,
    ListIceCreamResponse,
    UpdateIceCreamRequest,
    MessageResponse,
} from "../dto/iceDto";
import { API_BASE_URL } from "../lib/api";
import { parseApiError } from "../lib/error";
import { authHeader } from "./authApi";

interface GetIceCreamApiProps {
    req: ListIceCreamRequest;
    setError: (error: string) => void;
}

export const getIceCreamApi = async ({ req, setError }: GetIceCreamApiProps): Promise<ListIceCreamResponse | null> => {
    try {
        const response = await axios.get<ListIceCreamResponse>(
            `${API_BASE_URL}/ice-cream`,
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

interface GetIceCreamDetailApiProps {
    req: GetIceCreamDetailRequest;
    setError: (error: string) => void;
}

export const getIceCreamDetailApiApi = async ({ req, setError }: GetIceCreamDetailApiProps): Promise<IceCreamResponse | null> => {
    try {
        const response = await axios.get<IceCreamResponse>(
            `${API_BASE_URL}/ice-cream`,
            { params: req.ice_cream_id }
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

interface CreateIceCreamApiProps {
    req: CreateIceCreamRequest;
    setError: (error: string) => void;
}

export const createIceCreamApi = async ({ req, setError }: CreateIceCreamApiProps): Promise<MessageResponse | null> => {
    try {
        const response = await axios.post<MessageResponse>(
            `${API_BASE_URL}/ice-cream`,
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

interface UpdateIceCreamApiProps {
    req: UpdateIceCreamRequest;
    setError: (error: string) => void;
}

export const updateIceCreamApi = async ({ req, setError }: UpdateIceCreamApiProps): Promise<MessageResponse | null> => {
    try {
        const response = await axios.put<MessageResponse>(
            `${API_BASE_URL}/ice-cream`,
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

interface DeleteIceCreamApiProps {
    req: DeleteIceCreamRequest;
    setError: (error: string) => void;
}

export const deleteIceCreamApi = async ({ req, setError }: DeleteIceCreamApiProps): Promise<MessageResponse | null> => {
    try {
        const response = await axios.delete<MessageResponse>(
            `${API_BASE_URL}/ice-cream`,
            { data: req}
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

interface UploadIceCreamApiProps {
    image: File;
    setError: (error: string) => void;
}

export const uploadIceCreamApi = async ({ image, setError }: UploadIceCreamApiProps): Promise<string | null> => {
    try {
        const formData = new FormData();
        formData.append("image", image);

        const response = await axios.post<string>(
            `${API_BASE_URL}/ice-cream/image`,
            formData,
            {
                headers: {
                    ...authHeader(),
                    "Content-Type": "multipart/form-data",
                },
                // onUploadProgress: e => {
                //     if (onProgress && e.total) {
                //         onProgress(Math.round((e.loaded * 100) / e.total));
                //     }
                // },
            },
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
