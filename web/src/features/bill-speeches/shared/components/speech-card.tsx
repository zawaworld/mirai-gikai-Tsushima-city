import {
  SPEECH_STANCE_LABELS,
  SPEECH_TYPE_LABELS,
  type SpeechRecord,
} from "@mirai-gikai/shared/bill-speeches/schemas";

export function SpeechCard({ speech }: { speech: SpeechRecord }) {
  return (
    <article className="space-y-3 border-t border-border pt-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-muted px-3 py-1 text-sm">
          {SPEECH_TYPE_LABELS[speech.speech_type]}
        </span>
        {speech.speech_type === "debate" && (
          <span className="text-sm font-medium">
            {SPEECH_STANCE_LABELS[speech.stance]}
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold">
        {speech.speaker_name}{" "}
        <span className="font-normal">{speech.speaker_role}</span>
      </h3>
      <dl className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-mirai-text-secondary">
        {speech.party_name && (
          <div className="flex gap-1">
            <dt>党派：</dt>
            <dd>{speech.party_name}</dd>
          </div>
        )}
        {speech.faction_name && (
          <div className="flex gap-1">
            <dt>会派：</dt>
            <dd>{speech.faction_name}</dd>
          </div>
        )}
      </dl>
      <p className="text-sm text-mirai-text-secondary">
        <time dateTime={speech.meeting_date}>{speech.meeting_date}</time> ·{" "}
        {speech.meeting_name}（肩書き・所属は発言時点）
      </p>
      {speech.summary && (
        <div className="space-y-1">
          <h4 className="font-medium">発言の要約</h4>
          <p className="whitespace-pre-wrap break-words">{speech.summary}</p>
        </div>
      )}
      <details className="rounded-lg bg-muted p-4">
        <summary className="cursor-pointer font-medium">
          発言の原文を読む
        </summary>
        <blockquote className="mt-3 whitespace-pre-wrap break-words leading-relaxed">
          {speech.content}
        </blockquote>
      </details>
      <p className="text-sm">
        出典：
        <a
          href={speech.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          {speech.source_title}
        </a>
        {speech.source_locator && <span>（{speech.source_locator}）</span>}
      </p>
    </article>
  );
}
