/**
 * サイト設定ファイル（Admin）
 * Fork して別の地方議会向けに使用する場合はこのファイルを変更してください。
 */
export const siteConfig = {
  siteName: "みらい議会ー対馬市版",
  cityName: "対馬市",
  councilName: "対馬市議会",
  councilBaseUrl: "https://www.city.tsushima.nagasaki.jp/",
  councilBillsDetailUrl:
    "https://www.city.tsushima.nagasaki.jp/gyousei/soshiki/gikaijimukyoku/gikai/gian-shingikekka/index.html",
  councilFactionExamples:
    "新政会、未来改革、新友会、対政会、対馬の風、市民協働、公明",
} as const;
