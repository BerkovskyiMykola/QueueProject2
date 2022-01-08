import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { CREATE_PLACE_ERROR, CREATE_PLACE_SUCCESS, DELETE_PLACE_ERROR, DELETE_PLACE_SUCCESS, EDIT_PLACE_ERROR, EDIT_PLACE_SUCCESS, GET_OWN_PLACES, GET_PLACES } from "../constants/place";
import { toast } from "react-toastify";
import placeService from "../services/place.service";

export const getOwnPlaces = (t) => (dispatch) => {
    return placeService.getOwnPlaces().then(
        (responce) => {
            dispatch({
                type: GET_OWN_PLACES,
                payload: { ownPlaces: responce.data }
            });

            toast.success(t("LoadSuccess"));
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            else {
                toast.error(t("Error"));
            }
        }
    )
}

export const getAvailablePlaces = (t) => (dispatch) => {
    return placeService.getAvailablePlaces().then(
        (responce) => {
            dispatch({
                type: GET_PLACES,
                payload: { places: responce.data }
            });

            toast.success(t("LoadSuccess"));
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            else {
                toast.error(t("Error"));
            }
        }
    )
}

export const editPlace = (id, name, address, isActive, t) => (dispatch) => {
    return placeService.editPlace(id, name, address, isActive).then(
        (responce) => {
            dispatch({
                type: EDIT_PLACE_SUCCESS,
                payload: { id, name, address, isActive }
            });

            toast.success(t("EditSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_PLACE_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const createPlace = (name, address, isActive, t) => (dispatch) => {
    return placeService.createPlace(name, address, isActive).then(
        (responce) => {
            dispatch({
                type: CREATE_PLACE_SUCCESS,
                payload: { place: responce.data }
            });

            toast.success(t("CreateSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_PLACE_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const deletePlace = (id, t) => (dispatch) => {
    return placeService.deletePlace(id).then(
        (responce) => {
            dispatch({
                type: DELETE_PLACE_SUCCESS,
                payload: { id }
            });

            toast.success(t("DeleteSuccess"));
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            else {
                toast.error(t("Error"));
            }

            dispatch({
                type: DELETE_PLACE_ERROR
            });
        }
    )
}