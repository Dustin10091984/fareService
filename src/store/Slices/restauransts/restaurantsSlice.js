import { createSlice } from '@reduxjs/toolkit'
import { helperAxios } from "../../../helper/axios/index";

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: {
        list: '',
        restaurant: '',
        foods: '',
        food: '',
    },
    reducers: {
        restaurants: (state, action) => {
            return {
                ...state,
                list: action.payload
            };
        },
        restaurant: (state, action) => {
            return {
                ...state,
                restaurant: action.payload
            };
        },
        foods: (state, action) => {
            return {
                ...state,
                foods: action.payload
            }
        },
        food: (state, action) => {
            return {
                ...state,
                food: action.payload
            }
        }
    },
});
export default restaurantsSlice.reducer;

export const { restaurants, restaurant, foods, food } = restaurantsSlice.actions;

export const getRestaurants = () => async dispatch => {
    let url = `/api/restaurant/list`;
    dispatch(helperAxios("get", url, restaurants));
}

export const getRestaurant = (id) => async dispatch => {
    let url = `/api/restaurant/show/${id}`;
    dispatch(helperAxios("get", url, restaurant));
}

export const getRestaurantFoods = (id) => async dispatch => {
    let url = `/api/restaurant/food/list/${id}`;
    dispatch(helperAxios("get", url, foods));
}

export const getFood = (id) => async dispatch => {
    let url = `/api/restaurant/food/show/${id}`;
    dispatch(helperAxios("get", url, food));
}
