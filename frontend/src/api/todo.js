import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/todos'

const todoApi = {
    async get(userId) {
        const res = await axios.get(`${BASE_URL}/?user_id=${userId}`);
        return res.data;
    },
    async post(todo) {
        const res = await axios.post(`${BASE_URL}/`, todo);
        return res.data
    },
    async delete(id) {
        const res = await axios.delete(`${BASE_URL}/${id}/`)
        return res.data
    },
    async patch(id, updates) {
        const res = await axios.patch(`${BASE_URL}/${id}/`, updates)
        return res.data
    }

}

export default todoApi;