import React from "react";
import { useHistory } from "react-router-dom";

const BackHistoryButton = () => {
    const history = useHistory();
    return (
        <div
            className="d-flex justify-content-start"
            onClick={() => history.goBack()}
        >
            <button className="btn btn-primary">
                {" "}
                <i className="bi bi-caret-left"></i> Назад
            </button>
        </div>
    );
};

export default BackHistoryButton;
