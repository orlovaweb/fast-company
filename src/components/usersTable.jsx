import React from "react";
import User from "./user";
import PropTypes from "prop-types";

const UserTable = ({ users, onDelete, onToggleBookMark }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <User
                        key={user._id}
                        {...user}
                        onDelete={onDelete}
                        onToggleBookMark={onToggleBookMark}
                    />
                ))}
            </tbody>
        </table>
    );
};
UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onToggleBookMark: PropTypes.func
};
export default UserTable;
