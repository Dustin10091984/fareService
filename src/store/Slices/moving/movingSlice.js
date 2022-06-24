import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { findIndex } from 'lodash';

const movingSlice = createSlice({
    name: 'moving',
    initialState: [],
    reducers: {
        vehicleTypes: (state, action) => {
            return { list: action.payload };
        },
        addVehicle: (state, action) => {
            return {
                ...state,
                list: {
                    ...state?.list,
                    data: [...state?.list?.data, action.payload]
                }
            }
        },
        updateVehicle: (state, action) => {
            console.log(action);
            return {
                ...state,
                list: {
                    ...state.list,
                    data: [
                        ...state.list.data.map(vehicleType => {
                            console.log(vehicleType.id == action.payload.id, vehicleType, action.payload);
                            if (vehicleType.id == action.payload.id) {
                                return action.payload;
                            }
                            return vehicleType;
                        })
                    ]
                }
            }
        },
        removeVehicle: (state, action) => {
            return {
                ...state,
                list: {
                    ...state.list,
                    data: [
                        ...state?.list.data.filter(vehicleType => vehicleType.id != action.payload)
                    ]
                }
            }
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

const { vehicleTypes, addVehicle, updateVehicle, removeVehicle } = movingSlice.actions;

export const { movingRequest } = movingSlice.actions;

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
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.href = "/";
            }
            let data = error.response.data;
            data.loading = false
            dispatch(movingRequest(data));
        });
    } catch (error) {
        dispatch(vehicleTypes({ error: true, loading: false, message: "something went wrong!" }));
    }
}

export const vehicleListUpdate = ({ type, vehicleType }) => dispatch => {
    try {
        if (type == 'new') {
            console.log(type, vehicleType);
            dispatch(addVehicle(vehicleType));
        } else if (type == 'update') {
            console.log(type, vehicleType);
            dispatch(updateVehicle(vehicleType));
        } else if (type == 'delete') {
            console.log(type, vehicleType);
            dispatch(removeVehicle(vehicleType));
        }
    } catch (error) {
    }
}

export const { initialvehicleTypes } = movingSlice.actions;