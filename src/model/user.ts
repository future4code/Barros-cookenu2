export type user = {
    id:string ,
    name:string ,
    email:string ,
    password:string ,
    role:string
}

export enum UserRole {
    ADMIN = "ADMIN",
    NORMAL = "NORMAL"
}

export interface AuthenticationData {
    id:string;
    role:string;
}

export interface UserInputDTO{
    name:string,
    email:string,
    password:string,
    role:string
}

export interface loginDTO{
    email:string,
    password:string,
}

export interface userGetByIdDTO{
    id: string,
    token:string
}

