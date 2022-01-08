import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import List from '../ListComponents/List'
import { useTranslation } from 'react-i18next';
import { getAvailablePlaces } from '../../actions/place';

const PlacesPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { places } = useSelector(state => ({
        places: state.place.places
    }), shallowEqual)

    useEffect(() => {
        dispatch(getAvailablePlaces(t));
    }, [dispatch, t])

    return (
        <>
            <List
                name="places"
                records={places}
                k="id"
                columns={['name', 'address']}
                refreshRecords={() => { dispatch(getAvailablePlaces(t)) }}
            />
        </>
    );
};

export default PlacesPage;