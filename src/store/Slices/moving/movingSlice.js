import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const movingSlice = createSlice({
    name: 'moving',
    initialState: [],
    reducers: {
        vehicleTypes: (state, action) => {
            return { list: action.payload };
        },
        movingRequest: (state, action) => {
            return { movingRequest: action.payload };
        },
        initialvehicleTypes: (state, action) => {
            return action.payload;
        },
    },
});
export default movingSlice.reducer;

const { vehicleTypes, movingRequest } = movingSlice.actions;

const { movingRequest } = movingSlice.actions;

export const getVehicleTypes = () => async dispatch => {
    try {
        dispatch(vehicleTypes({ error: false, loading: true }));
        await axios({
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/vehicle/types`,
        }).then((response) => {
            let data = response.data;
            data.loading = false
            dispatch(vehicleTypes(data));
        }).catch((error) => {
            let data = error.response.data;
            data.loading = false
            dispatch(vehicleTypes(data));
        });
    } catch (error) {
        dispatch(vehicleTypes({ error: true, loading: false, message: "something went wrong!" }));
    }
}

export const makeMovingRequest = (data) => async dispatch => {
    try {
        dispatch(movingRequest({ error: false, loading: true }));
        await axios({
            method: 'post',
            headers: { Authorization: `${localStorage.userToken}` },
            url: process.env.REACT_APP_API_BASE_URL + `/api/user/order/move-request`,
            data: data
        }).then((response) => {
            let data = response.data;
            data.loading = false
            dispatch(movingRequest(data));
        }).catch((error) => {
            let data = error.response.data;
            data.loading = false
            dispatch(movingRequest(data));
        });
    } catch (error) {
        dispatch(vehicleTypes({ error: true, loading: false, message: "something went wrong!" }));
    }
}

export const { initialvehicleTypes } = movingSlice.actions;