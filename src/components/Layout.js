import React from 'react'
import PrivateMenu from './PrivateMenu';
import PublicMenu from './PublicMenu';

/* layout wrapper holding the private and the public layout, when user is logged layout changes */
export default function Layout({ children, setIsLoggedIn, isLoggedIn, setIsAdmin, isAdmin }) {
    return (

        <div>
            {
            isLoggedIn ?
                <PrivateMenu children={children} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
                :
                <PublicMenu children={children} setIsLoggedIn={setIsLoggedIn} />
            }
        </div>
    )
}
