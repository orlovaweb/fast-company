import React from "react";
import PropType from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    const handleSortIcon = (item) => {
        if (selectedSort.path === item) {
            return (
                <i
                    className={
                        "ml-2 bi " +
                        (selectedSort.order === "asc"
                            ? "bi-caret-down-fill"
                            : "bi-caret-up-fill")
                    }
                ></i>
            );
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {columns[column].path
                            ? handleSortIcon(columns[column].path)
                            : undefined}
                    </th>
                ))}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropType.func.isRequired,
    selectedSort: PropType.object.isRequired,
    columns: PropType.object.isRequired
};
export default TableHeader;
