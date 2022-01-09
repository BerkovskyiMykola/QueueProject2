import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { DELETE_QUEUE_PERSON_ERROR, DELETE_QUEUE_PERSON_SUCCESS, EDIT_QUEUE_PERSON_ERROR, EDIT_QUEUE_PERSON_SUCCESS, GET_QUEUE_PEOPLE, GET_STATUSES } from "../constants/queuePerson";
import { toast } from "react-toastify";
import queuePerson from "../services/queuePerson.service";
import { history } from "../utils/history";

export const getQueuePerson = (id, t) => (dispatch) => {
    return queuePerson.getQueuePerson(id).then(
        (responce) => {
            dispatch({
                type: GET_QUEUE_PEOPLE,
                payload: responce.data
            });

            toast.success(t("LoadSuccess"));
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            else {
                history.push("/404")
            }
        }
    )
}

export const getStatuses = (t) => (dispatch) => {
    return queuePerson.getStatuses().then(
        (responce) => {
            dispatch({
                type: GET_STATUSES,
                payload: { statuses: responce.data }
            });
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

export const createQueuePerson = (placeID, t) => (dispatch) => {
    return queuePerson.createQueuePerson(placeID).then(
        (responce) => {
            toast.success(t("CreateSuccess"));
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            const message = error.response.data.title || error.response.data;

            toast.error(t(message));
        }
    )
}

export const editQueuePerson = (id, statusId, status, t) => (dispatch) => {
    return queuePerson.editQueuePerson(id, statusId).then(
        (responce) => {
            dispatch({
                type: EDIT_QUEUE_PERSON_SUCCESS,
                payload: { id, statusId, status }
            });

            toast.success(t("EditSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_QUEUE_PERSON_ERROR
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

export const deleteQueuePerson = (id, t) => (dispatch) => {
    return queuePerson.deleteQueuePerson(id).then(
        (responce) => {
            dispatch({
                type: DELETE_QUEUE_PERSON_SUCCESS,
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
                type: DELETE_QUEUE_PERSON_ERROR
            });
        }
    )
}