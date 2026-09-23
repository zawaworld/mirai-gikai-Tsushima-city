import "server-only";
import { speechRecordSchema } from "@mirai-gikai/shared/bill-speeches/schemas";
import { createAdminClient } from "@mirai-gikai/supabase";

export async function findPublicSpeeches(billId: string) {
  const { data, error } = await createAdminClient()
    .from("bill_speeches")
    .select("*, bills!inner(publish_status)")
    .eq("bill_id", billId)
    .eq("is_published", true)
    .eq("bills.publish_status", "published")
    .order("meeting_date")
    .order("sort_order")
    .order("created_at")
    .order("id");
  if (error) throw error;
  return (data ?? []).map((row) => speechRecordSchema.parse(row));
}
