import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Qualities from "../../ui/qualities";

const UserPage = ({ id }) => {
    const history = useHistory();

    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    const handleGoBackAllUsers = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <>
                <h1>Имя: {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <h2>Встретился: {user.completedMeetings} раз</h2>
                <h2>Оценка: {user.rate}/5</h2>
                <button
                    onClick={() => {
                        handleGoBackAllUsers();
                    }}
                >
                    Все пользователи
                </button>
            </>
        );
    }
    return <h2>Loading...</h2>;
};
UserPage.propTypes = {
    id: PropTypes.string.isRequired
};
export default UserPage;
