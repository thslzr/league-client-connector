import React, { useEffect, Fragment, useState } from 'react';
import './App.css';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const [summonerName, setSummonerName] = useState('');
  const [summonerIcon, setSummonerIcon] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    console.log('App Mounted');
    ipcRenderer.on('Electron-finished-loading', (event, arg) => {
      console.log(arg);
    });
    ipcRenderer.on('summoner-data', (event, arg) => {
      console.log(arg);
      setSummonerName(arg.displayName);
      setSummonerIcon(arg.profileIconId);
    });
    ipcRenderer.on('update_available', () => {
      console.log('Update available');
      setUpdateMessage('Downloading update...');
    });
    ipcRenderer.on('update_downloaded', () => {
      console.log('Update downloaded');
      ipcRenderer.send('restart_app');
    });
  }, []);

  const buttonHandle = () => {
    console.log('Button Handle!');
    ipcRenderer.send('button-click', 'Button Handle Arg Electron');
  };

  return (
    <Fragment>
      <p>Test! v1.0.3</p>
      <p>{summonerName}</p>
      <img
        src={`https://cdn.communitydragon.org/10.11.1/profile-icon/${summonerIcon}`}
        alt='summoner-icon'
      />
      <button onClick={buttonHandle}>Test Button!</button>
      <p>{updateMessage}</p>
    </Fragment>
  );
};

export default App;
