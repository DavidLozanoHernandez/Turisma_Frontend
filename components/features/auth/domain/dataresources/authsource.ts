export default interface Authsource {
    login(username: string, password: string): Promise<any>;
    register(name: string, email: string, password: string, lastName: string, phone: string): Promise<any>;
    sendVerification(contacto: string, method: string): Promise<any>;
    changepassword(email: string, newPassword: string, token:string): Promise<any>;
    getUser(token: string): Promise<any>;
    uploadUserPhoto(token: string, photoUri: string): Promise<any>;
    updatedates(token: string, name: string, lastName: string): Promise<any>;
    sendVerificationPhone(token: string): Promise<any>;
    updatePhone(token_acces: string, newPhone: string, token: string): Promise<any>;
    sendVerificationPassword(token: string): Promise<any>;
    updatePassword(token_acces: string, newPassword:string, token:string): Promise<any>;
}