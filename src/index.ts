import { webhookCallback } from 'grammy/web'
import bot, { getFileURL } from './bot'
import { requestImageSauce } from './saucenao'
import { parseArgsFromCaption } from './utils'

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
    results.slice(0, limit).forEach(async (result) => {
      await ctx.reply(result)
    })
  } catch (e) {
    if (e instanceof Error) {
      await ctx.reply('Error: ' + e + e.stack)
    }
  }
})

bot.on(':photo', async (photo) => {
  console.log('photo: ', photo, photo)
  const keys = Object.keys(photo)
  console.log('keys: ', keys)
})

addEventListener('fetch', webhookCallback(bot, 'cloudflare'))
