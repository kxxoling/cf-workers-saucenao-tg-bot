export const dbmask = 34359738367

export async function requestImageSauce(
  imageURL: string,
  minSimilarity: number = 70,
  token: string
) {
  const url = `http://saucenao.com/search.php?output_type=2&numres=10&dbmask=${dbmask}&api_key=${token}&url=${imageURL}`

  const resp = await fetch(url)
  const sauce: SauceNao.Response = await resp.json()

  const results = sauce.results
  const filtered = results
    .filter((result) => Number(result.header.similarity) > minSimilarity)
    .map((result) => result.data.source || result.data.ext_urls[0])
    .filter(Boolean)
    .filter((url) => !url.startsWith('https://i.pximg.net/'))

  return filtered
}
