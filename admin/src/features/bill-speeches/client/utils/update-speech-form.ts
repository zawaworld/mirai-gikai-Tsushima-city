import type { SpeechSaveInput } from "@mirai-gikai/shared/bill-speeches/schemas";

/** 内容を変えたら出典確認をやり直し、質疑・答弁の賛否は保持しない。 */
export function updateSpeechForm<K extends keyof SpeechSaveInput>(
  current: SpeechSaveInput,
  key: K,
  value: SpeechSaveInput[K]
): SpeechSaveInput {
  const next = { ...current, [key]: value };
  if (key !== "source_confirmed") next.source_confirmed = false;
  if (next.speech_type !== "debate") next.stance = "unspecified";
  return next;
}
