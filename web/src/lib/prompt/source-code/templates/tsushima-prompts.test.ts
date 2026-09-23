import { describe, expect, it } from "vitest";
import { buildTopChatSystemPrompt } from "./top-chat-system";
import { buildBillChatSystemNormalPrompt } from "./bill-chat-system-normal";
import { buildBillChatSystemHardPrompt } from "./bill-chat-system-hard";

describe("対馬市版チャットの運営情報", () => {
  const prompts = [
    buildTopChatSystemPrompt("議案一覧"),
    buildBillChatSystemNormalPrompt("議案名", "題名", "要約", "本文"),
    buildBillChatSystemHardPrompt("議案名", "題名", "要約", "本文"),
  ];
  it.each(prompts)("対象議会と非公式の運営主体を伝える", (prompt) => {
    expect(prompt).toContain("対馬市議会");
    expect(prompt).toContain("運営者はzawa");
    expect(prompt).toContain("自治体・議会・政党の公式サイトではありません");
    expect(prompt).toContain(
      "所属政党（党派）と議会内の会派、サイト運営者は別"
    );
  });
  it.each(prompts)("会派を公平に扱い、未確認の賛否を補完しない", (prompt) => {
    expect(prompt).toContain("政党・会派を問わず同じ基準");
    expect(prompt).toContain("全会一致や全会派賛成の根拠にしない");
    expect(prompt).not.toContain("チームみらい以外の政党については");
    expect(prompt).not.toContain("2026年プラン");
  });
});
