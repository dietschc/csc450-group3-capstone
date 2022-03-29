// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - setupInterceptors.js
// March 29, 2022
// Last Edited (Initials, Date, Edits):

import axiosInstance from "../http-common";
import TokenService from "./token.service";
import { refreshToken, logout } from "../actions/users";

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();

            if (token) {
                config.headers["x-access-token"] = token;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const { dispatch } = store;

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;

            if (originalConfig.url !== "/auth/signin" && err.response) {

                // Access Token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;

                    try {
                        // Call the refresh token endpoint
                        const rs = await axiosInstance.post("/authentication/refreshtoken", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });

                        // Attempt to refresh access token
                        const { accessToken } = rs.data;
                        dispatch(refreshToken(accessToken));
                        TokenService.updateLocalAccessToken(accessToken);

                        return axiosInstance(originalConfig);

                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }

                // Refresh token was expired
                if (err.response.status === 403 && err.response.data) {
                    console.log("refresh token expired");

                    // Dispatch logout action
                    dispatch(logout());

                    // Reload windows to hide navbar
                    // window.location.reload();

                    // Redirect to login
                    window.location.href="/login"
                }

                return Promise.reject(err.response.data);
            }
            return Promise.reject(err);
        }
    );
};

export default setup;
