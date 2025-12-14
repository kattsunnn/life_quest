import { useNavigate, useLocation } from "react-router-dom";
import { Dialog, Portal } from "@chakra-ui/react"
import AddTodoDialog from "./AddTodoDialog";
import AddHabitDialog from "./AddHabitDialog";
import EditTodoDialog from "./EditTodoDialog";


const DialogWrapper = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname; 
    const editData = location.state?.editData;
    console.log(path)
    console.log("editData:", JSON.stringify(editData, null, 2));

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
                            {path === "/static/add/habit" && <AddHabitDialog />}
                            {path === "/static/edit/todo" && <EditTodoDialog editData={editData}/>}
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default DialogWrapper