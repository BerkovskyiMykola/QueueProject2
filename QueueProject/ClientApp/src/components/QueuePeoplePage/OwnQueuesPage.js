import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import List from '../ListComponents/List'
import { useTranslation } from 'react-i18next';
import { deleteOwnQueuePerson, getQueues } from '../../actions/ownQueuePerson';

const OwnQueuesPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { ownQueues } = useSelector(state => ({
        ownQueues: state.ownQueuePerson.ownQueues
    }), shallowEqual)

    useEffect(() => {
        dispatch(getQueues(t));
    }, [dispatch, t])

    const action = (item) => {
        return (
            <td>
                <button
                    onClick={() => { dispatch(deleteOwnQueuePerson(item.id, t)) }}
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="bi-trash" />
                </button>
            </td>
        )
    }

    return (
        <>
            <List
                name="queues"
                records={ownQueues.map(x => { return { ...x, created: new Date(x.created + "Z").toLocaleString() } })}
                k="id"
                columns={['number', 'name', 'address', 'created', 'status']}
                refreshRecords={() => { dispatch(getQueues(t)); }}
                action={action}
            />
        </>
    );
};

export default OwnQueuesPage;