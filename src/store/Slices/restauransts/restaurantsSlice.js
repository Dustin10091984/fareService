import { createSlice } from '@reduxjs/toolkit'
import { helperAxios } from "../../../helper/axios/index";

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: {
        list: '',
        restaurant: '',
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
    },
});
export default restaurantsSlice.reducer;

const { restaurants, restaurant, foods } = restaurantsSlice.actions;

export const getRestaurants = () => async dispatch => {
    let url = `/api/restaurant/list`;
    dispatch(helperAxios("get", url, restaurants));
}

export const getRestaurant = (id) => async dispatch => {
    let url = `/api/restaurant/show/${id}`;
    dispatch(helperAxios("get", url, restaurant));
}

export const getRestaurantFoods = (id) => async dispatch => {
    let url = `/api/restaurant/show/${id}`;
    dispatch(helperAxios("get", url, restaurant));
}
