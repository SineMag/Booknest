import { type User } from "../models/User";
export declare const selectAllUsers: () => Promise<Record<string, any>[]>;
export declare const selectUserById: (id: number) => Promise<Record<string, any>[]>;
export declare const putIntoUser: (id: number, user: User) => Promise<Record<string, any>[]>;
//# sourceMappingURL=UserService.d.ts.map