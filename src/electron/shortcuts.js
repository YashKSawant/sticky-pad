const { globalShortcut } = require('electron');

function registerShortcuts() {
    globalShortcut.register('CmdOrCtrl+R', () => {
        console.log('Reloading app...');
    });
}

module.exports = { registerShortcuts };
