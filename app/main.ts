import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

const url = require('url');
const Store = require('electron-store');
const store = new Store();
const directoryPath = store.get('path');

ipcMain.handle('getImage', async (event, someArgument) => {
  try {
    let buffer: Buffer;
    if (fs.existsSync(`${directoryPath}/${someArgument}/thumbnail.png`)) {
      console.warn(someArgument, 'thumbnail.png');
      return fs
        .readFileSync(`${directoryPath}/${someArgument}/thumbnail.png`)
        .toString('base64');
    } else if (
      fs.existsSync(`${directoryPath}/${someArgument}/thumbnail.jpg`)
    ) {
      console.warn(someArgument, 'thumbnail.jpg');
      return fs
        .readFileSync(`${directoryPath}/${someArgument}/thumbnail.jpg`)
        .toString('base64');
    }
  } catch (err) {
    console.error(err);
  }
});

ipcMain.handle('getDescription', async (event, someArgument) => {
  const buffer = fs.readFileSync(
    `${directoryPath}/${someArgument}/description.txt`
  );
  const content = buffer.toString('utf8');
  return content;
});

ipcMain.handle('getShortDescription', async (event, someArgument) => {
  const buffer = fs.readFileSync(
    `${directoryPath}/${someArgument}/shortDescription.txt`
  );
  const content = buffer.toString('utf8');
  return content;
});

ipcMain.handle('readdir', async (event, someArgument) => {
  const buffer = fs.readdirSync(directoryPath);
  const toReturn: string[] = [];
  buffer.forEach((file) => {
    toReturn.push(file);
  });
  return toReturn;
});

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false,
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools();
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  win.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
    // the height, width, and x and y coordinates.
    let { width, height } = win!.getBounds();
    // Now that we have them, save them using the `set` method.
    store.set('windowBounds', { width, height });
  });

  win.setMenu(null);
  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () =>
    setTimeout(() => {
      if (!store.get('path')) {
        store.set('path', 'C:/Users/Paull/OneDrive/Documents/easy-expo-data');
      }
      createWindow();
    }, 400)
  );

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
