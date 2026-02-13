import { createSlice } from '@reduxjs/toolkit';

const subSlice = createSlice({
  name: 'Subs',
  initialState: {
    clients: [], // Your client list
    abonnements: [], // Your subscription list
    services: [], // Your available services (MMA, Boxe, etc.)
  },
  reducers: {
    // 1. ADD: Create a new subscription
    addSubscription: (state, action) => {
      state.abonnements.push(action.payload);
    },
    // 2. DELETE: Remove a subscription by ID
    deleteSubscription: (state, action) => {
      state.abonnements = state.abonnements.filter(sub => sub.id !== action.payload);
    },
    // 3. MODIFY: Update an existing subscription
    updateSubscription: (state, action) => {
      const index = state.abonnements.findIndex(sub => sub.id === action.payload.id);
      if (index !== -1) {
        state.abonnements[index] = { ...state.abonnements[index], ...action.payload };
      }
    }
  }
});

export const { addSubscription, deleteSubscription, updateSubscription } = subSlice.actions;
export default subSlice.reducer;