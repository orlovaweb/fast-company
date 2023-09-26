import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import { getCurrentUserData, uploadUser } from "../../../store/users";
import { validator } from "../../../utils/validator";
import BackHistoryButton from "../../common/backButton";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";

const UserPageEdit = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const dispatch = useDispatch();
    const qualities = useSelector(getQualities());
    const isLoadingQualities = useSelector(getQualitiesLoadingStatus());
    const professions = useSelector(getProfessions());
    const isLoadingProfessions = useSelector(getProfessionsLoadingStatus());

    const [errors, setErrors] = useState({});
    const currentUser = useSelector(getCurrentUserData());
    const professionsList = professions.map((prof) => ({
        label: prof.name,
        value: prof._id
    }));
    const qualitiesList = qualities.map((qual) => ({
        value: qual._id,
        label: qual.name,
        color: qual.color
    }));
    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    const transformData = (data) => {
        const result = getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id,
            color: qual.color
        }));
        return result;
    };
    useEffect(() => {
        if (
            currentUser &&
            !isLoadingProfessions &&
            !isLoadingQualities &&
            !data
        ) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [data, isLoadingQualities, isLoadingProfessions, currentUser]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязанельно к заполнению"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const dataUpload = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        dispatch(uploadUser(dataUpload));
    };

    if (!isLoading) {
        return (
            <>
                <div className="container mt-5">
                    <div className="row">
                        <BackHistoryButton />
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <h3 className="mb-4">Изменить пользователя</h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={professionsList}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />

                                <button
                                    className="btn btn-primary w-100 mx-auto"
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return <h2>Loading...</h2>;
};

export default UserPageEdit;
