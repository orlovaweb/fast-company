import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import TextAreaField from "../common/form/textAreaField";

const defaultData = { user: "", commentText: "" };

const CommentForm = ({ onSubmit }) => {
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const [data, setData] = useState(defaultData);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        user: {
            isRequired: {
                message:
                    "Выберите от чьего имени вы хотите отправить комментарий"
            }
        },
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
        setData(defaultData);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data.user, data.commentText);
        clearForm();
    };
    useEffect(() => {
        api.users.fetchAll().then((data) => {
            const usersList = data.map((user) => ({
                label: user.name,
                value: user._id
            }));
            setUsers(usersList);
        });
    }, []);

    if (users) {
        return (
            <>
                <div className="card mb-2">
                    <div className="card-body">
                        <div>
                            <h2>New comment</h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <SelectField
                                        onChange={handleChange}
                                        options={users}
                                        name="user"
                                        value={data.user}
                                        defaultOption="Выберите пользователя"
                                        error={errors.user}
                                    />
                                </div>
                                <div className="mb-4">
                                    <TextAreaField
                                        label="Сообщение"
                                        name="commentText"
                                        value={data.commentText}
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
    }
    return "Loading...";
};
CommentForm.propTypes = {
    onSubmit: PropTypes.func
};
export default CommentForm;
