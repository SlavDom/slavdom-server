export interface DbModels {
    User: any,
    Translation: any,
}

export interface User {
    id: number,
    email: string,
    profile: any,

    getFullName(): string,
    save(): any
}

export interface Translation {
    id: number,
    code: string,
    lang: string,
    result: string
}