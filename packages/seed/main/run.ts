import { councilSessions, factions, committees } from "./data";
import { createAdminClient } from "../shared/helper";

// マスターのみ追加する。既存データの削除・上書きや架空の議案の投入はしない。
// 同時実行は避け、会期日程・会派の現況を確認してから実行する。
async function seedDatabase() {
  const supabase = createAdminClient();

  for (const session of councilSessions) {
    const { data, error } = await supabase
      .from("council_sessions")
      .select("id")
      .eq("name", session.name)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      const { error } = await supabase.from("council_sessions").insert(session);
      if (error) throw error;
    }
  }

  for (const faction of factions) {
    const { data, error } = await supabase
      .from("factions")
      .select("id")
      .eq("name", faction.name)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      const { error } = await supabase.from("factions").insert(faction);
      if (error) throw error;
    }
  }

  for (const committee of committees) {
    const { data, error } = await supabase
      .from("committees")
      .select("id")
      .eq("name", committee.name)
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      const { error } = await supabase.from("committees").insert(committee);
      if (error) throw error;
    }
  }

  console.log("対馬市の会期・会派・委員会マスターを登録しました（既存行は保持）。");
  console.log("議案・議決結果は公式資料を確認して管理画面から登録してください。");
}

seedDatabase().catch((error) => {
  console.error("対馬市マスターの登録に失敗しました:", error);
  process.exitCode = 1;
});
