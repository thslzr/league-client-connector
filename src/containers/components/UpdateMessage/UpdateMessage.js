import React, { useContext } from 'react';
import classes from './UpdateMessage.module.css';
import { UpdateContext } from '../../../UpdateContext';
const { ipcRenderer } = window.require('electron');

const UpdateMessage = () => {
  const { title, msg, setUpdateState } = useContext(UpdateContext);

  const closeMessage = () => {
    setUpdateState('');
  };

  const installUpdate = () => {
    ipcRenderer.send('restart_app');
  };

  const updateAvailable = (
    <div className={classes.messageContainer}>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.updateMessage}>{msg}</p>
    </div>
  );

  const updateDownloaded = (
    <div className={classes.messageContainerRestart}>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.updateMessage}>{msg}</p>
      <div className={classes.buttonContainer}>
        <button className={classes.button} onClick={closeMessage}>
          Close
        </button>
        <button className={classes.button} onClick={installUpdate}>
          Restart
        </button>
      </div>
    </div>
  );

  return title === 'Update available'
    ? updateAvailable
    : title === 'Update ready'
    ? updateDownloaded
    : '';
};

export default UpdateMessage;
