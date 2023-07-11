import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import pokemonService from '../../services/pokemonService';

export interface PokemonState {
  id: number | null;
  order: number | null;
  name: string | null;
  weight: number | null;
  height: number | null;
  frontImageUrl: string | null;
  backImageUrl: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

const initialState: PokemonState = {
  id: null,
  order: null,
  name: null,
  weight: null,
  height: null,
  frontImageUrl: null,
  backImageUrl: null,
  isLoading: true,
  isSuccess: false,
  isError: false,
  message: '',
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    pending: state => {
      state.isLoading = true;
    },
    fulfilled: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.id = action.payload.response_data.id;
      state.order = action.payload.response_data.order;
      state.name = action.payload.response_data.name;
      state.weight = action.payload.response_data.weight;
      state.height = action.payload.response_data.height;
      state.frontImageUrl = action.payload.response_data.sprites?.front_default;
      state.backImageUrl = action.payload.response_data.sprites?.back_default;
    },
    rejected: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const getPokemon = createAsyncThunk(
  'pokemon',
  async (url: string, thunkAPI) => {
    try {
      const response = await pokemonService.getPokemon(url);
      return {
        response_data: response,
        query: url,
      };
    } catch (error: any) {
      const message = error.response.data.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const {pending, fulfilled, rejected, reset} = pokemonSlice.actions;

export default pokemonSlice.reducer;
