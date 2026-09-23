import "server-only";
import {
  type SpeechFields,
  speechRecordSchema,
} from "@mirai-gikai/shared/bill-speeches/schemas";
import { createAdminClient } from "@mirai-gikai/supabase";

export async function findSpeeches(billId: string) {
  const { data, error } = await createAdminClient()
    .from("bill_speeches")
    .select("*")
    .eq("bill_id", billId)
    .order("meeting_date")
    .order("sort_order")
    .order("created_at")
    .order("id");
  if (error) throw error;
  return (data ?? []).map((row) => speechRecordSchema.parse(row));
}

export async function saveSpeechRecord(
  billId: string,
  id: string | null,
  fields: SpeechFields
) {
  const client = createAdminClient();
  const result = id
    ? await client
        .from("bill_speeches")
        .update(fields)
        .eq("id", id)
        .eq("bill_id", billId)
        .select("id")
        .single()
    : await client
        .from("bill_speeches")
        .insert({ ...fields, bill_id: billId })
        .select("id")
        .single();
  if (result.error) throw result.error;
}
