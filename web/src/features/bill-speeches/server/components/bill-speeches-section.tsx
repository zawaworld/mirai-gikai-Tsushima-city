import "server-only";
import { SpeechesSection } from "../../shared/components/speeches-section";
import { findPublicSpeeches } from "../repositories/speech-repository";

export async function BillSpeechesSection({ billId }: { billId: string }) {
  try {
    const speeches = await findPublicSpeeches(billId);
    return <SpeechesSection speeches={speeches} />;
  } catch (error) {
    console.error("議案の発言を取得できませんでした", error);
    return <SpeechesSection speeches={[]} unavailable />;
  }
}
