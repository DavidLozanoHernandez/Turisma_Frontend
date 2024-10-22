export class User {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    userPhoto: string;

    constructor(
        id: number,
        name: string,
        lastName: string,
        phone: string,
        email: string,
        userPhoto: string,
    ){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.userPhoto = userPhoto;
    }
}
