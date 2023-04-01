import React, { useState, useEffect } from "react";

import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import _ from "lodash";
import UsersTable from "./usersTable";
import SearchItems from "./searchItems";

const Users = () => {
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchItems, setSearchItems] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };
    const handleToggleBookMark = (id) => {
        const elementIndex = users.findIndex((c) => c._id === id);
        const newUsers = [...users];
        if (newUsers[elementIndex].bookmark) {
            newUsers[elementIndex].bookmark = false;
        } else newUsers[elementIndex].bookmark = true;
        setUsers(newUsers);
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, sortBy]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleChangeSearchItems = (e) => {
        setSearchItems(e.target.value);
        console.log(e.target.value);
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => _.isEqual(user.profession, selectedProf))
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, pageSize, currentPage);

        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex flex-row mb-3">
                <div className="m-2 flex-shrink-0">
                    {professions && (
                        <>
                            <GroupList
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                                selectedItem={selectedProf}
                            />
                            <button
                                className="btn btn-secondary mt-2"
                                onClick={clearFilter}
                            >
                                Сброс фильтрации
                            </button>
                        </>
                    )}
                </div>
                <div className="m-2">
                    <SearchStatus length={count} />
                    <SearchItems
                        value={searchItems}
                        onChange={handleChangeSearchItems}
                    />
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

export default Users;
