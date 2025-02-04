import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import path from 'path';
import fs from 'fs'
import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
import { productName } from './package.json'

// 依據環境設定對應 ini
const settingFile = {
  dev: 'setting.dev.ini',
  pdt: 'setting.ini'
}[process.env.APP_ENV?.trim()]

const platformPath:{
  // mainImgLocalPath: string,
  // mainImgDistDirPath: string,
  // mainImgDistPath: string,
  iniFileDistPath: string,
  iconDistPath: string
} = {
  darwin: {
    // mainImgLocalPath: 'src/asset/img/main-bg.jpg',
    // mainImgDistDirPath: 'resources/asset/img',
    // mainImgDistPath: 'resources/asset/img/main-bg.jpg',
    iniFileDistPath: `${productName}.app/Contents/Resources/${settingFile}`,
    iconDistPath: './src/asset/icon/radio-waves.icns'
  },
  win32: {
    // mainImgLocalPath: 'src\\asset\\img\\main-bg.jpg',
    // mainImgDistDirPath: 'resources\\asset\\img',
    // mainImgDistPath: 'resources\\asset\\img\\main-bg.jpg',
    iniFileDistPath: settingFile,
    iconDistPath: './src/asset/icon/radio-waves-icon.ico'
  }
}[process.platform]

// {
//   unpackDir: '{src/asset/img, src/asset/icon}'
// }

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: platformPath.iconDistPath,
  },
  hooks:{
    // 編譯 (make) 完應用後複製 ini 到資料匣內
    postPackage: async (_,packages) => {
      const [outputPath] = packages.outputPaths
      await fs.promises.copyFile(settingFile, path.join(outputPath,platformPath.iniFileDistPath))
      // await fs.promises.mkdir(path.join(outputPath, platformPath.mainImgDistDirPath), { recursive: true })
      // await fs.promises.copyFile(platformPath.mainImgLocalPath, path.join(outputPath, platformPath.mainImgDistPath))
    }
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({ }, ['darwin', 'win32']), new MakerRpm({}), new MakerDeb({})],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      loggerPort: 9001,
      mainConfig,
      devContentSecurityPolicy: "connect-src * http://localhost:10987 'unsafe-eval'",
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/UI/MainView/index.html",
            js: "./src/UI/MainView/entry.tsx",
            name: "main_window"
          },
          {
            html: "./src/UI/StarterLoading/index.html",
            js: "./src/UI/StarterLoading/entry.tsx",
            name: "loading_window"
          },
          {
            html: "./src/UI/MusicStreamRemote/index.html",
            js: "./src/UI/MusicStreamRemote/entry.tsx",
            name: "music_stream_remote"
          }
        ],
      },
    }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
