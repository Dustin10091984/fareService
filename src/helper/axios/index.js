import axios from 'axios';
export const helperAxios = (method, url, reducer, token = false, data = null, formData = false, fun ) => async dispatch => {
    try {
        url = process.env.REACT_APP_API_BASE_URL+url;
        dispatch(reducer({error: false, loading: true}));
        let headers = null;
        headers = (()=>{
            if(token == true && formData == true){
                return {
                    Authorization: `${localStorage.userToken}`,
                    'Content-type': 'multipart/form-data'
                }
            }
            if(token == true && formData == false){
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
            if(fun){
                fun(data?.data?.data)
            }
            data.loading = false
            dispatch(reducer(data));
        }).catch((error) => {
            let data = error.response.data;
            data.loading = false
            dispatch(reducer(data));
        });
    } catch (error) {
        dispatch(reducer({error: true, loading: false, message: "something went wrong!"}));
    }
};
