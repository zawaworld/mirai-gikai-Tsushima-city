"use client";
import type { SpeechRecord } from "@mirai-gikai/shared/bill-speeches/schemas";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SpeechForm } from "./speech-form";

export function SpeechesManager({
  billId,
  speeches,
}: {
  billId: string;
  speeches: SpeechRecord[];
}) {
  const [editing, setEditing] = useState<SpeechRecord | "new" | null>(null);
  return (
    <section className="space-y-4 rounded-lg border p-6">
      <h2 className="text-xl font-bold">議案に関する発言</h2>
      <p className="text-sm text-muted-foreground">
        議員の討論や質疑、行政側の答弁を、出典と一緒に登録します。発言と採決の賛否は別の情報です。
      </p>
      {speeches.length === 0 && <p>まだ登録されていません。</p>}
      <ul className="space-y-2">
        {speeches.map((speech) => (
          <li
            key={speech.id}
            className="flex items-center justify-between gap-4 border-b py-3"
          >
            <div>
              <p>
                {speech.meeting_date} · {speech.speaker_name}{" "}
                {speech.speaker_role}
              </p>
              <p className="text-sm text-muted-foreground">
                {speech.meeting_name} ·{" "}
                {speech.is_published ? "公開設定" : "下書き"}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              disabled={editing !== null}
              onClick={() => setEditing(speech)}
            >
              編集
            </Button>
          </li>
        ))}
      </ul>
      {editing === null ? (
        <Button type="button" onClick={() => setEditing("new")}>
          発言を追加
        </Button>
      ) : (
        <SpeechForm
          key={editing === "new" ? "new" : editing.id}
          billId={billId}
          speech={editing === "new" ? undefined : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </section>
  );
}
