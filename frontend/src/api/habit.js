import axios from 'axios';

const BASE_URL = 'http://localhost:8000/habits'

const habitApi = {
    async get(userId) {
        const res = await axios.get(`${BASE_URL}/?userId=${userId}`);
        return res.data;
    },
    async post(habit) {
        const res = await axios.post(`${BASE_URL}/`, habit);
        return res.data
    },
    async delete(id) {
        const res = await axios.delete(`${BASE_URL}/${id}/`)
        return res.data
    },
    async patch(id, updates) {
        const res = await axios.put(`${BASE_URL}/${id}/`, updates)
        return res.data
    }

}

export default habitApi;