import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {auth, handleUserProfile} from './firebase/utils'

//layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

//pages
import Homepage from './pages/Homepage';
import './default.scss';
import Registration from './pages/Registration';
import Login from './pages/Login';

const initialState = {
  currentUser: null
};


class App extends Component {
  constructor(props) {
    super(props) ;
    this.state = {
      ...initialState
    };
  }

  authListner = null;

  componentDidMount() {
    this.authListner = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }
      this.setState({
        ...initialState
      })
    });
  }

  componentWillUnmount() {
    this.authListner();
  }

  render() {
    const {currentUser} = this.state;
    
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomepageLayout currentUser={currentUser}>
                <Homepage></Homepage>
              </HomepageLayout>
            )}
          ></Route>
          <Route
            path="/registration"
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Registration></Registration>
              </MainLayout>
            )}
          ></Route>
          <Route
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login></Login>
                </MainLayout>
              )
            }
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
