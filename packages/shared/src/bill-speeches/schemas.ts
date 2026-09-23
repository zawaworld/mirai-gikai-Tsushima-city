import { z } from "zod";

export const SPEECH_TYPE_LABELS = {
  debate: "討論",
  question: "質疑",
  answer: "答弁",
  explanation: "説明",
} as const;
export const SPEECH_STANCE_LABELS = {
  support: "賛成の意見",
  oppose: "反対の意見",
  unspecified: "賛否の記載なし",
} as const;

const sourceUrlSchema = z.string().trim().max(2000).url("出典URLを入力してください").refine(
  (value) => /^https?:\/\//.test(value),
  "出典にはhttpまたはhttpsのURLを指定してください"
);

export const speechFieldsSchema = z.object({
  speaker_name: z.string().trim().min(1, "発言者名を入力してください").max(100),
  speaker_role: z.string().trim().min(1, "肩書きを入力してください").max(100),
  party_name: z.string().trim().max(100),
  faction_name: z.string().trim().max(100),
  meeting_date: z.iso.date("有効な発言日を入力してください"),
  meeting_name: z.string().trim().min(1, "会議名を入力してください").max(200),
  speech_type: z.enum(["debate", "question", "answer", "explanation"]),
  stance: z.enum(["support", "oppose", "unspecified"]),
  summary: z.string().trim().max(2000),
  content: z.string().trim().min(1, "発言原文を入力してください").max(100000),
  source_title: z.string().trim().min(1, "出典名を入力してください").max(300),
  source_url: sourceUrlSchema,
  source_locator: z.string().trim().max(300),
  sort_order: z.number().int().min(0).max(10000),
  is_published: z.boolean(),
}).refine((value) => value.speech_type === "debate" || value.stance === "unspecified", {
  message: "賛否の意見は討論の場合のみ指定できます",
  path: ["stance"],
});

export const speechSaveSchema = speechFieldsSchema.safeExtend({
  source_confirmed: z.boolean(),
}).refine((value) => !value.is_published || value.source_confirmed, {
  message: "公開する前に発言者・所属・原文・出典を確認してください",
  path: ["source_confirmed"],
});

export const speechRecordSchema = speechFieldsSchema.safeExtend({ id: z.uuid() });
export type SpeechFields = z.infer<typeof speechFieldsSchema>;
export type SpeechSaveInput = z.infer<typeof speechSaveSchema>;
export type SpeechRecord = z.infer<typeof speechRecordSchema>;
