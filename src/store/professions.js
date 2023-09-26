import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";
import isOutdated from "../utils/isOutdated";

const professionsSlice = createSlice({
  name: "professions",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    professionsRequested: (state) => {
      state.isLoading = true;
    },
    professionsReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    professionsRequestField: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsReceved, professionsRequestField } = actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities;
  if (isOutdated(lastFetch)) {
    dispatch(professionsRequested());
    try {
      const { content } = await professionService.get();
      dispatch(professionsReceved(content));
    } catch (error) {
      dispatch(professionsRequestField(error.message));
    }
  }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading;

export default professionsReducer;
