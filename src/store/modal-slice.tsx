import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
    isVisible: boolean;
    mode: string;
    populatedData: {
        id: string;
        name: string;
        content: string;
        category: string;
    };
}

const initialModalState: ModalState = {
    isVisible: false,
    mode: 'adding',
    populatedData: {
        id: '',
        name: '',
        content: '',
        category: 'task',
    },
}

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialModalState,
    reducers: {
        toggleVisibility (state) {
            state.isVisible = !state.isVisible;
        },
        toggleMode (state, action: PayloadAction<string>) {
            state.mode = action.payload;
        },
        prepopulateData ( state, action: PayloadAction<{id: string, name: string, content: string, category: string}>) {
            state.populatedData = action.payload;
        }
    }
})


export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;