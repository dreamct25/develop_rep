import { Router } from 'express'
import YTMusic from 'ytmusic-api'

const route = Router()

const ytMusic = new YTMusic()

route.get('/tt/:q',async (req, res) => {

    let songResult = []

    await ytMusic.initialize()

    const x = await ytMusic.searchVideos(req.params.q)
    // MUSIC
    const searchResult = await ytMusic.searchSongs(req.params.q)

    const [{ artist },] = searchResult

    if(req.params.q === artist.name.toLowerCase()){
        songResult = await ytMusic.getArtistSongs(artist.artistId)
    }

    const usingResult = songResult.length === 0 ? searchResult : songResult

    const repack = usingResult.map(row => ({
        artist: row.artist.name,
        songName: row.name,
        songThum: row.thumbnails[1].url,
        songId: row.videoId
    }))

    res.status(200).json([...x, ...searchResult])
})

export default route