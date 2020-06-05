import React, { useEffect, useState, Fragment } from 'react';
import { getRankLogo } from '../../../utils/getRankLogo';
import classes from './SummonerCardInfo.module.css';
const { ipcRenderer } = window.require('electron');

const SummonerCardInfo = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [soloRank, setSoloRank] = useState({});
  const [flexRank, setFlexRank] = useState({});

  useEffect(() => {
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
      <div className={classes.summonerCard}>
        <img
          className={classes.summonerCardImage}
          src={`https://cdn.communitydragon.org/latest/profile-icon/${profilePicture}`}
          alt='Profile Icon'
        />
        <img
          className={classes.summonerCardImage}
          src={getRankLogo(soloRank.tier)}
          alt='Solo Rank Logo'
        />
        <img
          className={classes.summonerCardImage}
          src={getRankLogo(flexRank.tier)}
          alt='Flex Rank Solo'
        />
      </div>
    </Fragment>
  );
};

export default SummonerCardInfo;
