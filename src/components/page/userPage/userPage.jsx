import PropTypes from "prop-types";
import React from "react";
import { CommentsProvider } from "../../../hooks/useComments";
import { useUser } from "../../../hooks/useUsers";
import Comments from "../../ui/comments";
import MeetingsCard from "../../ui/meetingsCard";
import QualitiesCard from "../../ui/qualitiesCard";
import UserCard from "../../ui/userCard";

const UserPage = ({ userId }) => {
    const { getUserById } = useUser();
    const user = getUserById(userId);

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
                            <CommentsProvider>
                                <Comments />
                            </CommentsProvider>
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
