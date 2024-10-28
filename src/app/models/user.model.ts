export type UserRegister ={
    name?:string;
    lastName?:string;
    idDocument?:string;
    phoneNumber?:string;
    dateOfBirth?:string;
    email?:string;
    password?:string;
};
export type UserLogin = Pick<UserRegister,'email' | 'password'> ;
