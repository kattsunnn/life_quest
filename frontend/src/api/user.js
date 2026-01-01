// POINT axios????????????API
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api'

const userApi = {
    async get(userId) {
        const res = await axios.get(`${BASE_URL}/users/${userId}/`);
        return res.data;
    },
    async patch(userId, updates) {
        const res = await axios.patch(`${BASE_URL}/users/${userId}/`, updates);
        return res.data
    }
}

export default userApi;