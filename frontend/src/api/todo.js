import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api'

const buildQs = (params = {}) => {
    const qs = new URLSearchParams();
    if (params.completed !== undefined) qs.append('completed', params.completed );
    if (params.completed_at !== undefined) qs.append('completed_at', params.completed_at);
    if (params.completed_before !== undefined) qs.append('completed_before', params.completed_before)
    if (params.sort !== undefined) qs.append('sort', params.sort);
    if (params.page !== undefined) qs.append('page', params.page);
    if (params.limit !== undefined) qs.append('limit', params.limit);
    return qs.toString();
}

const todoApi = {
    async get(userId, params = {}) {
        const qs = buildQs(params);
        const url = `${BASE_URL}/users/${userId}/todos/${qs ? `?${qs}` : ''}`;
        const res = await axios.get(url);
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