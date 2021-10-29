import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const requestServiceSlice = createSlice({
    name: 'requestService',
    initialState: '',
    reducers: {
        requestService: (state, action) => {
            return action.payload;
        },
        serviceRequestList: (state, action) => {
            return action.payload
        }
    },
});
export default requestServiceSlice.reducer


const { requestService, serviceRequestList } = requestServiceSlice.actions

/**
 * Create service request or get quotation
 * 
 * @param {FormData} payload 
 * @param {Boolean} formData 
 * @returns Void
 */
export const postRequestService = (payload, formData) => async dispatch => {
    let headers = null
    if(formData == true){
        headers = {
            Authorization: `${localStorage.userToken}`,
            'Content-type': 'multipart/form-data',
        }
    } else{
        headers = {
            Authorization: `${localStorage.userToken}`
        }
    }
    try {
        dispatch(requestService({error: false, loading: true}));
        await axios({
            method: 'post',
            headers: headers,
            url: `${process.env.REACT_APP_API_BASE_URL}api/user/services/service-request`,
            data: payload,
        }).then((response) => {
            const data = response.data;
            data.loading = false
            dispatch(requestService(data));
        }).catch((error) => {
            const data = error.response.data;
            data.loading = false
            dispatch(requestService(data))
        });
    } catch (error) {
        dispatch(requestService({ error: true, message: "Something went wrong!", loading: false }))
    }
};

/**
 * get service request or quotation list
 * 
 * @param {search query} payload 
 * @returns 
 */
export const getServiceRequestList = (payload) => async dispatch => {
    try {
        dispatch(serviceRequestList({list:{error: false, loading: true}}));
        await axios({
            method: 'get',
            headers:{
                Authorization: `${localStorage.userToken}`
            },
            url: `${process.env.REACT_APP_API_BASE_URL}api/user/order/list`,
            data: payload,
        }).then((response) => {
            const data = response.data;
            data.loading = false
            dispatch(requestService({list:data}));
        }).catch((error) => {
            const data = error.response.data;
            data.loading = false
            dispatch(requestService({list:data}))
        });
    } catch (error) {
        dispatch(requestService({list: { error: true, message: "Something went wrong!", loading: false }}))
    }
};

/**
 * Set initial state or requestservice
 * 
 * @returns void
 */
export const getInitialRequestService = () => async dispatch => {
    dispatch(requestService(''))
};
