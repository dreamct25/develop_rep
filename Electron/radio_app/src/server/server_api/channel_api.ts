import { Router, Request, Response } from "express"

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
    const hichannel = new HiNetHichannel
    hichannel.getChannels().then((channels: channelItemType[]) => {
        hichannel.getRankingChannels().then((rankItem: channelRankItemType[]) => {
            res.json({ data: { channels, rankItem } })
        })
    })
})

route.post('/get_single_channel', (req: Request, res: Response) => {
    const postBackItem: postBackItemType = {
        radioName: '',
        radioUrl: '',
        radioInfoList: [],
    };

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

module.exports = route