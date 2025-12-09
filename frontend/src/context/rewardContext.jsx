import { createContext, useContext, useEffect, useReducer } from "react"
import rewardApi from "../api/reward"

const RewardContext = createContext();
const RewardDispatchContext = createContext();

const rewardReducer = (rewards, action) => {
  switch (action.type) {
    case "reward/init":
        return action.reward;
    case "reward/add":
        return [...rewards, action.reward];
    case "reward/delete":
        return rewards.filter(reward => reward.id !== action.rewardId); 
    case "reward/patch":
        return rewards.map(reward => 
            reward.id === action.reward.id ? action.reward : reward
        );
    default:
        return rewards;
  }
}

const RewardProvider = ({children}) => {
    const [ rewards, dispatch ] = useReducer(rewardReducer, [])
    const userId = 1;

    useEffect(() => {
        rewardApi.get(userId).then(rewardData => {
            dispatch({ type: "reward/init", reward: rewardData})
        })
    }, [])

    return (
        <RewardContext.Provider value={rewards}>
            <RewardDispatchContext.Provider value={dispatch}>
                {children}
            </RewardDispatchContext.Provider>
        </RewardContext.Provider>
    )
}

const useReward = () => useContext(RewardContext)
const useDispatchreward = () => useContext(RewardDispatchContext)

export { useReward, useDispatchreward, RewardProvider };

