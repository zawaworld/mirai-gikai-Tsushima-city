import "server-only";
import { requireAdmin } from "@/features/auth/server/lib/auth-server";
import { SpeechesManager } from "../../client/components/speeches-manager";
import { findSpeeches } from "../repositories/speech-repository";

export async function BillSpeechesEditor({ billId }: { billId: string }) {
  await requireAdmin();
  try {
    const speeches = await findSpeeches(billId);
    return <SpeechesManager billId={billId} speeches={speeches} />;
  } catch (error) {
    console.error("発言情報を取得できませんでした", error);
    return (
      <section className="rounded-lg border p-6">
        <h2 className="text-xl font-bold">議案に関する発言</h2>
        <p role="alert">
          発言情報を取得できません。データベースの準備・接続を確認してください。
        </p>
      </section>
    );
  }
}
