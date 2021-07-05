import React from "react";

export default async function (url, method = 'GET', body) {

    try {
        let response = null;

        if(method === "GET"){
            response = await fetch(url, {
                method: method,
                headers: {
                    Accept: "application/json"
                },
            });
        }
        if(method === "POST" || method === "PUT"){
            response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': "application/json",
                },
                body
            });
        }
        let data = await response.json();
        return data;
    } catch (e) {
        console.error(e);
    }
}