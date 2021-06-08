import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Home from "./views/customer/Home";
import Accounts from "./views/admin/Accounts";
import AccountDetails from "./views/admin/AccountDetails";
import Layout from './components/Layout';


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
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Accounts />
            </Route>
            <Route path="/accounts" component={AccountDetails} />
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
