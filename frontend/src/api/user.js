// POINT axios????????????API
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api/users'

const userApi = {
    async get(id) {
        const res = await axios.get(`${BASE_URL}/${id}/`);
        return res.data;
    },
    async patch(id, updates) {
        const res = await axios.patch(`${BASE_URL}/${id}/`, updates);
        return res.data
    }
}

export default userApi;