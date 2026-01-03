import { useNavigate, useLocation } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import TabButton from "./TabButton";
import { FaCalendarAlt, FaClipboardList, FaGift, FaCog } from "react-icons/fa";

const Tab = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const path =  location.pathname

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
                    isActive={path === "/static/setting"}
                    onClick={() => navigate("/static/setting")}
                    />    
                <TabButton
                    icon={FaCalendarAlt}
                    isActive={path === "/static/habit"}
                    onClick={() => navigate("/static/habit")}
                    />    
                <TabButton
                    icon={FaClipboardList}
                    isActive={path === "/static/todo"}
                    onClick={() => navigate("/static/todo")}
                    />    
                <TabButton
                    icon={FaGift}
                    isActive={path === "/static/reward"}
                    onClick={() => navigate("/static/reward")}
                    /> 
            </Flex>
        </>
   );
};

export default Tab;