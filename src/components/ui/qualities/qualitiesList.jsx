import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";
import Quality from "./qualitie";

const QualitiesList = ({ arrayQualitiesId }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualities = useSelector(getQualities());
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    const qualitiesArray = [];
    for (const qualId of arrayQualitiesId) {
        for (const quality of qualities) {
            if (quality._id === qualId) {
                qualitiesArray.push(quality);
                break;
            }
        }
    }

    if (isLoading) return "Loading...";
    return (
        <>
            {qualitiesArray.map((quality) => (
                <Quality key={quality._id} {...quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    arrayQualitiesId: PropTypes.array
};
export default QualitiesList;
