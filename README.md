# cf-workers-saucenao-tg-bot

## Deployment

### Prerequisites

- Telegram bot
- Cloudflare account
- SauceNAO account
- Node.js and pnpm

### Setup

1. Create a new Telegram bot using [@BotFather](https://t.me/BotFather)
2. Request a free SauceNAO API key [here](https://saucenao.com/user.php)
3. Configure your `wrangler.toml` file from `wrangler.toml.example`
4. Run `pnpm i && pnpm run deploy`
5. Set your worker secrets:
   - `pnpm wrangler secret put BOT_TOKEN`
   - `pnpm wrangler secret put SAUCENAO_TOKEN`
