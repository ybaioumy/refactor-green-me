import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    categoryId: null,
    criteriaId: null,
};

// Redux slice
const eligibility = createSlice({
    name: 'elgibility',
    initialState,
    reducers: {
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
            // Optionally reset criteriaId if category changes
            state.criteriaId = null;
        },
        setCriteriaId: (state, action) => {
            state.criteriaId = action.payload;
        },
    },
});

// Export actions
export const { setCategoryId, setCriteriaId } = eligibility.actions;

// Export reducer to be included in the store
export default eligibility.reducer;
