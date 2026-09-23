/**
 * サイト設定ファイル
 * Fork して別の地方議会向けに使用する場合はこのファイルを変更してください。
 * @see docs/kawasaki/20260304_1000_別地域向けfork手順.md
 */
export const siteConfig = {
  siteName: "みらい議会ー対馬市版",
  siteDescription:
    "対馬市議会で今どんな議案が検討されているか、わかりやすく伝えるプラットフォームです",
  cityName: "対馬市",
  councilName: "対馬市議会",
  keywords: [
    "みらい議会ー対馬市版",
    "議案",
    "対馬市",
    "対馬市議会",
    "地方政治",
    "政策",
    "解説",
  ],
  councilBaseUrl: "https://www.city.tsushima.nagasaki.jp/",
  /** 議案・議決結果の一覧ページ */
  councilBillsDetailUrl:
    "https://www.city.tsushima.nagasaki.jp/gyousei/soshiki/gikaijimukyoku/gikai/gian-shingikekka/index.html",
  twitterHashtag: "みらい議会対馬市版", // # なし
  externalLinks: {
    // URL確定までは問題報告ボタンを表示しない。
    report: "" as string,
    aboutNote: "" as string,
    donation: "https://team-mir.ai/support/donation",
    teamAbout: "https://team-mir.ai/about",
    terms: "https://team-mir.ai/terms",
    privacy: "https://team-mir.ai/privacy",
    faq: "https://team-mirai.notion.site/FAQ-28cf6f56bae180bd84e7f7ae80f806a1",
  },
  /**
   * サイト運営主体の政党名（掲載する議員の党派・会派とは別）（空文字列の場合は政党名を省略した汎用表現を使用）
   * 例: "チームみらい"
   */
  managingParty: "" as string,
  /**
   * サービス運営者情報
   * 利用規約や問い合わせ先に使用します。
   */
  operator: {
    name: "zawa" as string,
    contactUrl:
      "https://line.me/ti/g2/jB92wCayPVojpYscH42i_HTECc7qDsRgfmDskQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" as string,
    /** 利用規約の準拠法・管轄裁判所（第一審の専属的合意管轄） */
    jurisdiction: "長崎地方裁判所" as string,
  },
  /**
   * AI機能の有効/無効設定
   * 本番環境のコスト管理のため、機能ごとにオン/オフを切り替えられます。
   */
  features: {
    /** AIチャット機能（議案への質問・テキスト選択からの質問）*/
    aiChat: true,
    /** AIインタビュー機能（議案当事者へのヒアリング）*/
    aiInterview: false,
    /**
     * チームみらいセクションの表示（トップページ・フッター・デスクトップメニュー）
     * 非公式運営など、党の公式サービスとして出さない場合は false にする。
     */
    showTeamMiraiSection: false as boolean,
  },
} as const;
