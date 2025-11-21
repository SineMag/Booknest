"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserQuery = exports.insertUserQuery = exports.putIntoUserQuery = exports.getUserByIdQuery = exports.getUsersQuery = exports.userTableQuery = void 0;
const database_1 = require("../database");
const userTableQuery = () => (0, database_1.sql) `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    physicalAddress VARCHAR(255) NOT NULL,
    phoneNumber CHAR(10) NOT NULL,
    profilePicUrl TEXT,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;
exports.userTableQuery = userTableQuery;
const getUsersQuery = () => (0, database_1.sql) `
  SELECT * FROM users;`;
exports.getUsersQuery = getUsersQuery;
const getUserByIdQuery = (id) => (0, database_1.sql) `
  SELECT * FROM users WHERE id=${id};`;
exports.getUserByIdQuery = getUserByIdQuery;
const putIntoUserQuery = (id, user) => (0, database_1.sql) `
  UPDATE users SET firstName=${user.firstName} , lastName=${user.lastName}, emailAddress=${user.emailAddress}, physicalAddress=${user.physicalAddress}, phoneNumber=${user.phoneNumber}, profilePicUrl=${user.profilePicUrl}, password=${user.password} WHERE id=${id};`;
exports.putIntoUserQuery = putIntoUserQuery;
const insertUserQuery = (user) => (0, database_1.sql) `
  INSERT INTO users (firstName, lastName, emailAddress, physicalAddress, phoneNumber, profilePicUrl, password)
  VALUES (${user.firstName}, ${user.lastName}, ${user.emailAddress}, ${user.physicalAddress}, ${user.phoneNumber}, ${user.profilePicUrl}, ${user.password})
  RETURNING *;`;
exports.insertUserQuery = insertUserQuery;
const loginUserQuery = (credentials) => (0, database_1.sql) `
  SELECT * FROM users WHERE emailAddress=${credentials.emailAddress} AND password=${credentials.password};`;
exports.loginUserQuery = loginUserQuery;
//# sourceMappingURL=User.js.map