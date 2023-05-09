import sagiri from 'sagiri'

declare global {
  const SAUCENAO_TOKEN: string
}

export const dbmask = 34359738367

export const client = sagiri(SAUCENAO_TOKEN)

export async function requestImageSauce(
  imageURL: string,
  minSimilarity: number = 70
) {
  const url = `http://saucenao.com/search.php?output_type=2&numres=10&dbmask=${dbmask}&api_key=${SAUCENAO_TOKEN}&url=${imageURL}`

  const resp = await fetch(url)
  const sauce: SauceNao.Response = await resp.json()

  const results = sauce.results
  const filtered = results
    .filter((result) => Number(result.header.similarity) > minSimilarity)
    .map((result) => result.data.source || result.data.ext_urls[0])

  return filtered
}
