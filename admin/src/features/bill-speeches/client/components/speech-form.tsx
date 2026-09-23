"use client";
import {
  SPEECH_STANCE_LABELS,
  SPEECH_TYPE_LABELS,
  type SpeechRecord,
  type SpeechSaveInput,
} from "@mirai-gikai/shared/bill-speeches/schemas";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveSpeech } from "../../server/actions/save-speech";
import { updateSpeechForm } from "../utils/update-speech-form";

const emptySpeech: SpeechSaveInput = {
  speaker_name: "",
  speaker_role: "議員",
  party_name: "",
  faction_name: "",
  meeting_date: "",
  meeting_name: "",
  speech_type: "debate",
  stance: "unspecified",
  summary: "",
  content: "",
  source_title: "",
  source_url: "",
  source_locator: "",
  sort_order: 0,
  is_published: false,
  source_confirmed: false,
};

export function SpeechForm({
  billId,
  speech,
  onClose,
}: {
  billId: string;
  speech?: SpeechRecord;
  onClose: () => void;
}) {
  const [form, setForm] = useState<SpeechSaveInput>({
    ...emptySpeech,
    ...speech,
    source_confirmed: false,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const prefix = useId();
  const router = useRouter();
  const textFields = [
    ["speaker_name", "発言者名", "text"],
    ["speaker_role", "発言時の肩書き", "text"],
    ["party_name", "発言時の党派（任意）", "text"],
    ["faction_name", "発言時の会派（任意）", "text"],
    ["meeting_date", "発言日", "date"],
    ["meeting_name", "会議名", "text"],
    ["source_title", "出典名", "text"],
    ["source_url", "公式会議録などの出典URL", "url"],
    ["source_locator", "出典のページ・発言番号など（任意）", "text"],
  ] as const;
  function change<K extends keyof SpeechSaveInput>(
    key: K,
    value: SpeechSaveInput[K]
  ) {
    setForm((current) => updateSpeechForm(current, key, value));
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await saveSpeech(billId, speech?.id ?? null, form);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.refresh();
      onClose();
    } catch {
      setError(
        "通信できませんでした。入力内容は保持されています。再度お試しください。"
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="space-y-4 rounded-lg border p-4">
      <fieldset disabled={busy} className="space-y-4">
        <legend className="text-lg font-bold">
          {speech ? "発言を編集" : "発言を追加"}
        </legend>
        <p className="text-sm text-muted-foreground">
          肩書き・党派・会派は発言当時のものを記録します。原文は会議録と照合してください。
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {textFields.map(([key, label, type]) => (
            <div key={key} className="space-y-1">
              <label htmlFor={`${prefix}-${key}`}>{label}</label>
              <Input
                id={`${prefix}-${key}`}
                type={type}
                value={form[key]}
                onChange={(event) => change(key, event.target.value)}
                required={
                  !["party_name", "faction_name", "source_locator"].includes(
                    key
                  )
                }
              />
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <label htmlFor={`${prefix}-type`}>発言の種類</label>
          <select
            id={`${prefix}-type`}
            className="w-full rounded-md border p-2"
            value={form.speech_type}
            onChange={(event) => {
              const speechType = event.target
                .value as SpeechSaveInput["speech_type"];
              change("speech_type", speechType);
            }}
          >
            {Object.entries(SPEECH_TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        {form.speech_type === "debate" && (
          <div className="space-y-1">
            <label htmlFor={`${prefix}-stance`}>
              討論で述べた意見（採決の賛否とは別）
            </label>
            <select
              id={`${prefix}-stance`}
              className="w-full rounded-md border p-2"
              value={form.stance}
              onChange={(event) =>
                change(
                  "stance",
                  event.target.value as SpeechSaveInput["stance"]
                )
              }
            >
              {Object.entries(SPEECH_STANCE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="space-y-1">
          <label htmlFor={`${prefix}-summary`}>
            要約（任意・原文とは別に表示）
          </label>
          <Textarea
            id={`${prefix}-summary`}
            value={form.summary}
            maxLength={2000}
            onChange={(event) => change("summary", event.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor={`${prefix}-content`}>発言原文</label>
          <Textarea
            id={`${prefix}-content`}
            value={form.content}
            rows={10}
            required
            maxLength={100000}
            onChange={(event) => change("content", event.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label htmlFor={`${prefix}-order`}>同じ日の表示順</label>
          <Input
            id={`${prefix}-order`}
            type="number"
            min={0}
            max={10000}
            value={form.sort_order}
            onChange={(event) =>
              change("sort_order", Number(event.target.value))
            }
          />
        </div>
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(event) => change("is_published", event.target.checked)}
          />
          公開する（議案自体が公開されている場合のみ表示）
        </label>
        <label className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={form.source_confirmed}
            onChange={(event) =>
              change("source_confirmed", event.target.checked)
            }
          />
          発言者・当時の所属・原文・要約・出典を確認しました
        </label>
        <p className="text-sm text-muted-foreground">
          公開を取り消すには「公開する」を外して保存してください。内容を変更した場合は確認チェックを入れ直してください。
        </p>
        {error && (
          <p role="alert" className="text-destructive">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <Button type="submit">{busy ? "保存中…" : "保存"}</Button>
          <Button type="button" variant="outline" onClick={onClose}>
            キャンセル
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
