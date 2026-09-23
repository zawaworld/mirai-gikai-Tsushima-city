import { notFound } from "next/navigation";
import { SpeechesPreview } from "@/features/bill-speeches/shared/components/speeches-preview";

export default function SpeechesPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <SpeechesPreview />;
}
