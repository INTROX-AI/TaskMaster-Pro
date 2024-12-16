const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = !app.isPackaged;

// Set custom user data directory
app.setPath('userData', path.join(app.getPath('appData'), 'TaskMasterPro'));

async function createWindow() {
  const iconPath = path.join(__dirname, '../public/logo.ico');

  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    frame: true,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableWebSQL: false,
      spellcheck: false,
      webSecurity: false,
      webAudio: true,
      allowRunningInsecureContent: true
    }
  });

  if (process.platform === 'win32') {
    app.setAppUserModelId('com.taskmaster.pro');
    mainWindow.setIcon(iconPath);
  }

  if (isDev) {
    try {
      await mainWindow.loadURL('http://localhost:5173');
      mainWindow.webContents.openDevTools();
    } catch (err) {
      console.error('Failed to load URL:', err);
    }
  } else {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    mainWindow.loadFile(indexPath);
  }

  // Set taskbar icon explicitly
  mainWindow.setIcon(path.join(__dirname, '../public/logo.ico'));
}

app.whenReady().then(createWindow);

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