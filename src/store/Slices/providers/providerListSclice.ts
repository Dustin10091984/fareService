import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const providerSlice = createSlice({
  name: "provider",
  initialState: [] as any,
  reducers: {
    getProvider: (state, action) => {
      const {
        payload: { data, loadMore },
      } = action;
      if (loadMore) {
        return {
          ...state,
          data: [...state.data, ...data?.data],
        };
      }
      return {
        ...state,
        data,
      };
    },
    setStateProvider: (state, action) => {
      return action.payload;
    },
  },
});

export default providerSlice.reducer;

const { getProvider } = providerSlice.actions;
export const { setStateProvider } = providerSlice.actions;

export const getProviderList =
  ({ search, params, loadMore }) =>
  async (dispatch) => {
    try {
      dispatch(getProvider({ data: { error: false, loading: true } }));
      await axios({
        method: "get",
        url:
          process.env.REACT_APP_API_BASE_URL +
          `/api/user/services/provider-list${search}`,
        params,
      })
        .then((response) => {
          //handle success
          let data = response.data;
          data.loading = false;
          dispatch(getProvider({ data: response.data, loadMore }));
        })
        .catch((error) => {
          //handle error
          let data = error.response.data;
          data.loading = false;
          dispatch(getProvider({ data: error.response.data, loadMore }));
        });
    } catch (error) {
      dispatch(
        getProvider({
          data: {
            error: true,
            loading: false,
            message: "something went wrong!",
          },
          loadMore,
        })
      );
    }
  };
