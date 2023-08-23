import axios from "axios";
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";
import userService from "../services/user.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует"
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function signIn({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                switch (message) {
                    case "EMAIL_NOT_FOUND":
                    case "INVALID_PASSWORD":
                        throw new Error("Email или пароль введены неверно");

                    default:
                        throw new Error(
                            "Слишком много попыток входа. Попробуйте позднее."
                        );
                }
            }
        }
    }
    function logOut() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            console.log(content);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser, logOut }}>
            {!isLoading ? children : "Loading..."}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default AuthProvider;
