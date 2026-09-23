import type { SpeechSaveInput } from "@mirai-gikai/shared/bill-speeches/schemas";
import { describe, expect, it } from "vitest";
import { updateSpeechForm } from "./update-speech-form";

const confirmed: SpeechSaveInput = {
  speaker_name: "見本",
  speaker_role: "議員",
  party_name: "",
  faction_name: "",
  meeting_date: "2026-09-01",
  meeting_name: "見本の会議",
  speech_type: "debate",
  stance: "support",
  summary: "",
  content: "見本原文",
  source_title: "会議録",
  source_url: "https://example.com",
  source_locator: "",
  sort_order: 0,
  is_published: true,
  source_confirmed: true,
};
describe("発言フォームの確認状態", () => {
  it("全ての登録項目の編集で確認を解除する", () => {
    for (const key of Object.keys(confirmed) as (keyof SpeechSaveInput)[]) {
      if (key === "source_confirmed") continue;
      expect(
        updateSpeechForm(confirmed, key, confirmed[key]).source_confirmed
      ).toBe(false);
    }
    expect(confirmed.source_confirmed).toBe(true);
  });
  it("確認チェックだけを変更できる", () => {
    expect(
      updateSpeechForm(confirmed, "source_confirmed", false).source_confirmed
    ).toBe(false);
    expect(
      updateSpeechForm(
        { ...confirmed, source_confirmed: false },
        "source_confirmed",
        true
      ).source_confirmed
    ).toBe(true);
  });
  it("討論から質疑にすると賛否を解除し、討論へ戻しても復活しない", () => {
    const question = updateSpeechForm(confirmed, "speech_type", "question");
    expect(question.stance).toBe("unspecified");
    expect(question.source_confirmed).toBe(false);
    expect(updateSpeechForm(question, "speech_type", "debate").stance).toBe(
      "unspecified"
    );
  });
});
