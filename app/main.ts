import { app, BrowserWindow, screen, ipcMain } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { ItemData } from '../src/app/shared/models/item-data';

const Store = require('./electron-store');
const store = new Store();
const directoryPath = store.get('path');

ipcMain.handle('readUTFFile', async (event, path) => {
  return getFileContent(path, 'utf8');
});

ipcMain.handle('readBase64File', async (event, path) => {
  return getFileContent(path, 'base64');
});

ipcMain.handle('initExpoData', async (event, dir) => {
  return getExpoData();
});

const getDirItems = (dir?: string): ItemData[] => {
  const items: ItemData[] = [];
  const itemsName: string[] = readDir(dir);
  const title = dir?.split('/').slice(-1).pop() ?? 'all';
  itemsName.forEach((name) => {
    const item = { ...getItem(`${dir}/${name}`), tag: title };
    items.push(item);
  });
  return items;
};

const getExpoData = (): ItemData[] => {
  if (store.get('menu') === 'yes') {
    const items: ItemData[] = [];
    const menuItems: string[] = readDir('menu');
    menuItems.forEach((menuItem) => {
      const menuItems = getDirItems(`menu/${menuItem}`);
      items.push(...menuItems);
    });
    return items;
  } else {
    return getDirItems();
  }
};

const getItem = (itemName: string): ItemData => {
  const item: ItemData = {
    title: itemName.split('/').slice(-1).pop() ?? 'error',
    thumbnailSrc:
      (existFile(`${itemName}/thumbnail.png`)
        ? getFileContent(`${itemName}/thumbnail.png`, 'base64')
        : getFileContent(`${itemName}/thumbnail.jpg`, 'base64')) ?? '',
    shortDescription:
      getFileContent(`${itemName}/shortDescription.txt`, 'utf8') ?? '',
    description: getFileContent(`${itemName}/description.txt`, 'utf8') ?? '',
    audio: existFile(`${itemName}/audioSrc.mp3`)
      ? {
          src: getFileContent(`${itemName}/audioSrc.mp3`, 'base64'),
          title: getFileContent(`${itemName}/audioTitle.txt`, 'utf8'),
          description: getFileContent(
            `${itemName}/audioDescription.txt`,
            'utf8'
          ),
        }
      : undefined,
    image:
      existFile(`${itemName}/imageSrc.jpg`) ||
      existFile(`${itemName}/imageSrc.png`)
        ? {
            src: existFile(`${itemName}/imageSrc.jpg`)
              ? getFileContent(`${itemName}/imageSrc.jpg`, 'base64')
              : getFileContent(`${itemName}/imageSrc.png`, 'base64'),
            title: getFileContent(`${itemName}/imageTitle.txt`, 'utf8'),
            description: getFileContent(
              `${itemName}/imageDescription.txt`,
              'utf8'
            ),
          }
        : undefined,
    video: existFile(`${itemName}/videoSrc.mp4`)
      ? {
          src: getFileContent(`${itemName}/videoSrc.mp4`, 'base64'),
          title: getFileContent(`${itemName}/videoTitle.txt`, 'utf8'),
          description: getFileContent(
            `${itemName}/videoDescription.txt`,
            'utf8'
          ),
        }
      : undefined,
  };

  return item;
};

const getFileContent = (
  fileName: string,
  type: 'base64' | 'utf8'
): string | undefined => {
  if (existFile(fileName)) {
    return fs.readFileSync(`${directoryPath}/${fileName}`).toString(type);
  }
};

const existFile = (fileName: string): boolean => {
  return fs.existsSync(`${directoryPath}/${fileName}`);
};

const readDir = (relativePath?: string): string[] => {
  const path = relativePath
    ? `${directoryPath}/${relativePath}`
    : directoryPath;
  return fs
    .readdirSync(path)
    .filter((name) => fs.lstatSync(`${path}/${name}`).isDirectory());
};

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: !serve ? size.width : size.width / 2,
    height: !serve ? size.height : size.height / 2,
    alwaysOnTop: true,
    kiosk: true,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false,
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();
    win.kiosk = false;

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
        store.set('path', 'C:/PATH/TO/DATA');
      }
      if (store.get('menu') === undefined) {
        store.set('menu', 'yes');
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
