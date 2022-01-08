import { CREATE_PLACE_SUCCESS, DELETE_PLACE_SUCCESS, EDIT_PLACE_SUCCESS, GET_OWN_PLACES, GET_PLACES } from "../constants/place";

const initialState = {
    ownPlaces: [],
    places: []
};

export default function place(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_OWN_PLACES:
            return {
                ...state,
                ownPlaces: payload.ownPlaces
            }
        case GET_PLACES:
            return {
                ...state,
                places: payload.places
            }
        case CREATE_PLACE_SUCCESS:
            return {
                ...state,
                ownPlaces: [...state.ownPlaces, payload.place]
            }
        case DELETE_PLACE_SUCCESS:
            return {
                ...state,
                ownPlaces: state.ownPlaces.filter(x => x.id !== payload.id)
            }
        case EDIT_PLACE_SUCCESS:
            return {
                ...state,
                ownPlaces: state.ownPlaces.map(x => {
                    if (x.id === payload.id)
                        return {
                            ...x,
                            name: payload.name,
                            address: payload.address,
                            isActive: payload.isActive
                        }
                    return x;
                })
            }
        default:
            return state;
    }
}