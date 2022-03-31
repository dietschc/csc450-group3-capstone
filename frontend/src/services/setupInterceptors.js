// Coleman Dietsch
// CSC450 Capstone
// Restaurant Club - setupInterceptors.js
// March 29, 2022
// Last Edited (Initials, Date, Edits):

import axiosInstance from "../http-common";
import TokenService from "../services/token.service";
import { refreshToken, deleteAllUsers } from "../actions/users";
import { useNavigate } from 'react-router-dom';

/**
 * These interceptors are used in index.js with the redux-store as the argument
 * 
 * @param {*} store 
 */
const setup = (store) => {
    // HTTP request interceptors injects access-token
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

    // HTTP response interceptors handles error responses 
    // This is currently only handling errors related to tokens expiring
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        // In the case there was an HTTP error in the response do the following
        async (err) => {
            const originalConfig = err.config;

            // If this error response is not coming from the login page
            if (originalConfig.url !== "/login" && err.response) {

                // Error response 401 from the backend signifies access token was expired
                if (err.response.status === 401 && !originalConfig._retry) {
                    // This retry code is placed here to prevent an infinite loop from failed retries
                    originalConfig._retry = true;

                    try {
                        // Use our current refresh token to request a new access token from the backend
                        const rs = await axiosInstance.post("/authentication/refreshtoken", {
                            refreshToken: TokenService.getLocalRefreshToken(),
                        });

                        // Extract new access token from response data
                        const { accessToken } = rs.data;
                        // Extract current user 
                        const user = TokenService.getUser();

                        // Debug code
                        // console.log("user data: ", user);
                        // console.log("access token: ", accessToken);

                        // Attempt to refresh access token
                        dispatch(refreshToken(accessToken, user.id));

                        // TokenService.updateLocalAccessToken(accessToken);

                        return axiosInstance(originalConfig);

                    } catch (_error) {
                        return Promise.reject(_error);
                    }
                }

                // Error response 403 from the backend signifies refresh token was expired
                if (err.response.status === 403 && err.response.data) {
                    console.log("refresh token expired");

                    // Dispatch logout action, or in our case delete all users to logout
                    dispatch(deleteAllUsers());

                    // Redirect to login after user is logged out
                    useNavigate('/login');
                }

                return Promise.reject(err.response.data);
            }
            return Promise.reject(err);
        }
    );
};

export default setup;
