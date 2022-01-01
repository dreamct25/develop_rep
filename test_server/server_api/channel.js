const { Router } = require("express")
const route = Router()
const { HiNetHichannel } = require('hinet-hichannel-taiwan-radio')

route.get('/get_channel',(req,res) => {
    new HiNetHichannel().getChannels().then((channels) => {
        res.send(JSON.stringify({ data:channels }))
    })
})

route.post('/get_single_channel',(req,res) => {
    let postBackItem = {}
    const hichannel = new HiNetHichannel()
    postBackItem.radioName = req.body.selectChannelName
    hichannel.setChannel(req.body.selectChannelName)
    hichannel.getChannelM3u8Url().then((m3u8Url) => {
        postBackItem.radioUrl = m3u8Url
        // console.log(`m3u8 串流網址：${m3u8Url}`)
        hichannel.getChannelProgramInfo().then((info) => {
            // console.log('電台頻道節目資訊：')
            postBackItem.radioInfoList = info
        }).then(() => res.send(JSON.stringify({ data:postBackItem })))
    }).catch(() => res.send(JSON.stringify({ data:'no data' })))
})

module.exports = route