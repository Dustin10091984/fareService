import axios from 'axios';
import { toast } from 'react-toastify';
export const helperAxios = (method, url, reducer, token = false, data = null, formData = false, fun, stateTypes) => async dispatch => {
    if (method && url && reducer)
        try {
            url = `${process.env.REACT_APP_API_BASE_URL}` + url;
            dispatch(reducer({ error: false, loading: true }));
            let headers = null;
            headers = (() => {
                if (token == true && formData == true) {
                    return {
                        Authorization: `${localStorage.userToken}`,
                        'Content-type': 'multipart/form-data'
                    }
                }
                if (token == true && formData == false) {
                    return {
                        Authorization: `${localStorage.userToken}`
                    }
                }
            })();
            await axios({
                method,
                headers,
                url,
                data
            }).then((response) => {
                let data = response.data;
                fun !== undefined && fun !== null && fun(data?.data?.data)
                data.loading = false
                dispatch(reducer({
                    ...data, ...stateTypes
                }));
            }).catch((error) => {
                let data = error.response.data;
                data.loading = false
                dispatch(reducer({ ...data, ...stateTypes }));
            });
        } catch (error) {
            dispatch(reducer({ error: true, loading: false, ...stateTypes, message: "something went wrong!" }));
        }
};
