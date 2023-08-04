import Note from '../models/Note';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface NotesState {
    activeNotes: Note[];
    archivedNotes: Note[];
    categoryCounts: {[key: string]: {[key: string]: number}}
  }

const initialNotesState: NotesState = { 
    activeNotes: [
        {
            "id": "lkob0fjh",
            "name": "Shopping List",
            "content": "Tomatoes",
            "date": "29/7/2023",
            "category": "task",
            "dates": ""
        },
        {
            "id": "lkob1egs",
            "name": "The Theory Of Evolution",
            "content": "The Modern Evolutionary Synthesis Defines Evolution As The Change Over Time In This Genetic Variation",
            "date": "29/7/2023",
            "category": "random-thought",
            "dates": ""
        },
        {
            "id": "lkob24w4",
            "name": "New Feature",
            "content": "Implement New Feature For The App",
            "date": "29/7/2023",
            "category": "idea",
            "dates": ""
        },
        {
            "id": "lkob2to4",
            "name": "William Gaddis",
            "content": "Power Does Not Corrupt, People Corrupt Power",
            "date": "29/7/2023",
            "category": "quote",
            "dates": ""
        },
        {
            "id": "lkob3cng",
            "name": "Books",
            "content": "The Lean Startup",
            "date": "29/7/2023",
            "category": "task",
            "dates": ""
        },
        {
            "id": "lkob5j70",
            "name": "Oscar Wilde",
            "content": "Life Is Never Fair, And Perhaps It Is A Good Thing For Most Of Us That It Is Not",
            "date": "29/7/2023",
            "category": "quote",
            "dates": ""
        },
        {
            "id": "lkob6ef8",
            "name": "Dentist",
            "content": "I’m Gonna Have A Dentist Appointment On The 4/4/2021, I Moved It From 5/5/2021",
            "date": "29/7/2023",
            "category": "task",
            "dates": "4/4/2021, 5/5/2021"
        }],
    archivedNotes: [],
    categoryCounts: {}
}

const notesSlice = createSlice({
    name: 'notes',
    initialState: initialNotesState,
    reducers: {
        addNote (state, action: PayloadAction<Note>) {
            state.activeNotes.push(action.payload);
        },
        deleteNote (state, action: PayloadAction<{ id: string, origin: string }>) {  
            if (action.payload.origin === 'activeNotes') {
                state.activeNotes = state.activeNotes.filter(note => note.id !== action.payload.id);
            } else if (action.payload.origin === 'archivedNotes') {    
                state.archivedNotes = state.archivedNotes.filter(note => note.id !== action.payload.id);
            }
        },
        editNote (state, action: PayloadAction<{ id: string, updatedValues: {name: string, content: string, category: string, dates: string} }>) {
            const noteToUpdateIndex = state.activeNotes.findIndex((note) => note.id === action.payload.id);
            state.activeNotes[noteToUpdateIndex] = { ...state.activeNotes[noteToUpdateIndex], ...action.payload.updatedValues };
        },
        moveTaskData(state, action: PayloadAction<{destination: 'activeNotes' | 'archivedNotes', id: string }>) {
            const origin = action.payload.destination === 'archivedNotes' ? state.activeNotes : state.archivedNotes;
            const sourceIndex = origin.findIndex(obj => obj.id === action.payload.id);
            if (sourceIndex !== -1) {
                const transferredObject = origin.splice(sourceIndex, 1)[0];
                state[action.payload.destination].push(transferredObject);
            }
        },
        getCategoryCounts ( state ) {
            state.categoryCounts= {};

            state.activeNotes.forEach((note) => {
              const category = note.category;
              state.categoryCounts[category] = (state.categoryCounts[category] || { active: 0, archived: 0 });
              state.categoryCounts[category].active++;
            });
          
            state.archivedNotes.forEach((note) => {
              const category = note.category;
              state.categoryCounts[category] = (state.categoryCounts[category] || { active: 0, archived: 0 });
              state.categoryCounts[category].archived++;
            });
        }
    }
})

export const noteActions = notesSlice.actions;
export const notesReducer = notesSlice.reducer;