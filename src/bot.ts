import type { UserFromGetMe } from 'grammy/types'
import { Bot } from 'grammy/web'

declare global {
  const BOT_TOKEN: string
  const BOT_NAME: string
}

const botId = Number(BOT_TOKEN.split(':')[0])

const BOT_INFO: UserFromGetMe = {
  id: botId,
  is_bot: true,
  first_name: BOT_NAME,
  username: BOT_NAME,
  can_join_groups: true,
  can_read_all_group_messages: false,
  supports_inline_queries: false,
}

const bot = new Bot(BOT_TOKEN, { botInfo: BOT_INFO })

export default bot

export function getFileURL(bot: Bot, filePath: string): string {
  return `https://api.telegram.org/file/bot${bot.token}/${filePath}`
}
