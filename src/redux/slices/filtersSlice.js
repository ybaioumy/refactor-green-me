import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryId: 0,
    economicSectorId: 0,
    servedCountryId: 0,
    projectStatusId: 0,
    expertiseId: 0,
    countryId: 0,
    pageNumber: 1,
    pageSize: 5,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearchObject: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
        setPageNumber: (state, action) => {
            state.pageNumber = action.payload;
        },
        setPageSize: (state, action) => {
            state.pageSize = action.payload;
            state.pageNumber = 1; // Reset to first page when page size changes
        },
        resetSearchObject: (state) => {
            return {
                ...state,
                categoryId: 0,
                economicSectorId: 0,
                servedCountryId: 0,
                projectStatusId: 0,
                expertiseId: 0,
                countryId: 0,
            };
        },
        resetByKey: (state, action) => {
            const key = action.payload;
            if (key in state) {
                state[key] = initialState[key]; // Reset the specific key to its initial value
            }
        },
    },
});

export const { updateSearchObject, resetSearchObject, setPageNumber, setPageSize, resetByKey } = searchSlice.actions;
export default searchSlice.reducer;
