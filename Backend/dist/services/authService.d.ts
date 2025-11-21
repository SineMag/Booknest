<<<<<<< HEAD
import { type LoginCredentials, type User } from "../models/User";
=======
import { LoginCredentials, User } from "../models/User";
>>>>>>> feat/ReviewCard
export declare const insertIntoUsers: (user: User) => Promise<Record<string, any>[]>;
export declare const loginUserDB: (credentials: LoginCredentials) => Promise<Record<string, any>[]>;
//# sourceMappingURL=authService.d.ts.map