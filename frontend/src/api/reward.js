import axios from 'axios';

const BASE_URL = 'http://localhost:3001/rewards'

const rewardApi = {
    async get(userId) {
        const res = await axios.get(`${BASE_URL}?userId=${userId}`);
        return res.data;
    },
    async post(reward) {
        const res = await axios.post(BASE_URL, reward);
        return res.data
    },
    async delete(reward) {
        const res = await axios.delete(`${BASE_URL}/${reward.id}`)
        return res.data
    },
    async patch(reward) {
        const res = await axios.put(`${BASE_URL}/${reward.id}`, reward)
    }

}

export default rewardApi;