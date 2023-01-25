import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader
                        onSort={onSort}
                        selectedSort={selectedSort}
                        columns={columns}
                    />
                    <TableBody data={data} columns={columns} />
                </>
            )}
        </table>
    );
};
Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};
export default Table;
