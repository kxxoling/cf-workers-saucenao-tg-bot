import { unstable_dev } from "wrangler";
import type { Unstable_DevWorker } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Worker", () => {
	let worker: Unstable_DevWorker;

	beforeAll(async () => {
		worker = await unstable_dev("src/index.ts", {
			experimental: { disableExperimentalWarning: true },
			compatibilityFlags: ["nodejs_compat"],
			vars: {
				BOT_TOKEN: "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11",
				BOT_NAME: "TestingBot",
				SAUCENAO_TOKEN: "mocked_sauce_token"
			}
		});
	});

	afterAll(async () => {
		await worker.stop();
	});

	it("should return Hello World", async () => {
		const resp = await worker.fetch();
		if (resp) {
			const text = await resp.text();
			expect(text).toMatchInlineSnapshot(`"Hello World!"`);
		}
	}, 30000);
});
