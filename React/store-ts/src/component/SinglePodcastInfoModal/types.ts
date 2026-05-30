export type SinglePodcastDataType = {
    feedUrl: string
} & Record<string, any>

export interface RenderSinglePodcastDataType {
    title: string,
    guid: { ['#text']: string } | string,
    encoded: string,
    pubDate: string,
    enclosure?: { url: string }
}