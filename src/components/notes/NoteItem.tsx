import Note from '../../models/Note';
import ActionButton from '../../components/ui/ActionButton';
import classes from './NoteItem.module.css';
import { useDispatch } from 'react-redux';
import  { noteActions }  from '../../store/notes-slice';
import  { modalActions }  from '../../store/modal-slice';


const capitalize = (str: string) => str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
const formatCategoryName = (str: string) => capitalize(str.includes('-') ? str.replace(/-/g, ' ') : str);


const NoteItem: React.FC<{ note: Note; tableMode: string }> = (props) => {   

    const dispatch = useDispatch();
    const iconPath = require(`../../assets/images/${props.note.category}.png`);

    const deleteNoteHandler = () => {
        const origin = props.tableMode === 'active' ? 'activeNotes' : 'archivedNotes';
        dispatch(noteActions.deleteNote({id: props.note.id, origin: origin}));  
        dispatch(noteActions.getCategoryCounts());
    }

    const editNoteHandler = () => {
        dispatch(modalActions.toggleMode('editing'));  
        dispatch(modalActions.prepopulateData({id: props.note.id, name: props.note.name, content: props.note.content, category: props.note.category}));
        dispatch(modalActions.toggleVisibility());  
    }

    const archiveNoteHandler = () => {
        const destination = props.tableMode === 'active' ? 'archivedNotes' : 'activeNotes';
        dispatch(noteActions.moveTaskData({destination: destination, id: props.note.id})); 
        dispatch(noteActions.getCategoryCounts());
    }

    return (
    <li className={classes['task-wrapper']}>
        <div className={classes['task-icon']}>
            <img src={iconPath} alt="task_category" width="20" height="20"/>
        </div>
        <span className={classes['task-name']}>{capitalize(props.note.name)}</span>
        <span>{props.note.date}</span>
        <span>{formatCategoryName(props.note.category)}</span>
        <span>{capitalize(props.note.content)}</span>
        <span>{props.note.dates}</span>

        {props.tableMode === 'active' ? 
        <ActionButton mode="edit" tableMode={props.tableMode} onClick={editNoteHandler} /> : <span className={classes["edit-icon"]}></span>}
        <ActionButton mode="archive" tableMode={props.tableMode} onClick={archiveNoteHandler} /> 
        <ActionButton mode="delete" tableMode={props.tableMode} onClick={deleteNoteHandler}/>
    </li>
    )
}


export default NoteItem;