import { getUsersQuery, putIntoUserQuery, insertUserQuery, getUserByIdQuery, } from "../models/User";
export const selectAllUsers = async () => {
    const users = await getUsersQuery();
    return users;
};
export const selectUserById = async (id) => {
    const user = await getUserByIdQuery(id);
    return user;
};
export const putIntoUser = async (id, user) => {
    const result = await putIntoUserQuery(id, user);
    return result;
};
//# sourceMappingURL=UserService.js.map