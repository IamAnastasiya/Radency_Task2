import Table from "./components/ui/Table";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { noteActions } from "./store/notes-slice";
import { modalActions } from "./store/modal-slice";

import classes from "./App.module.css";
import ModalContainer from "./components/modal/ModalContainer";

function App() {
    const [isArchiveVisible, setIsArchiveVisible] = useState(false);

    const dispatch = useDispatch();
    const archiveBtnText = isArchiveVisible ? "Hide Archive" : "Show Archive";

    useEffect(() => {
        dispatch(noteActions.getCategoryCounts());
    }, []);

    const openModalHandler = () => {
        dispatch(modalActions.toggleVisibility());
    };

    const archiveVisibilityHandler = () => {
        setIsArchiveVisible((prevState) => (prevState = !prevState));
    };

    return (
        <div className={classes.wrapper}>
            <ModalContainer />
            <Table tableMode={"active"} />
            <button className={classes["action-create"]} onClick={openModalHandler}>
                Create note
            </button>
            <Table tableMode={"summary"} />
            <button className={classes["archive-toggler"]} onClick={archiveVisibilityHandler}>
                {archiveBtnText}
            </button>
            {isArchiveVisible && <Table tableMode={"archive"} />}
        </div>
    );
}

export default App;
