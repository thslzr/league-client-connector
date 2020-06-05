import React, { useEffect, useState, Fragment } from 'react';
import SummonersCardInfo from './containers/layouts/summonerCardInfo/SummonerCardInfo';
import { getChampionId, getSkinId } from './utils/getSummonerBackground';
import classes from './App.module.css';
const { ipcRenderer } = window.require('electron');

const App = () => {
  const [championId, setChampionId] = useState('');
  const [skinId, setSkinId] = useState('');

  useEffect(() => {
    console.log('App Mounted');
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.send('restart_app');
    });
    ipcRenderer.on('summonersProfileInfo', (event, arg) => {
      setChampionId(getChampionId(arg.backgroundSkinId));
      setSkinId(getSkinId(arg.backgroundSkinId));
    });
  });
  return (
    <Fragment>
      <div
        className={classes.backgroundImage}
        style={{
          backgroundImage:
            'url(' +
            `https://cdn.communitydragon.org/latest/champion/${championId}/splash-art/centered/skin/${skinId}` +
            ')',
        }}
      />
      <SummonersCardInfo />;
    </Fragment>
  );
};

export default App;
