import {POST} from "./base";

export const UserLogin = (data) => {
    return POST("/auth", data);
};