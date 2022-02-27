import { Router, Request, Response } from "express"
import { Database } from 'sqlite3'
import { collectItem } from '../../component/RadioCollect/types'
import $ from '../../lib/Library'
const { sqlite, fileUrl } = require('../db_setting')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import internetAvailable from 'internet-available'

const { HiNetHichannel } = require('hinet-hichannel-taiwan-radio')
const route: Router = Router()

export interface radioInfoListType {
    area: string
    desc: string
    id: string
    imageUrl: string
    isToday: boolean
    nextDate: string
    nowProgramName: string
    preDate: string
    programList: programListType[]
    showDate: string
    title: string
    type: string
}

export interface programListType {
    end_time: string,
    start_time: string,
    name: string,
    on: boolean
}

export interface postBackItemType {
    radioName: any
    radioUrl: string,
    radioInfoList: radioInfoListType[]
}

export interface channelItemType {
    channel_id: string
    channel_image: string
    channel_title: string
    inCollect:boolean
    isChannel: boolean
    program_name: string
    radio_type: string
}

export interface channelRankItemType {
    channel_title: string,
    channel_rank: string,
    isChannel: boolean,
    program_name: string,
    channel_image: string,
    channel_id: string,
    radio_type: string
}

route.get('/get_channel', (req: Request, res: Response) => {
    internetAvailable().then(() => {
        const hichannel = new HiNetHichannel
        let channelsTemp:channelItemType[] = []
        hichannel.getChannels().then((channels: channelItemType[]) => {
            const db: Database = new sqlite.Database(fileUrl)
            db.all("SELECT * FROM radio_collect_list", (err: Error, data: collectItem[]) => {
                if (err) {
                    res.json({ message: err.message })
                } else {
                    const dbDataTemp:string[] = $.maps(data,((item:collectItem) => item.radio_name))
                    channelsTemp = $.maps(channels,(item:channelItemType) => ({
                        ...item,
                        inCollect:$.includes(dbDataTemp,item.channel_title)
                    }))
                }
                db.close()
            })
        }).then(() => {
            hichannel.getRankingChannels().then((rankItem: channelRankItemType[]) => {
                res.json({ data: { channels:channelsTemp, rankItem } })
            })
        })
    })
})

route.post('/get_single_channel', (req: Request, res: Response) => {
    const postBackItem: postBackItemType = {
        radioName: '',
        radioUrl: '',
        radioInfoList: [],
    };

    internetAvailable().then(() => {
        const hichannel = new HiNetHichannel

        postBackItem.radioName = req.body.selectChannelName
    
        hichannel.setChannel(req.body.selectChannelName)
        hichannel.getChannelM3u8Url().then((m3u8Url: string) => {
            postBackItem.radioUrl = m3u8Url
            // console.log(`m3u8 串流網址：${m3u8Url}`)
            hichannel.getChannelProgramInfo().then((info: radioInfoListType) => {
                // console.log('電台頻道節目資訊：')
                postBackItem.radioInfoList = [info]
            }).then(() => res.json({ data: postBackItem }))
        }).catch((err: any) => res.json({ data: err }))
    })
})

module.exports = route