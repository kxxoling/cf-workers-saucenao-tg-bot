# cf-workers-saucenao-tg-bot

cf-workers-saucenao-tg-bot is a Telegram bot that uses [SauceNAO](https://saucenao.com/) to reverse search images deployed on Cloudflare workers. You don't need a server to run this bot, just a Cloudflare account.

You can the bot [here](https://t.me/SauceNaoCFBot).

## Deployment

### Prerequisites

- Telegram bot
- Cloudflare account
- SauceNAO account
- Node.js and pnpm

### Setup

1. Create a new Telegram bot using [@BotFather](https://t.me/BotFather)
2. Request a free SauceNAO API key [here](https://saucenao.com/user.php)
3. Configure your `wrangler.toml` file from `wrangler.example.toml`
4. Run `pnpm i && pnpm run deploy`
5. Set your worker secrets:
   - `pnpm wrangler secret put BOT_TOKEN`
   - `pnpm wrangler secret put SAUCENAO_TOKEN`
