import React, { useEffect, useState, Fragment } from 'react';
import { getChampionId, getSkinId } from './utils/getSummonerBackground';
import { getRankLogo } from './utils/getRankLogo';
import classes from './App.module.css';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const [championId, setChampionId] = useState('');
  const [skinId, setSkinId] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [soloRank, setSoloRank] = useState({});
  const [flexRank, setFlexRank] = useState({});

  useEffect(() => {
    console.log('App Mounted');
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.send('restart_app');
    });
    ipcRenderer.on('summonersProfileInfo', (event, arg) => {
      setChampionId(getChampionId(arg.backgroundSkinId));
      setSkinId(getSkinId(arg.backgroundSkinId));
    });
    ipcRenderer.on('summonerLogin', (event, arg) => {
      setProfilePicture(arg.profileIconId);
    });
    ipcRenderer.on('summonerRankInfo', (event, arg) => {
      setSoloRank(arg.queueMap.RANKED_SOLO_5x5);
      setFlexRank(arg.queueMap.RANKED_FLEX_SR);
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
        <img
          className={classes.summonerCardImage}
          src={getRankLogo(soloRank.tier)}
        />
        <img
          className={classes.summonerCardImage}
          src={getRankLogo(flexRank.tier)}
        />
      </div>
    </Fragment>
  );
};

export default App;
