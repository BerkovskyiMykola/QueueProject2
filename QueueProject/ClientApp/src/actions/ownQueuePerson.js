import EventBus from "../common/EventBus";
import {  } from "../constants/queuePerson";
import { toast } from "react-toastify";
import queuePerson from "../services/queuePerson.service";
import { DELETE_QUEUE_OWN_ERROR, DELETE_QUEUE_OWN_SUCCESS, GET_OWN_QUEUES } from "../constants/ownQueuePerson";

export const getQueues = (t) => (dispatch) => {
    return queuePerson.getQueues().then(
        (responce) => {
            dispatch({
                type: GET_OWN_QUEUES,
                payload: { ownQueues: responce.data }
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

export const deleteOwnQueuePerson = (id, t) => (dispatch) => {
    return queuePerson.deleteOwnQueuePerson(id).then(
        (responce) => {
            dispatch({
                type: DELETE_QUEUE_OWN_SUCCESS,
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
                type: DELETE_QUEUE_OWN_ERROR
            });
        }
    )
}