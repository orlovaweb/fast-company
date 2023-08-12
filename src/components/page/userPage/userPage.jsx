import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import MeetingsCard from "../../ui/meetingsCard";
import QualitiesCard from "../../ui/qualitiesCard";
import UserCard from "../../ui/userCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard qualities={user.qualities} />
                            <MeetingsCard value={user.completedMeetings} />
                        </div>

                        <div className="col-md-8">
                            <Comments pageId={userId} />
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return <h2>Loading...</h2>;
};
UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};
export default UserPage;
