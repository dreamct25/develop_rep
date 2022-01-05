import { app, BrowserWindow, ipcMain,Menu, MenuItem,MenuItemConstructorOptions } from 'electron';
import './server/server_config';
require('@electron/remote/main').initialize()

// This allows TypeScript to pick up the magic constant that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

let mainMenuSet:MenuItem[] | MenuItemConstructorOptions[] = [{
    label:'File', // 程式上方選單文字
    accelerator:process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q', // 快捷鍵，darwin 是 Mac 平台，win32 是 Windows 平台
    submenu:[{ // 當前選單文字底下的子選單
        label:'Quit', // 子選單文字
        click(){ // 點擊事件
            app.quit() // 關閉程式
        }
    }]
}]

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
        width: 1280, 
        height: 700,
        resizable: false, 
        frame: false,
        transparent:true,
        webPreferences: {
            nodeIntegration: true, 
            contextIsolation:false,
            webSecurity:false
        }
    }) // 建立新視窗

    require('@electron/remote/main').enable(mainWindow.webContents)

    // mainWindow.loadURL("http://localhost:9870/python/items")

    const mainMenu:Menu = Menu.buildFromTemplate(mainMenuSet)

    Menu.setApplicationMenu(mainMenu)

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
};

ipcMain.on('closeApp',() => {
    const rightM = Menu.buildFromTemplate([
        {
            label: 'log',
            click: (el:MenuItem,dev:any) => dev.toggleDevTools()
        }
    ]);
    rightM.popup({});
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

if(process.env.NODE_ENV !== 'production'){
    mainMenuSet = [...mainMenuSet,{
        label:'Dev Toolse',
        submenu:[{
            label:'Toggle Dev Tools',
            click(el:MenuItem,devWindow:any){
                devWindow.toggleDevTools()
            }
        },{
            role:'reload'
        }]
    }]
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.