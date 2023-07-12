import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import pokemonService from '../../services/pokemonService';
import {StyleSheet} from "react-native";

export interface HomeState {
  pokemonItems: {
    count: number;
    next: string;
    previous: string;
    items: Array<any>;
  };
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: HomeState = {
  pokemonItems: {
    count: 999,
    next: '',
    previous: '',
    items: [],
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    pending: state => {
      state.isLoading = true;
    },
    fulfilled: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.pokemonItems.items.push(...action.payload.response_data.results);
      state.pokemonItems.count = parseInt(
        action.payload.response_data.count,
        10,
      );
      state.pokemonItems.next = action.payload.response_data.next;
      state.pokemonItems.previous = action.payload.response_data.previous;
      state.isError = false;
    },
    rejected: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});

export const getPokemons = createAsyncThunk('home', async (data, thunkAPI) => {
  try {
    const response = await pokemonService.getPokemons(data);
    return {
      response_data: response,
      query: data,
    };
  } catch (error: any) {
    const message = error.response.data.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const {pending, fulfilled, rejected} = homeSlice.actions;

export default homeSlice.reducer;
