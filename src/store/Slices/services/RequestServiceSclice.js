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
        },
        serviceRequestListUpdate: (state, action) => {
            if(state?.list?.data?.data){
                return {
                    ...state, list: {
                        ...state?.list, data: {
                            ...state?.list?.data, data: [
                                ...state?.list?.data?.data?.map(item => {
                                    if(item?.id == action?.payload.id){
                                        return action?.payload;
                                    }
                                    return item;
                                })
                            ]
                        }
                    }
                }
            }
        },
        serviceRequestDetail: (state, action) => {
            return {
                ...state,
                serviceRequestDetail: action.payload
            }
        },
        serviceRequestDetailUpdate: (state, action) => {
            return {
                ...state,
                serviceRequestDetail: {
                    ...state?.serviceRequestDetail, data: action.payload
                }
            }
        }
    },
});
export default requestServiceSlice.reducer


const { requestService, serviceRequestList, serviceRequestDetail } = requestServiceSlice.actions
export const { serviceRequestListUpdate, serviceRequestDetailUpdate } = requestServiceSlice.actions

export const handleServiceRequestNotification = (id) => async (dispatch) => {
    try {
        await axios({
            method: 'get',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: `${process.env.REACT_APP_API_BASE_URL}/api/user/order/service-request/${id}`,
        }).then((response) => {
            const data = response?.data?.data;
            dispatch(serviceRequestDetailUpdate(data));
            dispatch(serviceRequestListUpdate(data));
        }).catch((error) => {
        });
    } catch (error) {
        
    }
}

const request = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 30 * 1000,
});

/**
 * Create service request or get quotation
 * 
 * @param {FormData} payload 
 * @param {Boolean} formData 
 * @returns Void
 */
export const postRequestService = (payload, formData) => async dispatch => {
    let headers = null
    if (formData == true) {
        headers = {
            Authorization: `${localStorage.userToken}`,
            'Content-type': 'multipart/form-data',
        }
    } else {
        headers = {
            Authorization: `${localStorage.userToken}`
        }
    }
    try {
        dispatch(requestService({ error: false, loading: true }));
        await axios({
            method: 'post',
            headers: headers,
            url: `${process.env.REACT_APP_API_BASE_URL}/api/user/services/service-request`,
            data: payload,
        }).then((response) => {
            const data = response.data;
            data.loading = false
            dispatch(requestService(data));
            // dispatch(serviceRequestList(data?.data));
        }).catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.href = "/";
            }
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
export const getServiceRequestList = ({ params }) => async dispatch => {
    try {
        dispatch(serviceRequestList({ list: { error: false, loading: true } }));
        await axios({
            method: 'get',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: `${process.env.REACT_APP_API_BASE_URL}/api/user/order/list?${params || ''}`,
        }).then((response) => {
            const data = response.data;
            data.loading = false
            dispatch(requestService({ list: data }));
        }).catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.href = "/";
            }
            const data = error.response.data;
            data.loading = false
            dispatch(requestService({ list: data }))
        });
    } catch (error) {
        dispatch(requestService({ list: { error: true, message: "Something went wrong!", loading: false } }));
    }
};

/**
 * get service request
 * @param {id} id
 * @returns
 */
export const getServiceRequest = (id) => async dispatch => {
    try {
        dispatch(serviceRequestDetail({ error: false, loading: true }));
        await axios({
            method: 'get',
            headers: {
                Authorization: `${localStorage.userToken}`
            },
            url: `${process.env.REACT_APP_API_BASE_URL}/api/user/order/service-request/${id}`,
        }).then((response) => {
            const data = response.data;
            data.loading = false
            dispatch(serviceRequestDetail(data));
        }).catch((error) => {
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.href = "/";
            }
            const data = error.response.data;
            data.loading = false
            dispatch(serviceRequestDetail(data))
        });
    } catch (error) {
        dispatch(serviceRequestDetail({ error: true, message: "Something went wrong!", loading: false }));
    }
}

/**
 * Set initial state or requestservice
 * 
 * @returns void
 */
export const getInitialRequestService = () => async dispatch => {
    dispatch(requestService(''))
};
