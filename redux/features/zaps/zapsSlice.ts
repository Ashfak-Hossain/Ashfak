import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ZapsState {
  zaped: boolean;
  totalZaps: number;
}

const initialState: ZapsState = {
  zaped: false,
  totalZaps: 0,
};

const zapsSlice = createSlice({
  name: 'zaps',
  initialState,
  reducers: {
    hydrateZap: (state, action: PayloadAction<ZapsState>) => {
      state.zaped = action.payload.zaped;
      state.totalZaps = action.payload.totalZaps;
    },
    toggleStoreZap: (state) => {
      state.zaped = !state.zaped;
      state.totalZaps = state.zaped ? state.totalZaps - 1 : state.totalZaps + 1;
    },
  },
});

export default zapsSlice.reducer;
export const { hydrateZap, toggleStoreZap } = zapsSlice.actions;
