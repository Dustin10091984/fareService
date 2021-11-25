import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const restautrantsSlice = createSlice({
    name: 'restaurants',
    initialState: {
        list: '',
        restautrant: '',
    },  
    reducers: {
        restautrants: (state, action) => {
            return { 
                ...state,
                list: action.payload 
            };
        },
        restautrant: (state, action) => {
            return { 
                ...state,
                restaurant: action.payload 
            };
        },
        // initialvehicleTypes: (state, action) => {
        //     return action.payload;
        // },
    },
});
export default restautrantsSlice.reducer;

const { restautrants, restautrant } = restautrantsSlice.actions;

export const getRestaurants = () => async dispatch => {
    try {
        dispatch(restautrants({ error: false, loading: true }));
        await axios({
            method: 'get',
            headers: { Authorization: `${localStorage.userToken}` },
            url: process.env.REACT_APP_API_BASE_URL + `api/restaurant/restaurants`,
        }).then((response) => {
            let data = response.data;
            data.loading = false
            console.log("success", data);
            dispatch(restautrants(data));
        }).catch((error) => {
            let data = error.response.data;
            data.loading = false
            console.log("error", data);
            dispatch(restautrants(data));
        });
    } catch (error) {
        dispatch(restautrants({ error: true, loading: false, message: "something went wrong!" }));
    }
}

export const getRestaurant = (id) => async dispatch => {
    try {
        dispatch(restautrant({ error: false, loading: true }));
        await axios({
            method: 'get',
            headers: { Authorization: `${localStorage.userToken}` },
            url: process.env.REACT_APP_API_BASE_URL + `api/restaurant/show/${id}`,
        }).then((response) => {
            let data = response.data;
            data.loading = false
            console.log("success", data);
            dispatch(restautrant(data));
        }).catch((error) => {
            let data = error.response.data;
            data.loading = false
            console.log("error", data);
            dispatch(restautrant(data));
        });
    } catch (error) {
        dispatch(restautrant({ error: true, loading: false, message: "something went wrong!" }));
    }
}
