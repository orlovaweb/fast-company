import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const itemsArray = Array.isArray(items) ? [...items] : Object.values(items);
    return (
        <ul className="list-group">
            {itemsArray.map((item, index) => (
                <li
                    key={itemsArray[index][valueProperty]}
                    className={
                        "list-group-item" +
                        (itemsArray[index] === selectedItem ? " active" : "")
                    }
                    onClick={() => onItemSelect(itemsArray[index])}
                    role="button"
                >
                    {itemsArray[index][contentProperty]}
                </li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    // items: PropTypes.PropTypes.object,
    selectedItem: PropTypes.object,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func.isRequired
};
export default GroupList;
