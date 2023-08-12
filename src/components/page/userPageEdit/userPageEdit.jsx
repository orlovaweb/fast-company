import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import SelectField from "../../common/form/selectField";
import TextField from "../../common/form/textField";
import BackHistoryButton from "../../common/backButton";

const UserPageEdit = () => {
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [errors, setErrors] = useState({});
    // const history = useHistory();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    useEffect(() => {
        if (user) {
            const qualitiesUserList = user.qualities.map((qual) => {
                return { value: qual._id, label: qual.name, color: qual.color };
            });
            setData((prevState) => ({
                ...prevState,
                name: user.name,
                email: user.email,
                profession: user.profession._id,
                sex: user.sex,
                qualities: qualitiesUserList
            }));
        }
    }, [user]);
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log(data);
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
        const { profession, qualities } = data;
        const dataUpload = {
            ...data,
            profession: getProfessionById(data.profession),
            qualities: getQualities(data.qualities)
        };
        api.users
            .update(userId, dataUpload)
            .then((data) => history.push(`/users/${data._id}`));
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    if (user && professions.length > 0) {
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
                                    options={professions}
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
                                    options={qualities}
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
// UserPageEdit.propTypes = {
//     userId: PropTypes.string.isRequired
// };
export default UserPageEdit;
