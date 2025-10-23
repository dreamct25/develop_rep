import fs from 'fs'
import path from 'path'
import ini from 'ini'

const settingFileName = {
  dev: 'setting.dev.ini',
  pdt: 'setting.ini'
}[process.env.APP_ENV.trim()]

const devPath = process.platform === 'darwin' ? '.webpack/main' : '.webpack\\main'
const prodPath = process.platform === 'darwin' ? 'app.asar/.webpack/main' : 'resources\\app.asar\\.webpack\\main'

const replacePath = process.env.APP_ENV.trim() === 'dev' ? devPath : prodPath
const data = fs.readFileSync(path.join(__dirname.replace(replacePath,''),settingFileName));
const iniFile = ini.parse(data.toString('utf8')) as IniFileType

export default iniFile