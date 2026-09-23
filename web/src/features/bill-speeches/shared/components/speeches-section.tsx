import type { SpeechRecord } from "@mirai-gikai/shared/bill-speeches/schemas";
import { SpeechCard } from "./speech-card";

export function SpeechesSection({
  speeches,
  unavailable = false,
}: {
  speeches: SpeechRecord[];
  unavailable?: boolean;
}) {
  const published = speeches.filter((speech) => speech.is_published);
  return (
    <section
      aria-label="議案に関する発言"
      className="space-y-5 rounded-xl border border-border bg-background p-5 md:p-7"
    >
      <h2 className="text-xl font-bold">議案に関する発言</h2>
      <p className="text-sm text-mirai-text-secondary">
        発言者が述べた意見と、採決での賛否は別の情報です。出典の会議録もあわせてご確認ください。
      </p>
      {unavailable ? (
        <p>発言情報を読み込めませんでした。時間をおいてご確認ください。</p>
      ) : published.length === 0 ? (
        <p>
          この議案の発言はまだ掲載していません。発言がなかったことを意味するものではありません。
        </p>
      ) : (
        <>
          <p className="text-sm">掲載した発言：{published.length}件</p>
          <div className="space-y-5">
            {published.map((speech) => (
              <SpeechCard key={speech.id} speech={speech} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
