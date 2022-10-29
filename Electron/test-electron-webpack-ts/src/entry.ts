import { app,BrowserWindow,Menu, MenuItem, MenuItemConstructorOptions } from 'electron'
import path from 'path'
import hotReload from 'electron-reloader'
import './server'

app.on('ready',() => {
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          webSecurity: false
        }
    });

    hotReload(module)

    const mainMenuSet:MenuItem[] | MenuItemConstructorOptions[] = [{
      label: 'File', // 程式上方選單文字
      accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q', // 快捷鍵，darwin 是 Mac 平台，win32 是 Windows 平台
      submenu: [{ // 當前選單文字底下的子選單
        label: 'Quit', // 子選單文字
        click() { // 點擊事件
          app.quit() // 關閉程式
        }
      }]
    }]

    mainMenuSet.push({
      label: 'Help',
      submenu: [
      {
        label: 'Dev Toolse',
        accelerator: 'F12',
        click() { mainWindow.webContents.toggleDevTools() }
      }, {
        role: 'reload'
      }]
    })

    const topMenu = Menu.buildFromTemplate(mainMenuSet)

    Menu.setApplicationMenu(topMenu)

    mainWindow.loadURL(path.resolve('./build/public/index.html'))

    mainWindow.show()

    mainWindow.webContents.on('did-finish-load', function () {
        mainWindow.webContents.send('getSome',{ message:'hello electron' });
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
});