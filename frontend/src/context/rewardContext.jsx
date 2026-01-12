import { createContext, useContext, useEffect, useReducer } from "react"
import rewardApi from "../api/reward"

const RewardContext = createContext();
const RewardDispatchContext = createContext();
const RewardActionsContext = createContext();

function rewardServerToClient(reward) {
    const mapping = {
        user_id: "userId",
        is_purchased: "isPurchased",
        created_at: "createdAt",
        updated_at: "updatedAt",
    };
    const result = { ...reward };
    for (const [serverKey, clientKey] of Object.entries(mapping)) {
        if (reward[serverKey] !== undefined) {
            result[clientKey] = reward[serverKey];
        }
    }
    return result;
}

function rewardClientToServer(reward) {
    const mapping = {
        userId: "user_id",
        isPurchased: "is_purchased",
        createdAt: "created_at",
        updatedAt: "updated_at",
    };
    const result = { ...reward };
    for (const [clientKey, serverKey] of Object.entries(mapping)) {
        if (reward[clientKey] !== undefined) {
            result[serverKey] = reward[clientKey];
        }
    }
    return result;
}

const sortRewards = (rewards) => {
    const sorted = [...rewards].sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
        }
        return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    return sorted;
}

const validateReward = (data) => {
    if (data.hasOwnProperty('taskName')) {
        if (!data.taskName || data.taskName.trim() === "") {
            throw new Error("タスク名を入力してください");
        }
    }
    if (data.hasOwnProperty('difficulty')) {
        if (data.difficulty < 1 || data.difficulty > 5) {
            throw new Error("難易度は1-5の範囲で設定してください");
        }
    }
    if (data.hasOwnProperty('reward')) {
        if (data.reward < 1) {
            throw new Error("報酬は1以上で設定してください");
        }
    }
}

const rewardReducer = (rewards, action) => {
    let newRewards;

    switch (action.type) {
    case "reward/init":
        return sortRewards(action.rewards);

    case "reward/add": 
        newRewards = [...rewards, action.reward];
        return sortRewards(newRewards);

    case "reward/delete":
        newRewards = rewards.filter(reward => reward.id !== action.reward.id);
        return sortRewards(newRewards);

    case "reward/patch":
        newRewards = rewards.map(reward => 
            reward.id === action.reward.id ? action.reward : reward
        );
        return sortRewards(newRewards);
    default:
        return rewards;
    }
};

const RewardProvider = ({children}) => {
    const [ rewards, dispatch ] = useReducer(rewardReducer, [])
    const userId = 4;

    useEffect(() => {
        rewardApi.get(userId).then(rewards => {
            dispatch({ type: "reward/init", rewards: rewards.map(reward => rewardServerToClient(reward))})
        })
    }, [])

    const actions = {
        createReward: async (reward) => {
            validateReward(reward)
            const rewardRes = await rewardApi.post(userId, rewardClientToServer(reward))
            dispatch({ type: "reward/add", reward: rewardServerToClient(rewardRes) })
        },
        editReward: async (rewardId, updates) => {
            validateReward(updates)
            const rewardRes = await rewardApi.patch(rewardId, rewardClientToServer(updates))
            dispatch({ type: "reward/patch", reward: rewardServerToClient(rewardRes) })
        },
        deleteReward: async (rewardId) => {
            const rewardRes = await rewardApi.delete(rewardId)
            dispatch({ type: "reward/delete", reward: rewardServerToClient(rewardRes) })
        },
        getPurchasedRewards: () => {  return rewards.filter(t => t.isPurchased) },
        getUnpurchasedRewards: () => { return rewards.filter(t => !t.isPurchased) },
    }

    return (
        <RewardContext.Provider value={rewards}>
            <RewardDispatchContext.Provider value={dispatch}>
                <RewardActionsContext.Provider value={actions}>
                    {children}
                </RewardActionsContext.Provider>
            </RewardDispatchContext.Provider>
        </RewardContext.Provider>
    )
}

const useReward = () => useContext(RewardContext)
const useDispatchReward = () => useContext(RewardDispatchContext)
const useRewardActions = () => useContext(RewardActionsContext)

export { useReward, useDispatchReward, useRewardActions, RewardProvider };

