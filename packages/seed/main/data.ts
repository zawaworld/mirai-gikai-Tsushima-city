// 対馬市のマスターデータ案。出典・調製日は docs/Tsushima の移行設計書を参照。
// 会派は党派とは別。議案・賛否・議員の所属は推測で投入しない。
import type { Database } from "@mirai-gikai/supabase";

type CouncilSessionInsert =
  Database["public"]["Tables"]["council_sessions"]["Insert"];
type FactionInsert = Database["public"]["Tables"]["factions"]["Insert"];
type CommitteeInsert = Database["public"]["Tables"]["committees"]["Insert"];

export const councilSessions: CouncilSessionInsert[] = [
  {
    name: "令和8年 第3回対馬市議会定例会",
    slug: "r8-3",
    council_url:
      "https://www.city.tsushima.nagasaki.jp/gyousei/soshiki/gikaijimukyoku/gikai/oshirase/6880.html",
    start_date: "2026-09-08", // 会期日程（案）。確定日程は要確認
    end_date: "2026-09-25", // 同上
    is_active: false, // 対象会期の確定後、表示方針に従って変更
  },
];

export const factions: FactionInsert[] = [
  { name: "shinseikai", display_name: "新政会", sort_order: 1, is_active: true },
  { name: "mirai-kaikaku", display_name: "未来改革", sort_order: 2, is_active: true },
  { name: "shinyukai", display_name: "新友会", sort_order: 3, is_active: true },
  { name: "taiseikai", display_name: "対政会", sort_order: 4, is_active: true },
  { name: "tsushima-no-kaze", display_name: "対馬の風", sort_order: 5, is_active: true },
  { name: "shimin-kyodo", display_name: "市民協働", sort_order: 6, is_active: true },
  { name: "komei", display_name: "公明", sort_order: 7, is_active: true },
];

export const committees: CommitteeInsert[] = [
  { name: "総務文教厚生委員会", description: null, sort_order: 1, is_active: true },
  { name: "産業建設委員会", description: null, sort_order: 2, is_active: true },
  { name: "議会運営委員会", description: null, sort_order: 3, is_active: true },
  { name: "議会広報編集特別委員会", description: null, sort_order: 4, is_active: true },
  { name: "国境離島活性化推進特別委員会", description: null, sort_order: 5, is_active: true },
  { name: "議会改革特別委員会", description: null, sort_order: 6, is_active: true },
];
