import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import List from '../ListComponents/List'
import { useTranslation } from 'react-i18next';
import { getAvailablePlaces } from '../../actions/place';
import { createQueuePerson } from '../../actions/queuePerson';

const PlacesPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { places } = useSelector(state => ({
        places: state.place.places
    }), shallowEqual)

    useEffect(() => {
        dispatch(getAvailablePlaces(t));
    }, [dispatch, t])

    const action = (item) => {
        return (
            <td>
                <button
                    onClick={() => { dispatch(createQueuePerson(item.id, t)) }}
                    className="btn btn-outline-success btn-sm float-left">
                    {t("Queue up")}
                </button>
            </td>
        )
    }

    return (
        <>
            <List
                name="places"
                records={places}
                k="id"
                columns={['name', 'address']}
                refreshRecords={() => { dispatch(getAvailablePlaces(t)) }}
                action={action}
            />
        </>
    );
};

export default PlacesPage;