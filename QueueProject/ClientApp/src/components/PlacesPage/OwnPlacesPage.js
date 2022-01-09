import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import List from '../ListComponents/List'
import { useTranslation } from 'react-i18next';
import { createPlace, deletePlace, editPlace, getOwnPlaces } from '../../actions/place';
import { clearMessage } from '../../actions/message';
import { FieldInput, SelectInput } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';

const OwnPlacesPage = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [model, setModel] = useState({ id: "", name: "", address: "", isActive: "" });

    const { ownPlaces, message } = useSelector(state => ({
        ownPlaces: state.place.ownPlaces,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getOwnPlaces(t));
    }, [dispatch, t])

    const clearFields = () => {
        setModel({ id: "", name: "", address: "", isActive: "" });
    }

    const createRecord = () => {
        dispatch(createPlace(model.name, model.address, model.isActive, t))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const getValues = (item) => {
        const { id, name, address, isActive } = item;
        setModel({ id, name, address, isActive });
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const editRecord = () => {
        dispatch(editPlace(model.id, model.name, model.address, model.isActive === "true", t))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const action = (item) => {
        return (
            <td>
                <button
                    onClick={() => { getValues(item) }}
                    style={{ marginRight: "3px" }}
                    className="btn btn-outline-success btn-sm float-left">
                    <i className="bi-pencil-square" />
                </button>
                <button
                    onClick={() => { dispatch(deletePlace(item.id, t)) }}
                    style={{ marginRight: "3px" }}
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="bi-trash" />
                </button>
                <button
                    onClick={() => { props.history.push("queuePeople/" + item.id) }}
                    className="btn btn-outline-info btn-sm float-left">
                    <i class="bi-folder2-open" />
                </button>
            </td>
        )
    }

    return (
        <>
            <List
                name="places"
                records={ownPlaces.map(x => { return { ...x, active: x.isActive ? t("Yes") : t("No") } })}
                k="id"
                columns={['name', 'address', 'active']}
                createRecord={() => { clearFields(); dispatch(clearMessage()); setModalAdd(true); }}
                refreshRecords={() => { dispatch(getOwnPlaces(t)) }}
                action={action}
            />
            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <FieldInput name="name" model={model} setModel={setModel} minLength={2} maxLength={30} />
                <FieldInput name="address" model={model} setModel={setModel} minLength={2} maxLength={30} />
                <SelectInput name="isActive" id="id" value="name" records={[{ id: true, name: t("Yes") }, { id: false, name: t("No")}]} model={model} setModel={setModel} />
            </ModalWindow>
            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <FieldInput name="name" model={model} setModel={setModel} minLength={2} maxLength={30} />
                <FieldInput name="address" model={model} setModel={setModel} minLength={2} maxLength={30} />
                <SelectInput name="isActive" id="id" value="name" records={[{ id: true, name: t("Yes") }, { id: false, name: t("No") }]} model={model} setModel={setModel} />
            </ModalWindow>
        </>
    );
};

export default OwnPlacesPage;