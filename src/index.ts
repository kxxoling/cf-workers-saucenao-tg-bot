import { webhookCallback } from 'grammy/web'
import { getBot, getFileURL, Env } from './bot'
import { requestImageSauce } from './saucenao'
import {
  parseArgsFromCaption,
  redirectPixivURL,
  sortURLsByPrefer,
} from './utils'

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    if (request.method !== 'POST') {
      return new Response('Hello World!')
    }

    const bot = getBot(env)

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
        const { limit, minSimilarity } = parseArgsFromCaption(caption || '')

        const file = await ctx.getFile()

        if (!file.file_path) {
          await ctx.reply('No path found')
          return
        }

        const results = await requestImageSauce(
          getFileURL(env.BOT_TOKEN, file.file_path),
          minSimilarity,
          env.SAUCENAO_TOKEN
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

    const handleUpdate = webhookCallback(bot, 'cloudflare-mod')
    return handleUpdate(request)
  }
}
