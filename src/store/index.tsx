import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from './notes-slice';
import { modalReducer } from './modal-slice';


const store = configureStore({
    reducer: { notes: notesReducer, modal: modalReducer }
});

export type RootState = ReturnType<typeof store.getState>
export default store;

