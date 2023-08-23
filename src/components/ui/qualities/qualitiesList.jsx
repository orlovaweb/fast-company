import PropTypes from "prop-types";
import React from "react";
import { useQualities } from "../../../hooks/useQualities";
import Quality from "./qualitie";

const QualitiesList = ({ arrayQualitiesId }) => {
    const { isLoading, getQuality } = useQualities();
    if (arrayQualitiesId) {
        const arrayQualities = arrayQualitiesId.map((id) => {
            const qual = getQuality(id);
            return qual;
        });

        return (
            <>
                {arrayQualities.map((quality) =>
                    !isLoading ? (
                        <Quality key={quality._id} {...quality} />
                    ) : (
                        "loading..."
                    )
                )}
            </>
        );
    }
    return null;
};

QualitiesList.propTypes = {
    arrayQualitiesId: PropTypes.array
};
export default QualitiesList;
