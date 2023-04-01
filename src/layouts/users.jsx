import React from "react";
import { useParams } from "react-router-dom";
import UserCard from "../components/userCard";
import UsersList from "../components/usersList";

const Users = () => {
    const params = useParams();
    const { userId } = params;

    if (userId) {
        return <UserCard id={userId} />;
    }
    return <UsersList />;
};

export default Users;
