export default interface Authsource {
    login(username: string, password: string): Promise<any>;
    register(name: string, email: string, password: string, lastName: string, phone: string): Promise<any>;
    sendVerification(contacto: string, method: string): Promise<any>;
    changepassword(email: string, newPassword: string, token:string): Promise<any>;
    getUser(token: string): Promise<any>;
    uploadUserPhoto(token: string, photoUri: string): Promise<any>;
}