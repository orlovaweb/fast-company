import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";
import Comments from "../../ui/comments";
import MeetingsCard from "../../ui/meetingsCard";
import QualitiesCard from "../../ui/qualitiesCard";
import UserCard from "../../ui/userCard";

const UserPage = ({ userId }) => {
    const user = useSelector(getUserById(userId));

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
                            <Comments />
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
