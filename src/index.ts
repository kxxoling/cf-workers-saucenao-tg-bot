import { webhookCallback } from 'grammy/web'
import bot, { getFileURL } from './bot'
import { requestImageSauce } from './saucenao'

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
    } else {
      const photo = ctx.msg.photo

      const file = await ctx.getFile()
      const path = file.file_path

      if (!file.file_path) {
        await ctx.reply('No path found')
      } else {
        // FIXME: may leak token
        const results = await requestImageSauce(getFileURL(bot, file.file_path))
        if (results.length === 0) {
          await ctx.reply('No result matches minSimilarity 70')
        }
        results.forEach(async (result) => {
          await ctx.reply(result)
        })
      }
    }
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
