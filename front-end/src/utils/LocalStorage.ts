import type { User } from "../features/userSlice";
import type { Admin } from "../types/Admin";

export const setLocalUser = (user: User | {}) =>
  localStorage.setItem("user", JSON.stringify(user));

export const getLocalUser = (): User | null => {
  const data = localStorage.getItem("user");
  if (!data) return null;

  const user = JSON.parse(data);

  const userObj = {
    id: user.id,
    firstName: user.firstname,
    lastName: user.lastname,
    emailAddress: user.emailaddress,
    phoneNumber: user.phonenumber,
    physicalAddress: user.physicaladdress,
    profilePicUrl: user.profilepicurl ?? null,
    password: user.password,
    createdAt: user.createdat,
  };

  return userObj;
};

export const setLocalAdmin = (admin: Admin | {}) =>
  localStorage.setItem("admin", JSON.stringify(admin));

export const getLocalAdmin = (): Admin | null => {
  const data = localStorage.getItem("admin");
  if (!data) return null;

  const admin = JSON.parse(data);

  const adminObj = {
    id: admin.id,
    firstName: admin.firstname,
    lastName: admin.lastname,
    emailAddress: admin.emailaddress,
    phoneNumber: admin.phonenumber,
    physicalAddress: admin.physicaladdress,
    profilePicUrl: admin.profilepicurl ?? null,
    password: admin.password,
    createdAt: admin.createdat,
  };

  return adminObj;
};
