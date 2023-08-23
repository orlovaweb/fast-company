import React, { useEffect, useState } from "react";

import _ from "lodash";
import { useAuth } from "../../../hooks/useAuth";
import { useProfessions } from "../../../hooks/useProfession";
import { useUser } from "../../../hooks/useUsers";
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

    const { users } = useUser();
    const { professions, isLoading: professionsLoading } = useProfessions();
    const { currentUser } = useAuth();
    // console.log(users);

    const handleDelete = (userId) => {
        // setUsers((prevState) =>
        //     prevState.filter((user) => user._id !== userId)
        // );
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
        return filteredUsers.filter((u) => u._id !== currentUser._id);
    }
    if (users) {
        // let count = users.length;
        // let resultUsers = _.orderBy(users, [sortBy.path], [sortBy.order]);

        // if (searchItems) {
        //     const reg = new RegExp(`${searchItems.toLowerCase()}`);
        //     resultUsers = users.filter((user) =>
        //         reg.test(user.name.toLowerCase())
        //     );
        //     count = resultUsers.length;
        // } else {
        //     const filteredUsers = selectedProf
        //         ? users.filter((user) =>
        //               _.isEqual(user.profession, selectedProf)
        //           )
        //         : users;
        //     count = filteredUsers.length;
        //     resultUsers = _.orderBy(
        //         filteredUsers,
        //         [sortBy.path],
        //         [sortBy.order]
        //     );
        // }

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
