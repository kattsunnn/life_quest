import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, Portal } from "@chakra-ui/react"
import AddTodoDialog from "./AddTodoDialog";
import AddHabitDialog from "./AddHabitDialog";
import EditTodoDialog from "./EditTodoDialog";
import EditHabitDialog from "./EditHabitDialog";


const DialogWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname; 
    const editData = location.state?.editData;

    const handleClose = () => navigate(-1);

    return (
        <>
            <Dialog.Root 
            open={true} 
            onOpenChange={handleClose}
            placement="center" size="cover"
            motionPreset="none"
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content >
                            {path === "/static/add/todo" && <AddTodoDialog />}
                            {path === "/static/edit/todo" && <EditTodoDialog editData={editData}/>}
                            {path === "/static/add/habit" && <AddHabitDialog />}
                            {path === "/static/edit/habit" && <EditHabitDialog editData={editData}/>}
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default DialogWrapper