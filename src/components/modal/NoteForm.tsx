import { useRef, useEffect } from 'react';
import classes from './NoteForm.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import  { noteActions }  from '../../store/notes-slice';
import  { modalActions }  from '../../store/modal-slice';
import { getCurrentDate, extractDates } from '../../helpers/helpers';

const NoteForm = () => {

    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);

    const noteNameInputRef = useRef<HTMLInputElement>(null);
    const noteContentInputRef = useRef<HTMLInputElement>(null);
    const noteSelectOptionRef = useRef<HTMLSelectElement>(null);

    
    useEffect(() => {
        noteNameInputRef.current!.value = modal.mode === 'editing' ? modal.populatedData.name : '';
        noteContentInputRef.current!.value = modal.mode === 'editing' ? modal.populatedData.content : '';
        noteSelectOptionRef.current!.value = modal.mode === 'editing' ? modal.populatedData.category : 'task';
    }, [modal.mode, modal.populatedData])

    const cancelModalHandler = () => {
        dispatch(modalActions.toggleVisibility());
        dispatch(modalActions.prepopulateData({id: '', name: '', content: '', category: 'task'}));
        dispatch(modalActions.toggleMode('adding'));
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredName = noteNameInputRef.current!.value;
        const enteredContent = noteContentInputRef.current!.value;
        const selectedCategory = noteSelectOptionRef.current!.value;

        if (modal.mode === 'adding') {
                const newNote = {
                  'id': uuidv4(),
                  'name': enteredName,
                  'content': enteredContent,
                  'date': getCurrentDate(),
                  'category': selectedCategory,
                  'dates': extractDates(enteredContent) || ''
                }
                dispatch(noteActions.addNote(newNote)); 

        } else if (modal.mode === 'editing') {
            const updatedData = {
                name: enteredName,
                content: enteredContent,
                category: selectedCategory,
                dates: extractDates(enteredContent) || ''
            }

            dispatch(noteActions.editNote({id: modal.populatedData.id, updatedValues: updatedData}));
            dispatch(modalActions.toggleMode('adding'));  
        }

        dispatch(modalActions.toggleVisibility());
        dispatch(noteActions.getCategoryCounts());
        noteNameInputRef.current!.value = '';
        noteContentInputRef.current!.value = '';
        noteSelectOptionRef.current!.value = 'task';
    }


    return (
        <form onSubmit={submitHandler} className={classes['modal-content']}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="task-name" ref={noteNameInputRef}/>
            <label htmlFor="content">Task Content</label>
            <input type="text" name="content" id="task-content" ref={noteContentInputRef}/>
            <label htmlFor="category">Category</label>
            <select className={classes.select} name="category" ref={noteSelectOptionRef}>
                <option value="task">Task</option>
                <option value="random-thought">Random Thought</option>
                <option value="idea">Idea</option>
                <option value="quote">Quote</option>
            </select>

            <div className={classes['modal-actions']}>
                <button type='button' className={classes['modal-button']} onClick={cancelModalHandler}>Cancel</button>
                {modal.mode === 'adding' && <button type="submit" className={classes['modal-button']}>Add</button>}
                {modal.mode === 'editing' && <button type="submit" className={classes['modal-button']}>Confirm</button>}
            </div>
        </form>
    )
}

export default NoteForm;