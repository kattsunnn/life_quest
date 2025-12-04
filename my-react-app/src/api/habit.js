import axios from 'axios';

const BASE_URL = 'http://localhost:3001/habits'

const habitApi = {
    async get(userId) {
        const res = await axios.get(`${BASE_URL}?userId=${userId}`);
        return res.data;
    },
    async post(habit) {
        const res = await axios.post(BASE_URL, habit);
        return res.data
    },
    async delete(habit) {
        const res = await axios.delete(`${BASE_URL}/${habit.id}`)
        return res.data
    },
    async patch(habit) {
        const res = await axios.put(`${BASE_URL}/${habit.id}`, habit)
    }

}

export default habitApi;