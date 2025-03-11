import os from 'os'
import { DefaultEventsMap, Socket } from 'socket.io'
import YTMusic, { SongDetailed, VideoDetailed } from 'ytmusic-api'
import useSqlite from '../utilities/sqlite/setting'
import iniFile from '../utilities/readIniFile'
import $ from '../utilities/lib/Library'

export const socketChannelEvents: (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, unknown>
) => Promise<void> = async socket => {

    const ytMusic = new YTMusic()

    await ytMusic.initialize()

    socket.removeAllListeners()

    //#region socket broadcast
    socket.on('set_voice', (result) => {
        socket.broadcast.emit('respSetVoiceFromRemote',{ voiceVal: result.voiceVal })
    })
    
    socket.on('set_playing_song', (result) => {
        socket.broadcast.emit('respSetPlayingFromRemote',{ songInfo: result.songInfo })
    })

    socket.on('post_current_setting', (result) => {
        socket.broadcast.emit('respGetCurrentSetting',result)
    })

    socket.on('post_current_play_status', (result) => {
        socket.broadcast.emit('respSetPlayStatusFromRemote',{ playStatus: result.playStatus })
    })

    socket.on('remote_language_setting', (result) => {
        socket.broadcast.emit('respWhenChangeLaguageFromRemote',{ language: result.language })
    })

    socket.on('remote_is_start', (result) => {
        socket.broadcast.emit('respRemoteIsStart',{ isStart: result.remoteStatus })
    })

    socket.on('go_next_song_to_remote',() => {
        socket.broadcast.emit('respToRemoteGoNextSong')
    })

    socket.on('set_playing_loop', (action) => {
        socket.broadcast.emit('respSetPlayingLoopFromRemote', action)
    })
    //#endregion 

    //#region for remote
    socket.on('get_user_setting',() => {

        useSqlite(async db => {
        
            const result = await db.all("SELECT * FROM user_setting")
    
            await db.close()

            socket.emit('respGetUserSettingToRemote', result)
        })
    })

    socket.on('update_user_setting',(
        result: {uuid: number, language: string, remote_language: string}
    ) => {
        const { uuid, language, remote_language } = result

        useSqlite(async db => {
  
          try {
  
            await db.run(`
                UPDATE user_setting 
                SET language = ?,
                remote_language = ?,
                update_date = datetime('now','localtime') 
                WHERE uuid = ?
            `, [language, remote_language,uuid])
            
            socket.emit('respUpdateUserSettingToRemote',{ message: 'update success', status: 'ok' })
  
          } catch(err) {
            socket.emit('respUpdateUserSettingToRemote',{ message: err?.message || err, status: 'error' })
          }
  
          await db.close()
        })
    })

    socket.on('getSongCollectList_socket',() => {

        useSqlite(async db => {
          
          const result = await db.all("SELECT * FROM song_collect_list")
  
          await db.close()
          
          socket.emit('respGetSongCollectList_socket',result)
        
        })
    })

    socket.on('update_remote_song_collect_list',() => {

        useSqlite(async db => {
          
            const result = await db.all("SELECT * FROM song_collect_list")
    
            await db.close()
            
            socket.broadcast.emit('respGetSongCollectList_socket',result)
          
          })
    })

    socket.on('getSongCollectWithSongList_socket',(result: { song_collect_uuid: number }) => {

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
          
          socket.emit('respGetSongCollectWithSongList_socket',results)
        
        })
      })
    //#endregion

    socket.on('get_remote_ip',() => {

        const ipconfig = os.networkInterfaces()
        let addressIp = ''
    
        for (const devName in ipconfig) {

            const netList = ipconfig[devName];

            for (let i = 0; i < netList.length; i++) {

                const { address, family, internal } = netList[i]

                if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
                    addressIp = address;
                    break;
                }
            }
        }

        socket.emit('respGetRemoteIp',{ currentIp:addressIp })
    })

    socket.on('get_version',() => {
        const { AppInfo } = iniFile
        socket.emit('respGetVersion',AppInfo)
    })
    
    socket.on('search_song',async (result: { searchText: string }) => {

        if(result.searchText === '') {
            socket.emit('respSearchResult', [])
            return
        }

        useSqlite(async db => {

            let allCollectSongRepackResult: string[] = []
        
            const allCollectSongResult = await db.all<{ uuid:number, song_id: string }[]>(`
                SELECT 
                    sc.uuid,
                    sc.song_id
                FROM song_collect_list sl 
                JOIN song_collect sc ON sl.uuid = sc.song_collect_uuid
            `)

            if(allCollectSongResult.length > 0) {
                allCollectSongRepackResult = Array.from(
                    new Set(
                        $.maps(allCollectSongResult, row => row.song_id)
                    )
                )
            }
    
            let songResult: (SongDetailed | VideoDetailed)[] = []

            const videoResult = await ytMusic.searchVideos(result.searchText)
    
            const searchResult = await ytMusic.searchSongs(result.searchText)
    
            const [{ artist },] = searchResult
    
            if(result.searchText.match(artist.name.toLowerCase())){
                songResult = await ytMusic.getArtistSongs(artist.artistId)
            }
    
            const usingResult = songResult.length === 0 ? 
                [...videoResult,...searchResult] : [...videoResult,...searchResult,...songResult]
    
            const repack = $.maps(usingResult, row => {

                const [filterItem] = $.filter(allCollectSongResult, filterRow => filterRow.song_id === row.videoId)

                const thumbUrlTemp = row.thumbnails[1]?.url || row.thumbnails[0]?.url

                const thumbUrl = thumbUrlTemp.includes('h120') ? thumbUrlTemp.replace('w120', 'w400').replace('h120', 'h400') : thumbUrlTemp

                return {
                    songUUID: filterItem ? filterItem.uuid : -1,
                    artist: row.artist.name,
                    songName: row.name,
                    songThum: thumbUrl,
                    songId: row.videoId,
                    isSongInCollect: allCollectSongRepackResult.includes(row.videoId)
                }
            })
    
            socket.emit('respSearchResult',repack)
        })
    })
}