import { useRewardActions } from "../../context/rewardContext";
import { useNavigate } from "react-router-dom";
import { Accordion, Flex } from "@chakra-ui/react"

import AccordionSection from "./AcoordionSection";
import RewardItem from "../Item/RewardItem"

const RewardList = () => {

    const { getPurchasedRewards, getUnpurchasedRewards } = useRewardActions()
    const purchasedRewards = getPurchasedRewards()
    const unpurchasedRewards = getUnpurchasedRewards()

    const navigate = useNavigate();
    const handleEdit = (data) => {
        navigate(`/static/edit/reward`, { state: { editData: data } });
    }

    return (
        <>
            <Accordion.Root collapsible multiple defaultValue={["rewards"]}>
                <AccordionSection value="rewards" title="ご褒美">
                    <Flex
                        direction="column"
                        gap="1">
                        {unpurchasedRewards.map((reward) => (
                            <RewardItem
                                key={reward.id}
                                reward={reward}
                                handleEdit={() => handleEdit(reward)}
                                />
                        ))}
                    </Flex>
                </AccordionSection>
                <AccordionSection value="purchased_today" title="獲得済み（今日）">
                    <Flex
                        direction="column"
                        gap="1">
                        {purchasedRewards.map((reward) => (
                            <RewardItem
                                key={reward.id}
                                reward={reward}
                                handleEdit={() => handleEdit(reward)}
                            />
                    ))}
                    </Flex>
                </AccordionSection>
                <AccordionSection value="purchased_past" title="獲得済み（過去）">
                    <Flex
                        direction="column"
                        gap="1">
                        {purchasedRewards.map((reward) => (
                            <RewardItem
                                key={reward.id}
                                reward={reward}
                                handleEdit={() => handleEdit(reward)}
                            />
                    ))}
                    </Flex>
                </AccordionSection>
            </Accordion.Root>
        </>
    )
}

export default RewardList