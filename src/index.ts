import { webhookCallback } from 'grammy/web'
import bot, { getFileURL } from './bot'
import { requestImageSauce } from './saucenao'
import {
  parseArgsFromCaption,
  redirectPixivURL,
  sortURLsByPrefer,
} from './utils'

bot.command('start', async (ctx) => {
  await ctx.reply('hello, world!')
})

bot.on('message', async (ctx) => {
  bot.api.sendChatAction(ctx.chat.id, 'typing')

  try {
    if (!ctx.message.photo) {
      await ctx.reply(
        'I can only understand commands. Send me command or image to continue.'
      )
      return
    }

    const caption = ctx.message.caption
    const { limit, minSimilarity } = parseArgsFromCaption(caption)

    const file = await ctx.getFile()

    if (!file.file_path) {
      await ctx.reply('No path found')
      return
    }

    // FIXME: may leak token
    const results = await requestImageSauce(
      getFileURL(bot, file.file_path),
      minSimilarity
    )
    if (results.length === 0) {
      await ctx.reply(`No result matches minSimilarity ${minSimilarity} found.`)
    }

    const sortedResults = sortURLsByPrefer(results)
      .slice(0, limit)
      .map(redirectPixivURL)
    for (let result of sortedResults) {
      await ctx.reply(result)
    }
  } catch (e) {
    if (e instanceof Error) {
      await ctx.reply('Error: ' + e + e.stack)
    }
  }
})

addEventListener('fetch', webhookCallback(bot, 'cloudflare'))
