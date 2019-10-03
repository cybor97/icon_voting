import React, { Component } from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import { Header } from './components/header/Header';
import { Loading } from './containers/loading/Loading';
import { Login } from './containers/login/Login';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Voting } from './containers/voting/Voting';
const { ipcRenderer } = window.require('electron');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'loading'
    };

    setTimeout(() => {
      this.setState({ screen: 'login' });
    }, 2000);

  }

  componentDidMount() {
    ipcRenderer.on('/error', (event, err) => {
      console.error(err);
      let errText = typeof (err) == 'string'
        ? err.split(/\[(.*)\]/).pop()
        : err
          ? err.message
          : JSON.stringify(err);
      NotificationManager.warning(errText);
    });
  }

  render() {
    return (
      <div className="App" >
        <Header ref="header" />
        <div className="app-content">
          {({
            'loading': <Loading />,
            'login': <Login onLoginSuccess={() => this.setState({ screen: 'voting' })} />,
            'voting': <Voting header={this.refs.header} />
          })[this.state.screen]}
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default App;
