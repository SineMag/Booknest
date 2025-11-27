import type { User } from "../features/userSlice";

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

export const removeLocalUser = () => {
  localStorage.removeItem("user");
};
