import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage";
import UserPageEdit from "../components/page/userPageEdit/userPageEdit";
import UsersListPage from "../components/page/usersListPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    // if (userId) {
    //     if (edit) {
    //         return <UserPageEdit />;
    //     }
    //     return <UserPage userId={userId} />;
    // }
    // return <UsersListPage />;
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <UserPageEdit />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
