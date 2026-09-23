import { describe, expect, it } from "vitest";
import { speechSaveSchema, type SpeechSaveInput } from "./schemas";

const draft: SpeechSaveInput = {
  speaker_name: "見本の議員", speaker_role: "議員", party_name: "", faction_name: "",
  meeting_date: "2026-09-01", meeting_name: "見本の会議", speech_type: "debate",
  stance: "unspecified", summary: "", content: "見本の原文", source_title: "会議録",
  source_url: "https://example.com/minutes", source_locator: "", sort_order: 0,
  is_published: false, source_confirmed: false,
};
describe("発言の保存条件", () => {
  it("無所属・要約なしの下書きも保存できる", () => {
    expect(speechSaveSchema.parse(draft)).toEqual(draft);
  });
  it("出典未確認の発言は公開できない", () => {
    expect(speechSaveSchema.safeParse({ ...draft, is_published: true }).success).toBe(false);
    expect(speechSaveSchema.safeParse({ ...draft, is_published: true, source_confirmed: true }).success).toBe(true);
  });
  it.each(["javascript:alert(1)", "data:text/html,test", "ftp://example.com/a", "not a url"])("危険または無効な出典URLを拒否する: %s", (source_url) => {
    expect(speechSaveSchema.safeParse({ ...draft, source_url }).success).toBe(false);
  });
  it.each(["2026-02-29", "2026-04-31", ""])("存在しない日付を拒否する: %s", (meeting_date) => {
    expect(speechSaveSchema.safeParse({ ...draft, meeting_date }).success).toBe(false);
  });
  it("質疑や答弁に討論の賛否を付けられない", () => {
    for (const speech_type of ["question", "answer", "explanation"]) {
      expect(speechSaveSchema.safeParse({ ...draft, speech_type, stance: "support" }).success).toBe(false);
      expect(speechSaveSchema.safeParse({ ...draft, speech_type }).success).toBe(true);
    }
  });
  it("空白だけの必須情報を拒否する", () => {
    for (const key of ["speaker_name", "speaker_role", "meeting_name", "content", "source_title"]) {
      expect(speechSaveSchema.safeParse({ ...draft, [key]: "  " }).success).toBe(false);
    }
  });
  it("巨大な原文と不正な表示順を拒否する", () => {
    expect(speechSaveSchema.safeParse({ ...draft, content: "字".repeat(100001) }).success).toBe(false);
    for (const sort_order of [-1, 0.5, 10001, Number.NaN]) {
      expect(speechSaveSchema.safeParse({ ...draft, sort_order }).success).toBe(false);
    }
  });
});
