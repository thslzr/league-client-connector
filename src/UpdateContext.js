import React, { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

export const UpdateContext = React.createContext();

const UpdateContextProvider = (props) => {
  const [updateState, setUpdateState] = useState({
    title: '',
    message: '',
  });

  useEffect(() => {
    ipcRenderer.on('update_available', (event, arg) => {
      setUpdateState({
        title: 'Update available',
        message: 'A new update is being downloaded',
      });
    });
    ipcRenderer.on('update_downloaded', (event, arg) => {
      setUpdateState({
        title: 'Update ready',
        message: 'Restart now to apply update',
      });
    });
  }, []);

  return (
    <UpdateContext.Provider
      value={{
        title: updateState.title,
        msg: updateState.message,
        setUpdateState,
      }}
    >
      {props.children}
    </UpdateContext.Provider>
  );
};

export default UpdateContextProvider;
