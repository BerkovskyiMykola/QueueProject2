import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Places/";

class PlaceService {
    getOwnPlaces() {
        return axios.get(API_URL + "placeOwner/all", { headers: authHeader() });
    }

    getAvailablePlaces() {
        return axios.get(API_URL + "all", { headers: authHeader() });
    }

    createPlace(name, address, isActive) {
        return axios.post(API_URL + "create", { name, address, isActive }, { headers: authHeader() });
    }

    deletePlace(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editPlace(id, name, address, isActive) {
        return axios.put(API_URL + "edit/" + id, { id, name, address, isActive }, { headers: authHeader() });
    }
}

export default new PlaceService();