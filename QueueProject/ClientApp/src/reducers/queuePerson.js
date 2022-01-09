import { DELETE_QUEUE_PERSON_SUCCESS, EDIT_QUEUE_PERSON_SUCCESS, GET_QUEUE_PEOPLE, GET_STATUSES } from "../constants/queuePerson";

const initialState = {
    name: '',
    address: '',
    queuePeople: [],
    statuses: []
};

export default function queuePerson(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_STATUSES:
            return {
                ...state,
                statuses: payload.statuses
            }
        case GET_QUEUE_PEOPLE:
            return {
                ...state,
                name: payload.name,
                address: payload.address,
                queuePeople: payload.queuePeople
            }
        case DELETE_QUEUE_PERSON_SUCCESS:
            return {
                ...state,
                queuePeople: state.queuePeople.filter(x => x.id !== payload.id)
            }
        case EDIT_QUEUE_PERSON_SUCCESS:
            return {
                ...state,
                queuePeople: state.queuePeople.map(x => {
                    if (x.id === payload.id)
                        return {
                            ...x,
                            statusId: payload.statusId,
                            status: payload.status
                        }
                    return x;
                })
            }
        default:
            return state;
    }
}