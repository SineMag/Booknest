export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    emailAddress: string;
    physicalAddress: string;
    phoneNumber: string;
    profilePicUrl?: string;
    password: string;
    createdAt?: Date;
}
export interface LoginCredentials {
    emailAddress: string;
    password: string;
}
export declare const userTableQuery: () => import("@neondatabase/serverless").NeonQueryPromise<false, false, Record<string, any>[]>;
export declare const getUsersQuery: () => import("@neondatabase/serverless").NeonQueryPromise<false, false, Record<string, any>[]>;
export declare const getUserByIdQuery: (id: number) => import("@neondatabase/serverless").NeonQueryPromise<false, false, Record<string, any>[]>;
export declare const putIntoUserQuery: (id: number, user: User) => import("@neondatabase/serverless").NeonQueryPromise<false, false, Record<string, any>[]>;
export declare const insertUserQuery: (user: User) => import("@neondatabase/serverless").NeonQueryPromise<false, false, Record<string, any>[]>;
export declare const loginUserQuery: (credentials: LoginCredentials) => import("@neondatabase/serverless").NeonQueryPromise<false, false, Record<string, any>[]>;
//# sourceMappingURL=User.d.ts.map