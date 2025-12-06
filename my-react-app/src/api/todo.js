import axios from 'axios';

const BASE_URL = 'http://localhost:3001/todos'

const todoApi = {
    async get(userId) {
        const res = await axios.get(`${BASE_URL}?userId=${userId}`);
        return res.data;
    },
    async post(todo) {
        const res = await axios.post(BASE_URL, todo);
        return res.data
    },
    async delete(todo) {
        const res = await axios.delete(`${BASE_URL}/${todo.id}`)
        return res.data
    },
    async patch(todo) {
        const res = await axios.put(`${BASE_URL}/${todo.id}`, todo)
        return res.data
    }

}

export default todoApi;