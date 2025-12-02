import {
  deleteAdminQuery,
  getAdminByIdQuery,
  getAdminsQuery,
  insertAdminQuery,
  loginAdminQuery,
  putIntoAdminQuery,
  type Admin,
  type LoginCredentials,
} from "../models/Admin";

export const selectAllAdmins = async () => {
  const admins = await getAdminsQuery();
  return admins;
};

export const selectAdminById = async (id: number) => {
  const admin = await getAdminByIdQuery(id);
  return admin;
};

export const loginAdminDB = async (credets: LoginCredentials) => {
  console.log(399);
  const admin = await loginAdminQuery(credets);
  console.log(400, admin);
  return admin;
};

export const createAdminDB = async (admin: Admin) => {
  const result = await insertAdminQuery(admin);
  return result;
};

export const deleteAdminDB = async (id: number) => {
  const result = await deleteAdminQuery(id);
  return result;
};

export const updateAdminDB = async (id: number, admin: Admin) => {
  const result = await putIntoAdminQuery(id, admin);
  return result;
};
