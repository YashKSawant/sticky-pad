const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    getTitle: () => ipcRenderer.sendSync('get-window-title'),
    minimize: () => ipcRenderer.send('minimize-window'),
    maximize: () => ipcRenderer.send('maximize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    openNewPad: () => ipcRenderer.send('open-new-pad-window', { title: 'New Pad', content: '' }),
    onInitPad: (callback) => ipcRenderer.on('init-pad', (event, padData) => callback(padData)),
    togglePin: () => {
        ipcRenderer.send('toggle-pin');
    },
    onPinStatusChange: (callback) => ipcRenderer.on('pin-state-changed', (event, isPinned) => callback(isPinned)),
    closePad: () => ipcRenderer.send('close-pad-window'),
    getWinType: (callback) => ipcRenderer.on('set-win-type', (_, type) => callback(type)), // Listen for winType
});
