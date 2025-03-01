const { globalShortcut, BrowserWindow } = require('electron');
const {windowRegistry } = require('./windows');

/**
 * @description This method is used to register shortcuts for Electron App
 */
function registerShortcuts() {

    // Shortcut for reload app
    globalShortcut.register('CmdOrCtrl+R', () => {
        console.log('Reloading app...');
    });

    // Shortcut for to show all pad windows
    globalShortcut.register('CmdOrCtrl+Alt+L', () => {
        console.log('Restoring pad windows...');

        BrowserWindow.getAllWindows().forEach(window => {
            if (windowRegistry.get(window.id) === 'main') { // Exclude the main window
                if (window.isMinimized()) {
                    window.restore();
                }
                window.show();
            }
        });
    });
}
module.exports = { registerShortcuts };
