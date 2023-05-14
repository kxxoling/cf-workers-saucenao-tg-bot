const RE_LIMIT = /(^|\s)limit(\d+)/
const RE_MIN_SIMILARITY = /(^|\s)sim(\d+)/

export function parseArgsFromCaption(caption?: string) {
  const DEFAULT_LIMIT = 3
  const DEFAULT_MIN_SIMILARITY = 70
  const limit =
    (caption && Number(RE_LIMIT.exec(caption)?.[2])) || DEFAULT_LIMIT
  const minSimilarity =
    (caption && Number(RE_MIN_SIMILARITY.exec(caption)?.[2])) ||
    DEFAULT_MIN_SIMILARITY

  return { limit, minSimilarity }
}

export function sortURLsByPrefer(
  urls: string[],
  prefer = ['seiga', 'pixiv', 'twitter']
) {
  const sorted = urls.sort((a, b) => {
    const aIndex = prefer.findIndex((p) => a.includes(p))
    const bIndex = prefer.findIndex((p) => b.includes(p))
    return bIndex - aIndex
  })
  return sorted
}

const RE_LEGACY_PIXIV =
  /^https?:\/\/www\.pixiv\.net\/member_illust\.php\?mode=medium&illust_id=(\d+)/

export function redirectPixivURL(url: string) {
  const pixivId = RE_LEGACY_PIXIV.exec(url)?.[1]
  if (pixivId) {
    return `https://www.pixiv.net/artworks/${pixivId}`
  }
  return url
}
