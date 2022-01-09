import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import List from '../ListComponents/List'
import { useTranslation } from 'react-i18next';
import { deleteQueuePerson, editQueuePerson, getQueuePerson, getStatuses } from '../../actions/queuePerson';
import ModalWindow from '../ModalWindow/ModalWindow';
import { clearMessage } from '../../actions/message';
import { SelectInput } from '../FormComponents';
import { Col, Jumbotron, Row } from 'reactstrap';

const QueuePeoplePage = (props) => {
    const id = props.match.params.id;

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modalEdit, setModalEdit] = useState(false);
    const [model, setModel] = useState({ id: "", status: "" });

    const { name, address, queuePeople, statuses, message } = useSelector(state => ({
        name: state.queuePerson.name,
        address: state.queuePerson.address,
        queuePeople: state.queuePerson.queuePeople,
        statuses: state.queuePerson.statuses,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getQueuePerson(id, t));
        dispatch(getStatuses(t));
    }, [dispatch, t])

    const clearFields = () => {
        setModel({ id: "", status: "" });
    }

    const getValues = (item) => {
        const { id, statusId } = item;
        setModel({ id, status: statusId });
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const editRecord = () => {
        dispatch(editQueuePerson(model.id, model.status, statuses.find(x => x.id === model.status)?.name, t))
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
                    onClick={() => { dispatch(deleteQueuePerson(item.id, t)) }}
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="bi-trash" />
                </button>
            </td>
        )
    }

    return (
        <>
            <Jumbotron className="bg-dark text-white">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{t("name")}: {name}</strong>
                        </h3>
                        <h3>
                            <strong>{t("address")}: {address}</strong>
                        </h3>
                    </Col>
                </Row>
            </Jumbotron>
            <List
                name="queuePeople"
                records={queuePeople.map(x => { return { ...x, created: new Date(x.created + "Z").toLocaleString()} })}
                k="id"
                columns={['created', 'status', 'email']}
                refreshRecords={() => { dispatch(getQueuePerson(id, t)); dispatch(getStatuses(t)); }}
                action={action}
            />
            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <SelectInput name="status" id="id" value="name" records={statuses} model={model} setModel={setModel} />
            </ModalWindow>
        </>
    );
};

export default QueuePeoplePage;