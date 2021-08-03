import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Home from "./views/customer/Home";
import Accounts from "./views/admin/Accounts";
import Layout from './components/Layout';
import Calendar from './views/admin/Calendar';
import Profile from './views/employee/Profile';
import Groups from './views/admin/Groups';
import Login from './views/Login';
import { useState, useEffect } from 'react';
import Page404 from './views/errors/Page404';
import Booking from './views/customer/Booking';
import Payment from './views/customer/Payment'
import ProtectedRoute from './components/ProtectedRoute';



//define theme of the app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#373737',
    },
    secondary: {
      main: '#FC9E21',
    },
  }
})

const OFFERREQUEST = {
  isCertified: true,
  Activity: "",
  Type: "",
  Hours: 0,
  Level: "",
  Language: "",
  Gender: "",
}
const CARTITEM = {
  Title: "",
  Level: "",
  Language: "",
  Location:"",
  Participants: [],
  Selection: [],
  TotalHours:0.0,
  TotalPrice:0.0,
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [offerRequest, setOfferRequest] = useState(OFFERREQUEST);
  const [cart, setCart] = useState(CARTITEM);

  //check if the user is still logged in => adapt the layout
  useEffect(() => {
    //should also check if token is still valid otherwise automatical log out! (REFRESH TOKEN..)

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
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Router>

        <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} isAdmin={isAdmin} cart={cart} setCart={setCart} >
            <Switch>
              <Route exact path="/">
                <Home setOfferRequest={setOfferRequest}/>
              </Route>
              <Route exact path="/booking">
                <Booking setOfferRequest={setOfferRequest} offerRequest={offerRequest} cart={cart} setCart={setCart}/>
              </Route>
              <Route exact path="/payment">
                <Payment cart={cart} setCart={setCart}/>
              </Route>
              <Route exact path="/login" >
                <Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />
              </Route>
              <ProtectedRoute exact path="/accounts" component={Accounts}/>
              <ProtectedRoute exact path="/groups" component={Groups}/>
              <ProtectedRoute exact path="/calendar" component={Calendar}/>
              <ProtectedRoute exact path="/profile" component={Profile}/>
              <Route path="*" >
                <Page404 />
              </Route>
            </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

//destrucutre the token
function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export default App;
