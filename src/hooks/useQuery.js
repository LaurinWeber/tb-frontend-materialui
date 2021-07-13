import React from 'react'
import { useHistory, useState, useEffect } from 'react-router-dom';
import { useErrorStatus } from './ErrorHandler';

/* Source: following concept of centralized API error handling
https://itnext.io/centralizing-api-error-handling-in-react-apps-810b2be1d39d

*/
const useQuery = ({ url, method = "GET", body = null }) => {
    const { setErrorStatusCode } = useErrorStatus();
    const [apiData, setApiData] = useState();

    useEffect(() => {
        fetch(url, {
            method: method,
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json",
            },
            body
        })
            .then(data => data.json())
            .then(({ code, status, ...apiData }) => {
                if (code > 400) {
                    setErrorStatusCode(400)
                } else {
                    setApiData(apiData);
                }
            });
    }, [url]);

    return apiData
}

export default useQuery;
