// POINT axiosを用いたAPI
import axios from 'axios';

const BASE_URL = 'http://localhost:3001/users'

const userApi = {
    async get(userId) {
        const res = await axios.get(`${BASE_URL}/${userId}`);
        return res.data;
    },
    async patch(userId, updates) {
        const res = await axios.patch(`${BASE_URL}/${userId}`, updates);
        return res.data
    }
}

export default userApi;

// import axios from 'axios';

// const BASE_URL = 'http://localhost:3001/users'; // 複数形に変更

// const userApi = {
//     // ユーザー情報取得
//     async get(userId) {
//         const res = await axios.get(`${BASE_URL}/${userId}`);
//         return res.data;
//     },
    
//     // ユーザー情報更新（部分更新）
//     async update(userId, updates) {
//         const res = await axios.patch(`${BASE_URL}/${userId}`, updates);
//         return res.data;
//     },
    
//     // コイン追加
//     async addCoins(userId, amount) {
//         const user = await this.get(userId);
//         const newCoins = user.coins + amount;
//         return await this.update(userId, { coins: newCoins });
//     },
    
//     // コイン減算
//     async subtractCoins(userId, amount) {
//         const user = await this.get(userId);
//         if (user.coins < amount) {
//             throw new Error('Not enough coins');
//         }
//         const newCoins = user.coins - amount;
//         return await this.update(userId, { coins: newCoins });
//     },
    
//     // 経験値追加（レベルアップ処理含む）
//     async addExp(userId, amount) {
//         const user = await this.get(userId);
//         let newExp = user.exp + amount;
//         let newLevel = user.level;
        
//         // レベルアップ処理
//         while (newExp >= user.maxExp) {
//             newExp -= user.maxExp;
//             newLevel++;
//         }
        
//         return await this.update(userId, {
//             exp: newExp,
//             level: newLevel
//         });
//     },
    
//     // チケット追加
//     async addTicket(userId, ticketType, amount = 1) {
//         const user = await this.get(userId);
//         const newTickets = {
//             ...user.tickets,
//             [ticketType]: user.tickets[ticketType] + amount
//         };
//         return await this.update(userId, { tickets: newTickets });
//     },
    
//     // チケット使用
//     async useTicket(userId, ticketType, amount = 1) {
//         const user = await this.get(userId);
//         if (user.tickets[ticketType] < amount) {
//             throw new Error(`Not enough ${ticketType} tickets`);
//         }
//         const newTickets = {
//             ...user.tickets,
//             [ticketType]: user.tickets[ticketType] - amount
//         };
//         return await this.update(userId, { tickets: newTickets });
//     }
// };

// export default userApi;