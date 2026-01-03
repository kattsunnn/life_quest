import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'

const rewardApi = {
    async get(userId) {
        const res = await axios.get(`${BASE_URL}/users/${userId}/rewards/`);
        return res.data;
    },
    async post(userId, reward) {
        const res = await axios.post(`${BASE_URL}/users/${userId}/rewards/`, reward);
        return res.data
    },
    async delete(rewardId) {
        const res = await axios.delete(`${BASE_URL}/rewards/${rewardId}/`)
        return res.data
    },
    async patch(rewardId, updates) {
        const res = await axios.patch(`${BASE_URL}/rewards/${rewardId}/`, updates)
        return res.data
    }

}

export default rewardApi;