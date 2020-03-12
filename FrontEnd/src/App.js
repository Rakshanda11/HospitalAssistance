import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route} from 'react-router-dom';
import AuthPage from './pages/auth';
import Reception from './pages/reception';
import Doctor from './pages/doctor';
import MainNavigation from './components/Navigation/mainNavigation';
import Lab from './pages/Lab';
class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <React.Fragment>
      <MainNavigation/>
      <main className="main_content">
        <Route path="/auth" component={AuthPage}/>
        <Route path="/reception" component={Reception}/>
        <Route path="/doctor" component={Doctor}/>
        <Route path="/lab" component={Lab}/>
        </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default App;
