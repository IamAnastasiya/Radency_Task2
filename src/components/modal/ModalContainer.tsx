import classes from './ModalContainer.module.css';
import NoteForm from './NoteForm';
import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import  { modalActions }  from '../../store/modal-slice';

const ModalContainer = () => {
    
    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);

    const cancelModalHandler = () => {
        dispatch(modalActions.toggleVisibility());
        dispatch(modalActions.prepopulateData({id: '', name: '', content: '', category: 'task'}));
        dispatch(modalActions.toggleMode('adding'));
    }

    return (
        <>
            <div className={`${classes.backdrop} ${modal.isVisible && classes.visible}`} onClick={cancelModalHandler}></div>
            <div className={`${classes.modal} ${modal.isVisible && classes.visible}`} id="open-modal">    
                <NoteForm />
            </div>
        </>
    )
}

export default ModalContainer;