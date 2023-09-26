import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    const professions = useSelector(getProfessions());
    const isLoading = useSelector(getProfessionsLoadingStatus());

    if (!isLoading) {
        const [prof] = professions.filter((p) => p._id === id);
        return <p>{prof.name}</p>;
    } else {
        return "loading...";
    }
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
