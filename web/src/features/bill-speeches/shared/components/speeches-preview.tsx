import type { SpeechRecord } from "@mirai-gikai/shared/bill-speeches/schemas";
import { SpeechesSection } from "./speeches-section";

const example: SpeechRecord = {
  id: "11111111-1111-4111-8111-111111111111",
  speaker_name: "見本の議員A",
  speaker_role: "議員",
  party_name: "見本の党派",
  faction_name: "見本の会派",
  meeting_date: "2026-09-01",
  meeting_name: "表示確認用の架空の会議",
  speech_type: "debate",
  stance: "support",
  summary: "この欄に発言の要約が入ります。実際の発言ではありません。",
  content:
    "これは表示確認用の見本文です。\n実際には、公式の会議録で確認した発言原文を掲載します。",
  source_title: "対馬市議会公式サイト（見本のリンク）",
  source_url:
    "https://www.city.tsushima.nagasaki.jp/gyousei/soshiki/gikaijimukyoku/gikai/index.html",
  source_locator: "実際の発言の出典ではありません",
  sort_order: 0,
  is_published: true,
};

export function SpeechesPreview() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 pt-12 md:pt-0">
      <h1 className="text-2xl font-bold">議員の発言表示の見本</h1>
      <p className="rounded-lg border border-border bg-muted p-4">
        このページの議員名・党派・発言はすべて架空の見本です。実際の対馬市議会の発言ではありません。
      </p>
      <SpeechesSection speeches={[example]} />
      <SpeechesSection speeches={[]} />
    </main>
  );
}
