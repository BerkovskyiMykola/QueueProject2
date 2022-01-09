import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/QueuePersons/";

class QueuePersonService {
    getStatuses() {
        return axios.get(CURRENT_DOMAIN + "/Status/all", { headers: authHeader() });
    }

    getQueuePerson(id) {
        return axios.get(API_URL + "all/" + id, { headers: authHeader() });
    }

    createQueuePerson(placeID) {
        return axios.post(API_URL + "create", { placeID }, { headers: authHeader() });
    }

    editQueuePerson(id, statusId) {
        return axios.put(API_URL + "edit/" + id, { id, statusId }, { headers: authHeader() });
    }

    deleteQueuePerson(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }
}

export default new QueuePersonService();