import React, { useEffect, Fragment, useState } from 'react';
import './App.css';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const [summonerName, setSummonerName] = useState('');
  const [summonerIcon, setSummonerIcon] = useState('');

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
  });

  const buttonHandle = () => {
    console.log('Button Handle!');
    ipcRenderer.send('button-click', 'Button Handle Arg Electron');
  };

  return (
    <Fragment>
      <p>Test!</p>
      <p>{summonerName}</p>
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/10.11.1/img/profileicon/${summonerIcon}.png`}
        alt='summoner-icon'
      />
      <button onClick={buttonHandle}>Test Button!</button>
    </Fragment>
  );
};

export default App;
