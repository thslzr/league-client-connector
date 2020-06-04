import React, { useEffect, useState, Fragment } from 'react';
import { getChampionId, getSkinId } from './utils/getSummonerBackground';
import { getRankLogo } from './utils/getRankLogo';
import classes from './App.module.css';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const [championId, setChampionId] = useState('');
  const [skinId, setSkinId] = useState('');
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    console.log('App Mounted');
    ipcRenderer.on('update_downloaded', () => {
      console.log('Update downloaded');
      ipcRenderer.send('restart_app');
    });
    ipcRenderer.on('summonersProfileInfo', (event, arg) => {
      console.log(arg);
      setChampionId(getChampionId(arg.backgroundSkinId));
      setSkinId(getSkinId(arg.backgroundSkinId));
    });
    ipcRenderer.on('summonerLogin', (event, arg) => {
      console.log(arg.profileIconId);
      setProfilePicture(arg.profileIconId);
    });
  }, []);

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
      ></div>
      <div className={classes.summonerCard}>
        <img
          className={classes.summonerCardImage}
          src={`https://cdn.communitydragon.org/latest/profile-icon/${profilePicture}`}
        />
        <img className={classes.summonerCardImage} src={getRankLogo()} />
        <img className={classes.summonerCardImage} src={getRankLogo()} />
      </div>
    </Fragment>
  );
};

export default App;
