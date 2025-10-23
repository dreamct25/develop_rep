import { BrowserWindow,ipcMain, IpcMainEvent, Menu, MenuItem, MenuItemConstructorOptions, App } from 'electron'
import useSqlite from "./utilities/sqlite/setting"
import { formatLanuage, changeLanguage } from './i18n_B_Set'
// export const createAlertModal:(view:BrowserWindow,type:messageBoxType,message:string) => Promise<MessageBoxReturnValue> = (view,type,message) => dialog.showMessageBox(view,{ message,type })

export const ipcListenGroup:(
  view:BrowserWindow,
  app: App
) => void = (view, app) => {
  view.webContents.on('did-finish-load',() => {

    ipcMain.removeAllListeners()

    //#region for UI action
    ipcMain.on('setPosition', (
      event: IpcMainEvent, 
      { dragX, dragY }: { dragX: number, dragY: number }) => view.setPosition(dragX, dragY)
    )
  
    ipcMain.on('setFullscreen', (event: IpcMainEvent, value: boolean) => view.setFullScreen(value))
    
    ipcMain.on('setMinScreen', () => view.minimize())
    
    ipcMain.on('closeApp', () => app.quit())

    ipcMain.on('change-backend-lang',(_, lang: string) => changeLanguage(lang))

    ipcMain.on('show-context-menu', ({ sender }, result:{ 
      type: string, 
      status: boolean, 
      subMenuResult?: {
        collect_uuid: number;
        collect_name: string;
      }[], 
      collectSongDetails?: Record<string, any>, 
      collectUID?: number
    }) => {

      const template:Record<string, MenuItem[] | MenuItemConstructorOptions[]> = {
        'action-collect-list': [
          {
            label: formatLanuage('menuItem.delete'),
            click: () => { sender.send('contextMenuDeleteCollectOpen', true, result.collectUID) }
          },
          {
            label: formatLanuage('menuItem.edit'),
            click: () => { sender.send('contextMenuEditCollectOpen', true, result.collectUID) }
          },
        ],
        'song-row': [
          {
            label: formatLanuage('menuItem.addToPlayList'),
            submenu: result?.subMenuResult ? result.subMenuResult.map(row => ({
              label: row.collect_name,
              click: () => {
                
                ipcMain.emit('addSongToCollect', null,{
                  song_collect_uuid: row.collect_uuid,
                  song_id: result?.collectSongDetails.songId,
                  song_art: result?.collectSongDetails.artist, 
                  song_name: result?.collectSongDetails.songName, 
                  song_thum_url: result?.collectSongDetails.songThum 
                })
              },
            })) : []
          }
        ],
        'collect-song-row': [
          {
            label: formatLanuage('menuItem.addToPlayList'),
            submenu: result?.subMenuResult ? result.subMenuResult.map(row => ({
              label: row.collect_name,
              click: () => {

                ipcMain.emit('addSongToCollect', null,{
                  song_collect_uuid: row.collect_uuid,
                  song_id: result?.collectSongDetails.song_id,
                  song_art: result?.collectSongDetails.song_art, 
                  song_name: result?.collectSongDetails.song_name, 
                  song_thum_url: result?.collectSongDetails.song_thum_url 
                })
              },
            })) : []
          },
          {
            label: formatLanuage('menuItem.removeFromPlayList'),
            click: () => {
  
              ipcMain.emit('deleteSongFromCollect', null,{
                song_uuid: result?.collectSongDetails.song_uuid,
                song_collect_uuid: result?.collectSongDetails.song_collect_uuid
              })
            }
          }
        ]
      }

      const menu = Menu.buildFromTemplate(template[result.type])

      if(result.status){
        
        menu.popup({ window: BrowserWindow.fromWebContents(view.webContents) })
        return
      }

      menu.closePopup(view)
    })
    //#endregion for UI action

    //#region for user
    ipcMain.on('getUserSetting',() => {

      useSqlite(async db => {
        
        const result = await db.all("SELECT * FROM user_setting")

        if(result.length > 0){

          const [{ language }] = result
          ipcMain.emit('change-backend-lang', null, language)
        }

        await db.close()
        
        view.webContents.send('respGetUserSetting',result)
      
      })
    })

    ipcMain.on('updateUserSetting',(_,result:{ 
      uuid: string, 
      language?: string, 
      remote_language?:string,
      player_volume?: number,
      bg_buf?: ArrayBuffer,
      bg_blur_pec?: number,
      bg_mask_pec?: number,
      them_color?: string
      type: 'lang' | 'bg_buf' | 'bg_blur_pec' | 'bg_mask_pec' | 'them_color' | 'player_volume'
    }) => {
      
      const { uuid, type } = result

      useSqlite(async db => {

        const action:Record<typeof type, () => Promise<void>> = {
          lang: async () => {

            ipcMain.emit('change-backend-lang', null, result?.language)

            await db.run(`
              UPDATE user_setting 
              SET language = ?,
              remote_language = ?,
              update_date = datetime('now','localtime') 
              WHERE uuid = ?
            `, [result?.language, result?.remote_language, uuid])
          },
          bg_buf: async () => {
            await db.run(`
             UPDATE user_setting 
             SET bg_buf = ?,
             update_date = datetime('now','localtime') 
             WHERE uuid = ?
            `, [Buffer.from(result?.bg_buf), uuid])
          },
          bg_blur_pec: async () => {
            await db.run(`
             UPDATE user_setting 
             SET bg_blur_pec = ?,
             update_date = datetime('now','localtime') 
             WHERE uuid = ?
            `, [result?.bg_blur_pec, uuid])
          },
          bg_mask_pec: async () => {
            await db.run(`
             UPDATE user_setting 
             SET bg_mask_pec = ?,
             update_date = datetime('now','localtime') 
             WHERE uuid = ?
            `, [result?.bg_mask_pec, uuid])
          },
          them_color: async () => {
            await db.run(`
             UPDATE user_setting 
             SET them_color = ?,
             update_date = datetime('now','localtime') 
             WHERE uuid = ?
            `, [result?.them_color, uuid])
          },
          player_volume: async () => {
            await db.run(`
             UPDATE user_setting 
             SET player_volume = ?,
             update_date = datetime('now','localtime') 
             WHERE uuid = ?
            `, [result?.player_volume, uuid])
          },
        }

        try {

          await action[type]()
          
          view.webContents.send('respUpdateUserSetting',{ message: 'update success', status: 'ok' })

        } catch(err) {
          view.webContents.send('respUpdateUserSetting',{ message: err?.message || err, status: 'error' })
        }

        await db.close()
      })

    })
    //#endregion

    //#region for song collect list
    ipcMain.on('getSongCollectWithSongList',(_, result: { song_collect_uuid: number }) => {

      useSqlite(async db => {
        
        const results = await db.all(
          `SELECT 
            sct.song_collect_uuid,
            sct.uuid song_uuid,
            sct.song_id,
            sct.song_art,
            sct.song_name,
            sct.song_thum_url,
            sct.song_sort_num,
            sct.create_date
           FROM song_collect_list scl 
           JOIN song_collect sct ON scl.uuid = sct.song_collect_uuid 
           WHERE scl.uuid = ? 
           ORDER BY sct.song_sort_num
          `,
          [result.song_collect_uuid]
        )

        await db.close()
        
        view.webContents.send('respGetSongCollectWithSongList',results)
      
      })
    })

    ipcMain.on('getSongCollectList',() => {

      useSqlite(async db => {
        
        const result = await db.all("SELECT * FROM song_collect_list")

        await db.close()
        
        view.webContents.send('respGetSongCollectList',result)
      
      })
    })

    ipcMain.on('createSongCollectList',(_, result: { 
      collect_name: string, 
      collect_desc: string
    }) => {

      const { collect_name, collect_desc }  = result

      useSqlite(async db => {

        try {

          const result = await db.all(
            "SELECT * FROM song_collect_list WHERE collect_name = ?",
            [collect_name]
          )

          if(result.length > 0){
            throw new Error('already have')
          }

          const alpha = Math.random() * 1

          const collectBgColor = [
            (Math.random() * 255).toFixed(0),
            (Math.random() * 255).toFixed(0),
            (Math.random() * 255).toFixed(0),
            alpha < 1 ? alpha.toFixed(2) : alpha.toFixed(0)
          ].join(',')

          await db.run(
            `INSERT INTO song_collect_list 
             (
              collect_name,
              collect_desc,
              collect_bg,
              create_date
             ) 
             VALUES (?,?,?,datetime('now','localtime'))
            `, [
              collect_name, 
              collect_desc, 
              `rgba(${collectBgColor})`
            ]
          )
  
          view.webContents.send('respCreateSongCollectList',{ message: `add success|${collect_name}` })
        } catch(err) {
          view.webContents.send('respCreateSongCollectList',{ message: err.message })
        }

        await db.close()
      })
    })

    ipcMain.on('editSongCollectList',(_, result: { 
      collect_uuid: number,
      collect_name: string, 
      collect_desc: string
    }) => {

      const { collect_uuid, collect_name, collect_desc }  = result

      useSqlite(async db => {

        try {

          const result = await db.all(
            "SELECT * FROM song_collect_list WHERE collect_name = ?",
            [collect_name]
          )

          if(result.length > 0){
            throw new Error('already have')
          }

          await db.run(
            `UPDATE song_collect_list 
             SET collect_name = ?,
             collect_desc = ?,
             update_date = datetime('now','localtime')
             WHERE uuid = ?
            `, [collect_name, collect_desc, collect_uuid]
          )
  
          view.webContents.send('respEditSongCollectList',{ message: `update success|${collect_name}` })
        } catch(err) {
          view.webContents.send('respEditSongCollectList',{ message: `${err.message}|${collect_name}` })
        }

        await db.close()
      })
    })

    ipcMain.on('deleteSongCollectList',(_, result: { uuid: number }) => {

      const { uuid }  = result

      useSqlite(async db => {

        try {

          await db.run("DELETE FROM song_collect WHERE song_collect_uuid = ?", [uuid])

          await db.run("DELETE FROM song_collect_list WHERE uuid = ?", [uuid])
  
          view.webContents.send('respDeleteSongCollectList',{ message: 'delete success' })
        } catch(err) {
          view.webContents.send('respDeleteSongCollectList',{ message: err.message })
        }

        await db.close()
      })
    })
    //#endregion

    //#region for song
    ipcMain.on('addSongToCollect',(_, result: {
      song_collect_uuid: number,
      song_id: string,
      song_art: string, 
      song_name: string, 
      song_thum_url: string 
    }) => {

      const { song_collect_uuid ,song_id, song_art, song_name, song_thum_url }  = result

      useSqlite(async db => {

        try {

          const result = await db.all(
            `SELECT 
              scl.uuid scl_uuid,
              sct.uuid sct_uuid 
             FROM song_collect_list scl 
             JOIN song_collect sct ON scl.uuid = sct.song_collect_uuid 
             WHERE scl.uuid = ? AND sct.song_id = ?
            `,
            [song_collect_uuid, song_id]
          )

          const [singleResult] = await db.all<{ collect_name:string }[]>(
            `SELECT 
              collect_name
             FROM song_collect_list 
             WHERE uuid = ?
            `,
            [song_collect_uuid]
          )

          if(result.length > 0){
            throw new Error(`already have|${singleResult.collect_name}`)
          }

          const findSortNumInCollect = await db.get<{ song_sort_num:number }>(
            `SELECT song_sort_num FROM song_collect 
             WHERE song_collect_uuid = ?  
             ORDER BY song_sort_num DESC LIMIT 1`,
            [song_collect_uuid]
          )

          await db.run(
            `INSERT INTO song_collect 
             (
              song_collect_uuid,
              song_id,
              song_art,
              song_name,
              song_thum_url,
              song_sort_num,
              create_date
             ) 
             VALUES (?,?,?,?,?,?,datetime('now','localtime'))
            `, [
                song_collect_uuid,
                song_id, song_art, 
                song_name, 
                song_thum_url, 
                findSortNumInCollect !== undefined ? findSortNumInCollect?.song_sort_num + 1 : 0
              ]
          )

          view.webContents.send('respAddSongUpdateView',{ songId: song_id })
  
          view.webContents.send('respAddSongToCollect',{ message: `add success|${singleResult.collect_name}` })
        } catch(err) {
          view.webContents.send('respAddSongToCollect',{ message: err.message })
        }

        await db.close()
      })
    })

    ipcMain.on('deleteSongFromCollect',(_, result: { 
      song_uuid: number,
      song_collect_uuid: number
    }) => {

      const { song_uuid, song_collect_uuid } = result

      useSqlite(async db => {

        try {

          const querySongResult = await db.get<{ song_collect_uuid: number, song_id: string }>(
            "SELECT song_collect_uuid FROM song_collect where uuid = ?",
            [song_uuid]
          )

          const queryCollectResult = await db.get<{ collect_name: string }>(
            "SELECT collect_name FROM song_collect_list where uuid = ?",
            [querySongResult.song_collect_uuid]
          )

          await db.run(
            "DELETE FROM song_collect where uuid = ?",
            [song_uuid]
          )
  
          view.webContents.send('respDeleteFromCollect',{ message: `delete success|${queryCollectResult.collect_name}` })
        
          ipcMain.emit('getSongCollectWithSongList', null, { song_collect_uuid })
        } catch(err) {
          view.webContents.send('respDeleteFromCollect',{ message: err.message })
        }

        await db.close()
      })
    })

    ipcMain.on('sortSongFromCollect',(_, result: { 
      replaceItem: { songUUID: number, songSortNum: number },
      replaceItemTo: { songUUID: number, songSortNum: number },
      song_collect_uuid
    }) => {

      const { replaceItem, replaceItemTo, song_collect_uuid } = result

      useSqlite(async db => {

        try {

          await db.run(
            "UPDATE song_collect SET song_sort_num = ? WHERE uuid = ?",[replaceItemTo.songSortNum,replaceItem.songUUID]
          )

          await db.run(
            "UPDATE song_collect SET song_sort_num = ? WHERE uuid = ?",[replaceItem.songSortNum,replaceItemTo.songUUID]
          )

          ipcMain.emit('getSongCollectWithSongList', null, { song_collect_uuid })
  
        } catch(err) {
          // view.webContents.send('respDeleteFromCollect',{ message: err.code })
        }

        await db.close()
      })
    })
    //#endregion
  })
}