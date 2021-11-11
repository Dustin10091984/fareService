import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const movingSlice = createSlice({
    name: 'moving',
    initialState: [],
    reducers: {
        vehicleTypes: (state, action) => {
            return action.payload;
        },
        initialvehicleTypes: (state, action) => {
            return action.payload;
        },
    },
});
export default movingSlice.reducer;

const { vehicleTypes } = movingSlice.actions;

export const getVehicleTypes = () => async dispatch => {
    try {
        dispatch(vehicleTypes({ error: false, loading: true }));
        await axios({
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `api/user/vehicle/types`,
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

export const { initialvehicleTypes } = movingSlice.actions;