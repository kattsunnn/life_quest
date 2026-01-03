import { useReward } from "../../context/rewardContext";
import { useNavigate } from "react-router-dom";
import RewardItem from "../Item/RewardItem"

const RewardList = () => {

    const rewards = useReward();
    const navigate = useNavigate();
    
    const handleEdit = (data) => {
        navigate(`/static/edit/reward`, { state: { editData: data } });
    }

    return (
        <>
            {rewards.map((reward) => (
                <RewardItem
                    key={reward.id}
                    reward={reward}
                    handleEdit={() => handleEdit(reward)}
                />
            ))}
        </>
    )
}

export default RewardList