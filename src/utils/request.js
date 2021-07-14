import React from "react";

export default async function (url, method = 'GET', body, setApiErrorMessage, token) {

    try {
        let response = null;

        if (method === "GET") {
            response = await fetch(url, {
                method: method,
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
        }
        if (method === "DELETE") {
            response = await fetch(url, {
                method: method,
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
        }
        if (method === "POST" || method === "PUT") {
            response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body
            });
        }
        
        // can not get custom error messages from backend?? working in Postman.. guess CROS is the problem
        if (!response.ok) {
            throw Error(response.status);
        } else {

            let data = await response.json()
            return data;
        }
     

    } catch (e) {
        if (setApiErrorMessage != null) {
            //generic error
            setApiErrorMessage(e.message);

            if(e.message === 404){
                setApiErrorMessage("404: Ressource(s) not found")
            }
            else if(e.message === 403){
                setApiErrorMessage("403: You are not authorized to access the requested ressource(s)")
            }
            else if(e.message === 401){
                setApiErrorMessage("401: You are not authorized to access the requested ressource(s)")
            }
        }
        console.error(e);
        return null;
    }
}


