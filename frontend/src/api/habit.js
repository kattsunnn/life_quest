import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'

const habitApi = {
    async get(userId) {
        const res = await axios.get(`${BASE_URL}/users/${userId}/habits/`);
        return res.data;
    },
    async post(userId, habit) {
        const res = await axios.post(`${BASE_URL}/users/${userId}/habits/`, habit);
        return res.data
    },
    async delete(habitId) {
        const res = await axios.delete(`${BASE_URL}/habits/${habitId}/`)
        return res.data
    },
    async patch(habitId, updates) {
        const res = await axios.patch(`${BASE_URL}/habits/${habitId}`, updates)
        return res.data
    }
}

export default habitApi;