import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Home from "./views/customer/Home";
import Accounts from "./views/admin/Accounts";
import Layout from './components/Layout';
import Calendar from './views/admin/Calendar';
import Profile from './views/employee/Profile';
import Groups from './views/admin/Groups';
import Login from './views/Login';
import react, { useState, useEffect } from 'react';
import Page404 from './views/errors/Page404';
import ErrorHandler from './utils/ErrorHandler'



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FC9E21',
    },
    secondary: {
      main: '#373737',
    },

  }
})


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    //should also check if token is still valid otherwise automatical log out!

    var user = JSON.parse(localStorage.getItem('user'));
    if (user != null || user != undefined) {
      var token = parseJwt(user.token);
      if (token != undefined || token != null) {
        setIsLoggedIn(true);
        if (token.actort === 'admin') {
          setIsAdmin(true);
        }
      }
    } else {
      setIsLoggedIn(false);
    }

    console.log("Layout-Mount")

  return () => {
    console.log("Un-Mount")
  }
}, [])

return (
  <ThemeProvider theme={theme}>
    <Router>

      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isAdmin={isAdmin}>
        <ErrorHandler>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login" >
              <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
            </Route>
            {
              isLoggedIn &&
              <>
                <Route exact path="/accounts">
                  <Accounts />
                </Route>
                <Route exact path="/groups" >
                  <Groups></Groups>
                </Route>
                <Route exact path="/calendar" >
                  <Calendar isLoggedIn={isLoggedIn} />
                </Route>
                <Route exact path="/profile" >
                  <Profile/>
                </Route>
              </>
            }
            <Route path="*" >
              <Page404 />
            </Route>
          </Switch>
        </ErrorHandler>
      </Layout>
    </Router>
  </ThemeProvider>
);
}

function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export default App;
