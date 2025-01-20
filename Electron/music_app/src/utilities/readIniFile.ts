import fs from 'fs'
import path from 'path'
import ini from 'ini'

interface IniFileType {
    AppInfo: { author: string, version: string }
}

const settingFileName = {
  dev: 'setting.dev.ini',
  pdt: 'setting.ini'
}[process.env.APP_ENV?.trim()]

const devPath = process.platform === 'darwin' ? '.webpack/main' : '.webpack\\main'
const prodPath = process.platform === 'darwin' ? 'Contents/Resources/app/.webpack/main' : 'resources\\app.asar\\.webpack\\main'
const forDarwin = process.platform === 'darwin' && process.env.APP_ENV?.trim() === 'pdt' ? 'Contents/Resources/' : ''

const replacePath = process.env.APP_ENV?.trim() === 'dev' ? devPath : prodPath
const data = fs.readFileSync(path.join(__dirname.replace(replacePath,forDarwin),settingFileName));
const iniFile = ini.parse(data.toString('utf8')) as IniFileType

// console.log(iniFile)

export default iniFile