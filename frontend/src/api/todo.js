import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'

const todoApi = {
    async get(userId) {
        const res = await axios.get(`${BASE_URL}/users/${userId}/todos/`);
        return res.data;
    },
    async post(userId, todo) {
        const res = await axios.post(`${BASE_URL}/users/${userId}/todos/`, todo);
        return res.data
    },
    async delete(todoId) {
        const res = await axios.delete(`${BASE_URL}/todos/${todoId}/`)
        return res.data
    },
    async patch(todoId, updates) {
        const res = await axios.patch(`${BASE_URL}/todos/${todoId}/`, updates)
        return res.data
    }

}

export default todoApi;