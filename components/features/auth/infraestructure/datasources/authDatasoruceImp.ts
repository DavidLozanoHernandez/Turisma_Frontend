import axios from "axios";
import apiClient from "../../../../config/apiClient";
import Authsource from "../../domain/dataresources/authsource";
import { User } from "../../domain/entities/auth";

class AuthDatasoruceImp implements Authsource{
    async login(username: string, password: string): Promise<any> {
        console.log(username, password)
        try{
            const response = await apiClient.post('auth/login', {username, password});
            console.log(response)
            const user = new User(
                response.data.user.id,
                response.data.user.name,
                '',
                '',
                response.data.user.email,
                '',
            )

            return {
                accessToken: response.data.access_token,
                user: user,
            }
        }catch (error){
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Fallo en el login');
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocurrió un error desconocido');
            }
        }
    }

    async register(name: string, lastName: string, password: string, phone: string, email: string): Promise<any> {
        try {
            console.log("Datos de registro:", { name, lastName, password, phone, email });
            const response = await apiClient.post('auth/register', { name, email, password, lastName, phone });
            console.log("Respuesta del registro:", response);
            return response.data;
        } catch (error) {
            console.error("Error en registro:", error);
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Fallo en el registro');
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocurrió un error desconocido');
            }
        }
    }
    
    async sendVerification(contacto: string, method: string): Promise<any> {
        try{
            const response = await apiClient.post('auth/send-verification', {contacto, method})
            return response.data
        }catch (error){
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Fallo en el registro');
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocurrió un error desconocido');
            }
        }
    }

    async changepassword(email: string, newPassword: string, token: string): Promise<any> {
        try{
            const response = await apiClient.patch('auth/change-password', {email, newPassword, token})
            return response.data
        }catch (error){
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Fallo en el registro');
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocurrió un error desconocido');
            }
        }
    }

    async getUser(token: string): Promise<any> {
        try{
            const response = await apiClient.get('auth/getuser',{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            return response.data
        }catch (error){
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Fallo en el registro');
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocurrió un error desconocido');
            }
        }
    }

    async uploadUserPhoto(token: string, photoUri: string): Promise<any> {
        const formData = new FormData();
    
    formData.append('file', {
        uri: photoUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
    } as any);

    try {
        const response = await apiClient.post('photos/upload', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Error al subir la foto');
        } else if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('Ocurrió un error desconocido');
        }
    }
    }
}

export default AuthDatasoruceImp;