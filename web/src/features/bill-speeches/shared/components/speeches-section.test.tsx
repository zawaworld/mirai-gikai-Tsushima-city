import type { SpeechRecord } from "@mirai-gikai/shared/bill-speeches/schemas";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SpeechesSection } from "./speeches-section";

const speech: SpeechRecord = {
  id: "123e4567-e89b-42d3-a456-426614174000",
  speaker_name: "見本の議員",
  speaker_role: "議員",
  party_name: "見本の党派",
  faction_name: "見本の会派",
  meeting_date: "2026-09-01",
  meeting_name: "見本の会議",
  speech_type: "debate",
  stance: "support",
  summary: "見本の要約",
  content: "見本の原文<script>alert(1)</script>",
  source_title: "見本の出典",
  source_url: "https://example.com/minutes",
  source_locator: "3ページ",
  sort_order: 0,
  is_published: true,
};
describe("発言の公開表示", () => {
  it("党派・会派・発言時点・出典を表示し、原文のHTMLを実行しない", () => {
    const html = renderToStaticMarkup(<SpeechesSection speeches={[speech]} />);
    for (const text of [
      "見本の議員",
      "党派：",
      "見本の党派",
      "会派：",
      "見本の会派",
      "所属は発言時点",
      "発言の原文を読む",
      "3ページ",
      "https://example.com/minutes",
    ])
      expect(html).toContain(text);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
  it("非公開の発言を表示しない", () => {
    const html = renderToStaticMarkup(
      <SpeechesSection speeches={[{ ...speech, is_published: false }]} />
    );
    expect(html).not.toContain("見本の議員");
    expect(html).toContain("発言がなかったことを意味するものではありません");
  });
  it("取得失敗を未掲載とは区別する", () => {
    const html = renderToStaticMarkup(
      <SpeechesSection speeches={[]} unavailable />
    );
    expect(html).toContain("読み込めませんでした");
    expect(html).not.toContain("まだ掲載していません");
  });
  it("質疑に討論の賛否を表示しない", () => {
    const html = renderToStaticMarkup(
      <SpeechesSection
        speeches={[
          { ...speech, speech_type: "question", stance: "unspecified" },
        ]}
      />
    );
    expect(html).toContain("質疑");
    expect(html).not.toContain("賛否の記載なし");
    expect(html).not.toContain("賛成の意見");
  });
});
