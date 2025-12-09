import { Box, Flex, IconButton } from "@chakra-ui/react";
import TabButton from "./TabButton";
import { FaCalendarAlt, FaClipboardList, FaGift, FaCog } from "react-icons/fa";

const Tab = ({ activeTab, setActiveTab }) => {
   return (
        <>
            <Flex
                width="100%"
                boxShadow="md"
                justify="space-around"
                p="2"
                bg="green.600">
                <TabButton 
                    icon={FaCog}
                    isActive={activeTab === "setting"}
                    onClick={() => setActiveTab("setting")}
                    />    
                <TabButton
                    icon={FaCalendarAlt}
                    isActive={activeTab === "habit"}
                    onClick={() => setActiveTab("habit")}
                    />    
                <TabButton
                    icon={FaClipboardList}
                    isActive={activeTab === "todo"}
                    onClick={() => setActiveTab("todo")}
                    />    
                <TabButton
                    icon={FaGift}
                    isActive={activeTab === "reward"}
                    onClick={() => setActiveTab("reward")}
                    /> 
            </Flex>
        </>
   );
};

export default Tab;