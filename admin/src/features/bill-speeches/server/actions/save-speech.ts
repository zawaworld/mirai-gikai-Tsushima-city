"use server";
import "server-only";
import {
  type SpeechSaveInput,
  speechSaveSchema,
} from "@mirai-gikai/shared/bill-speeches/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/features/auth/server/lib/auth-server";
import { routes } from "@/lib/routes";
import {
  invalidateWebCache,
  WEB_CACHE_TAGS,
} from "@/lib/utils/cache-invalidation";
import { saveSpeechRecord } from "../repositories/speech-repository";

export async function saveSpeech(
  billId: string,
  id: string | null,
  input: SpeechSaveInput
) {
  try {
    await requireAdmin();
    z.uuid().parse(billId);
    if (id !== null) z.uuid().parse(id);
    const parsed = speechSaveSchema.safeParse(input);
    if (!parsed.success)
      return {
        success: false as const,
        error: parsed.error.issues[0]?.message ?? "入力内容を確認してください",
      };
    const { source_confirmed: _confirmed, ...fields } = parsed.data;
    await saveSpeechRecord(billId, id, fields);
    revalidatePath(routes.billEdit(billId));
    await invalidateWebCache([WEB_CACHE_TAGS.BILLS]);
    return { success: true as const };
  } catch (error) {
    console.error("発言の保存に失敗しました", error);
    return {
      success: false as const,
      error:
        "発言を保存できませんでした。ログイン状態・データベース接続を確認してください。",
    };
  }
}
