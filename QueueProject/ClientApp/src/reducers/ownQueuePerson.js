import { DELETE_QUEUE_OWN_SUCCESS, GET_OWN_QUEUES } from "../constants/ownQueuePerson";

const initialState = {
    ownQueues: []
};

export default function ownQueuePerson(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_OWN_QUEUES:
            return {
                ...state,
                ownQueues: payload.ownQueues
            }
        case DELETE_QUEUE_OWN_SUCCESS:
            return {
                ...state,
                ownQueues: state.ownQueues.filter(x => x.id !== payload.id)
            }
        default:
            return state;
    }
}