import {
  createReducer,
  createSlice,
  SliceCaseReducers,
} from "@reduxjs/toolkit";
import axios from "axios";
import { helperAxios } from "./../../../helper/axios";
export interface IPaymentSliceState {
  list: {
    data: {
      data: IPaymentCard[];
    };
  };
  addCard: any;
  removeCard: any;
  payment: any;
}
const paymentSlice = createSlice<
  IPaymentSliceState,
  SliceCaseReducers<IPaymentSliceState>
>({
  name: "payment",
  initialState: {
    list: {
      data: {
        data: [],
      },
    },
    addCard: "",
    removeCard: "",
    payment: "",
  },
  reducers: {
    payment: (state, action) => {
      return {
        ...state,
        payment: action.payload,
      };
    },
    list: (state, action) => {
      return {
        ...state,
        list:
          action.payload.error == true
            ? {
                error: false,
                data: {
                  object: "list",
                  data: [],
                  has_more: false,
                  url: "",
                },
                message: "ok",
              }
            : action.payload,
      };
    },
    addCard: (state, action) => {
      if (action.payload.data && action.payload.error === false) {
        return {
          ...state,
          list: {
            ...state?.list,
            data: {
              ...state?.list?.data,
              data: [action.payload?.data, ...state?.list?.data?.data],
            },
          },
          addCard: action.payload,
        };
      }
      return {
        ...state,
        addCard: action.payload,
      };
    },
    removeCard: (state, action) => {
      if (action.payload.data && action.payload.error === false) {
        return {
          ...state,
          list: {
            ...state.list,
            data: {
              ...state.list.data,
              data: state.list.data.data.filter(
                (item) => item.id !== action.payload?.data
              ),
            },
          },
          removeCard: action.payload,
        };
      }
      return {
        ...state,
        removeCard: action.payload,
      };
    },
    paymentInitialState: (state, action) => {
      return {
        ...state,
        [action.payload]: "",
      };
    },
  },
});
export default paymentSlice.reducer;

export const { paymentInitialState } = paymentSlice.actions;
const { list, removeCard, addCard, payment } = paymentSlice.actions;

export const pay = (data) => async (dispatch) => {
  // const url = `/api/user/transaction/payable-amount`;
  // dispatch(helperAxios("post", url, payment, true, data));
  try {
    dispatch(payment({ error: false, loading: true }));
    await axios({
      method: "post",
      headers: {
        Authorization: `${localStorage.userToken}`,
      },
      url:
        process.env.REACT_APP_API_BASE_URL +
        `/api/user/transaction/payable-amount`,
      data: data,
    })
      .then((response) => {
        let data = response.data;
        data.loading = false;
        dispatch(payment(data));
      })
      .catch((error) => {
        let data = error.response.data;
        data.loading = false;
        dispatch(payment(data));
      });
  } catch (error) {
    dispatch(
      payment({ error: true, loading: false, message: "something went wrong!" })
    );
  }
};

export const addPaymentCard = (data) => async (dispatch) => {
  const url = `/api/user/card/store`;
  dispatch(helperAxios("post", url, addCard, true, data));
};

export const getPaymentCards = () => async (dispatch) => {
  const url = `/api/user/card`;
  dispatch(helperAxios("get", url, list, true));
};

export const deleteCard = (id) => async (dispatch) => {
  const url = `/api/user/card/delete/${id}`;
  dispatch(helperAxios("delete", url, removeCard, true));
};
