const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 450,
        height: 700,
        title: "Sticky Pad",
        // frame: false,
        icon: path.join(__dirname, 'public/icon.ico'),
        webPreferences: {
            nodeIntegration: false, // Disable Node.js integration for security
            contextIsolation: true, // Enable context isolation for better security
            preload: path.join(__dirname, 'preload.js'), // Optional preload script
        },
    });

    // Remove the menu bar
    win.setMenu(null);
    // Set Icon 
    win.setIcon(path.join(__dirname, 'public/icon.ico'))

    // Load the Angular app's index.html
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) {
        win.loadURL('http://localhost:4200'); // Development server
    } else {
        win.loadFile(path.join(__dirname, 'dist/sticky-pad/browser/index.html')); // Production build
    }

    // Open DevTools only in development
    if (isDev) {
        win.webContents.openDevTools();
    }



    win.on('closed', () => {
        win = null;
    });
}

// IPC handler for safe reloads
ipcMain.on('reload-app', () => {
    if (win) {
        win.reload(); // Safely reload the current window
    }
});


ipcMain.on('get-window-title', (event) => {
    const title = win.getTitle(); // Get the title of the window
    event.returnValue = title; // Send the title back to the renderer process
});


app.disableHardwareAcceleration();

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
