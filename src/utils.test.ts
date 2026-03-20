import { describe, it, expect } from "vitest";
import { parseArgsFromCaption, sortURLsByPrefer, redirectPixivURL } from "./utils";

describe("utils", () => {
    describe("parseArgsFromCaption", () => {
        it("returns defaults when no caption provided", () => {
            expect(parseArgsFromCaption()).toEqual({ limit: 3, minSimilarity: 70 });
            expect(parseArgsFromCaption("")).toEqual({ limit: 3, minSimilarity: 70 });
        });

        it("parses limit from caption", () => {
            expect(parseArgsFromCaption("limit5")).toEqual({ limit: 5, minSimilarity: 70 });
            expect(parseArgsFromCaption("some text limit10")).toEqual({ limit: 10, minSimilarity: 70 });
        });

        it("parses sim/minSimilarity from caption", () => {
            expect(parseArgsFromCaption("sim80")).toEqual({ limit: 3, minSimilarity: 80 });
            expect(parseArgsFromCaption("sim99 limit2")).toEqual({ limit: 2, minSimilarity: 99 });
            expect(parseArgsFromCaption("limit1 sim50")).toEqual({ limit: 1, minSimilarity: 50 });
        });
    });

    describe("sortURLsByPrefer", () => {
        it("sorts urls by predefined preference", () => {
            const urls = [
                "https://example.com/other",
                "https://twitter.com/abc",
                "https://www.pixiv.net/artworks/123",
                "https://seiga.nicovideo.jp/seiga/im123"
            ];

            const sorted = sortURLsByPrefer([...urls]);
            expect(sorted).toEqual([
                "https://twitter.com/abc",
                "https://www.pixiv.net/artworks/123",
                "https://seiga.nicovideo.jp/seiga/im123",
                "https://example.com/other"
            ]);
        });
    });

    describe("redirectPixivURL", () => {
        it("redirects legacy pixiv URLs to artworks URL", () => {
            const legacyUrl = "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=12345678";
            expect(redirectPixivURL(legacyUrl)).toBe("https://www.pixiv.net/artworks/12345678");
        });

        it("preserves non-legacy pixiv URLs", () => {
            const newUrl = "https://www.pixiv.net/artworks/12345678";
            expect(redirectPixivURL(newUrl)).toBe(newUrl);
        });

        it("preserves non-pixiv URLs", () => {
            const otherUrl = "https://twitter.com/abc";
            expect(redirectPixivURL(otherUrl)).toBe(otherUrl);
        });
    });
});
