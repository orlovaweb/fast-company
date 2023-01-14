import React, { useState } from "react";
import Users from "./components/users";
import api from "./api";
import SearchStatus from "./components/searchStatus";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };
    const handleToggleBookMark = (id) => {
        console.log(users);
        const elementIndex = users.findIndex((c) => c._id === id);
        const newUsers = [...users];
        if (newUsers[elementIndex].bookmark) {
            newUsers[elementIndex].bookmark = false;
        } else newUsers[elementIndex].bookmark = true;
        setUsers(newUsers);
    };

    return (
        <>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />
        </>
    );
};
export default App;
