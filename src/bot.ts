import type { UserFromGetMe } from 'grammy/types'
import { Bot } from 'grammy/web'

export interface Env {
  BOT_TOKEN: string;
  BOT_NAME: string;
  SAUCENAO_TOKEN: string;
}

export function getBot(env: Env): Bot {
  const botId = Number(env.BOT_TOKEN.split(':')[0])

  const botInfo: UserFromGetMe = {
    id: botId,
    is_bot: true,
    first_name: env.BOT_NAME,
    username: env.BOT_NAME,
    can_join_groups: true,
    can_read_all_group_messages: false,
    supports_inline_queries: false,
    can_connect_to_business: false,
    has_main_web_app: false,
    has_topics_enabled: false,
    allows_users_to_create_topics: false,
  }

  const bot = new Bot(env.BOT_TOKEN, { botInfo })
  return bot
}

export function getFileURL(token: string, filePath: string): string {
  return `https://api.telegram.org/file/bot${token}/${filePath}`
}
