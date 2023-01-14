import React from "react";
import BookMark from "./bookmark";
import Quality from "./qualitie";

const User = (user) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                <ul className="p-0">
                    {user.qualities.map((quality) => (
                        <Quality key={quality._id} {...quality} />
                    ))}
                </ul>
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <BookMark user={user} onClick={user.onToggleBookMark} />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => user.onDelete(user._id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};
export default User;
