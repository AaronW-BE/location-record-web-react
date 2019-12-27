import {GET} from "./base";

export const FetchLocation = (data) => {
    return GET("/location", data);
};