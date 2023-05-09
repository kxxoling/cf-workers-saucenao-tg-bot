
declare module App {
  interface Env {
    name: string
  }
}

declare module SauceNao {

  interface Header {
    user_id: string
    account_type: string
    short_limit: string
    long_limit: string
    status: string
    results_requested: number
    short_remaining: number
    long_remaining: number
    index: {
      [key: string]: unknown
    }
  }

  interface ResultHeader {
    similarity: string
    thumbnail: string
    index_id: number
    index_name: string
    dupes: number
    hidden: number
  }

  interface ResultData {
    ext_urls: string[]
    title: string

    // DeviantArt
    da_id?: string
    author_name?: string
    author_url?: string

    // AniDB/AniList/MyAnimeList
    sources?: string
    anidb_aid?: number
    mal_id?: number
    anilist_id?: number
    part: string
    year: string
    est_time: string

    // Pixiv
    member_name?: string
    member_id?: number
    pixiv_id?: number

    // Seiga
    seiga_id?: number
    // member_id?: number
    // member_name?: string

    // Danbooru
    danbooru_id?: number
    gelbooru_id?: number
    creator?: string
    material?: string
    characters?: string
    source?: string

    // Twitter
    twitter_name?: string
    twitter_id?: number
  }
  interface Result {
    header: ResultHeader
    data: ResultData
  }

  interface Response {
    header: Header
    results: Result[]
  }
}
