import Note from '../../models/Note';
import NoteItem from '../notes/NoteItem';
import SummaryItem from '../summary/SummaryItem';
import classes from './Table.module.css';
import { useSelector } from 'react-redux';
import  { RootState }  from '../../store/index';

const Table: React.FC<{ tableMode: string }> = (props) => {

    const notes = useSelector((state: RootState) => state.notes);
    const archiveIconPath = require(`../../assets/images/archive.png`);
    const deleteIconPath = require(`../../assets/images/delete.png`);
    const nameHeader = props.tableMode === 'active' ? 'Name' : 'Archived Name';

    return (
        <section>
            {props.tableMode !== 'summary' && <div className={classes['tasks-header']}>
                <span className={classes["icon-header"]}></span>
                <span>{nameHeader}</span>
                <span>Created</span>
                <span>Category</span>
                <span>Content</span>
                <span>Dates</span>
                <span className={classes["edit-header"]}></span>
                <img src={archiveIconPath} alt="archive" width="20" height="20"/>
                <img src={deleteIconPath} alt="delete"  width="20" height="20" />
            </div>}

            {props.tableMode == 'summary' && <div className={classes['summary-header']}>
                <span className={classes["icon-header"]}></span>
                <span>Note Category</span>
                <span>Active</span>
                <span>Archived</span>
            </div>}

            {props.tableMode === 'active' && <ul className={classes['notes-list']}>
                {notes.activeNotes.map((note: Note) => (
                    <NoteItem key={note.id} note={note} tableMode={props.tableMode}/>
                ))}
            </ul>}

            {props.tableMode === 'archive' &&<ul className={classes['notes-list']}>
                {notes.archivedNotes.map((note: Note) => (
                    <NoteItem key={note.id} note={note} tableMode={props.tableMode}/>
                ))}
            </ul>}

            {props.tableMode === 'summary' && ( <ul className={classes['notes-list']}>
                {Object.keys(notes.categoryCounts).map((category: string) => (
                    <SummaryItem key={category} category={category} counts={notes.categoryCounts[category]}/>
                ))}
            </ul>)}
        </section>
    )
}

export default Table;