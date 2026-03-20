import { describe, it, expect, vi, afterEach } from "vitest";
import { requestImageSauce } from "./saucenao";

describe("saucenao", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("filters out low similarity and pximg URLs", async () => {
        // Mock Response mimicking SauceNao JSON layout
        const mockSauceResponse = {
            results: [
                { header: { similarity: "80" }, data: { source: "https://twitter.com/abc" } },
                { header: { similarity: "60" }, data: { ext_urls: ["https://twitter.com/below_sim"] } },
                { header: { similarity: "90" }, data: { source: "https://i.pximg.net/some_image" } },
                { header: { similarity: "95" }, data: { ext_urls: ["https://www.pixiv.net/artworks/123"] } }
            ]
        };

        const fetchMock = vi.fn().mockResolvedValue({
            json: vi.fn().mockResolvedValue(mockSauceResponse)
        });
        vi.stubGlobal("fetch", fetchMock);

        const results = await requestImageSauce("http://example.com/img.jpg", 70, "fake_token");

        // similarity 60 is strictly less than or equal to 70 and thus filtered.
        // i.pximg.net is filtered out by the logic
        expect(results).toEqual([
            "https://twitter.com/abc",
            "https://www.pixiv.net/artworks/123"
        ]);

        expect(fetchMock).toHaveBeenCalledOnce();
        const urlCalled = fetchMock.mock.calls[0][0];
        expect(urlCalled).toContain("api_key=fake_token");
        expect(urlCalled).toContain("url=http://example.com/img.jpg");
    });
});
