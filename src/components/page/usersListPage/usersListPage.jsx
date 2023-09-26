import React, { useEffect, useState } from "react";

import _ from "lodash";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsers } from "../../../store/users";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import Pagination from "../../common/pagination";
import SearchItemsForm from "../../ui/searchItemsForm";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";

const UsersListPage = () => {
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [searchItems, setSearchItems] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const users = useSelector(getUsers());
    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const currentUserId = useSelector(getCurrentUserId());

    const handleDelete = (userId) => {
        console.log(userId);
    };
    const handleToggleBookMark = (id) => {
        const elementIndex = users.findIndex((c) => c._id === id);
        const newUsers = [...users];
        if (newUsers[elementIndex].bookmark) {
            newUsers[elementIndex].bookmark = false;
        } else newUsers[elementIndex].bookmark = true;
        // setUsers(newUsers);
        console.log(newUsers);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, sortBy, searchItems]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchItems("");
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleChangeSearchItems = (e) => {
        setSearchItems(e.target.value);
        setSelectedProf();
        console.log(e.target.value);
    };
    function filterUsers(data) {
        const filteredUsers = searchItems
            ? data.filter((user) =>
                  new RegExp(`${searchItems.toLowerCase()}`).test(
                      user.name.toLowerCase()
                  )
              )
            : selectedProf
            ? data.filter((user) => _.isEqual(user.profession, selectedProf))
            : data;
        return filteredUsers.filter((u) => u._id !== currentUserId);
    }
    if (users) {
        const filteredUsers = filterUsers(users);

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
                    {professions && !professionsLoading && (
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
                    <SearchItemsForm
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

export default UsersListPage;
