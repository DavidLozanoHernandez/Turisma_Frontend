import axios from "axios";
import apiClient from "../../../../config/apiClient";
import Authsource from "../../domain/dataresources/authsource";
import { User } from "../../domain/entities/auth";

class AuthDatasoruceImp implements Authsource{
    async login(username: string, password: string): Promise<any> {
        try{
            const response = await apiClient.post('/auth/login', {username, password});
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
            console.log("Datos de registro:", { name, lastName, password, phone, email }); // Para verificar los datos
            const response = await apiClient.post('auth/register', { name, email, password, lastName, phone });
            console.log("Respuesta del registro:", response); // Verificar la respuesta
            return response.data;
        } catch (error) {
            console.error("Error en registro:", error); // Verificar el error
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Fallo en el registro');
            } else if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error('Ocurrió un error desconocido');
            }
        }
    }
    
    async sendVerification(email: string, method: string): Promise<any> {
        try{
            const response = await apiClient.post('auth/send-verification', {email, method})
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
}

export default AuthDatasoruceImp;