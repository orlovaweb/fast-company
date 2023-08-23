import PropTypes from "prop-types";
import React, { useState } from "react";
import { validator } from "../../utils/validator";
import TextAreaField from "../common/form/textAreaField";

const CommentForm = ({ onSubmit }) => {
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        commentText: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clearForm = () => {
        setData({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <div>
                        <h2>New comment</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <TextAreaField
                                    label="Сообщение"
                                    name="commentText"
                                    value={data.commentText || ""}
                                    onChange={handleChange}
                                    error={errors.commentText}
                                />
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-primary">
                                    Опубликовать
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
CommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default CommentForm;
