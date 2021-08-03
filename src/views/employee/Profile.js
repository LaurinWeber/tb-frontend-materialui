import React from 'react'

//profile component
function Profile({ user }) {
    var user = JSON.parse(localStorage.getItem('user'))
    var data = parseJwt(user.token);
    console.log("profile");
    console.log(data);
    return (
        <div>
            Profile
        </div>
    )
}

//destrucutre token
function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export default Profile
