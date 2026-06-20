import { formatDistanceToNow } from "date-fns";
import FloatingLabelInput from "./elements/FloatingLabelInput";

export default function IndividualResponseCard({
  response,
  index,
}: {
  response: {
    respondent: {
      fullName: string;
    };
    submittedAt: string;
    answers: Record<string, string | number | boolean>;
  } | null;
  index: number;
}) {
  if (!response) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 space-y-5">
      <h4 className="text-2xl font-semibold mb-1 text-gray-800">
        {response.respondent.fullName}
      </h4>
      <p className="text-xs text-gray-500">
        Submitted {formatDistanceToNow(new Date(response.submittedAt))} ago
      </p>
      <div className="flex justify-between items-center border-b border-slate-200 pb-4 pt-1 mb-6">
        <span className="font-bold text-black">Response #{index + 1}</span>
        <span className="text-xs text-gray-400">
          {new Date(response?.submittedAt).toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <div className="space-y-6">
        {Object.entries(response.answers).map(([q, a]) => (
          <div key={q}>
            {/* <p className="text-sm font-medium text-gray-700">{q}</p> */}
            {/* <div className="bg-gray-50 border rounded-lg px-4 py-2 text-sm">
              {typeof a === "boolean" ? (a ? "Yes" : "No") : a}
            </div> */}

            <FloatingLabelInput
              id="question"
              name="question"
              label={q}
              type="text"
              value={
                typeof a === "boolean"
                  ? a
                    ? "Yes"
                    : "No"
                  : (a as string | number)
              }
              autoComplete="question"
              onChange={() => {}}
              readOnly
            />
          </div>
        ))}
      </div>
    </div>
  );
}
