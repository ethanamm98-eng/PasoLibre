import { useMemo, useState } from "react";
import { LuSheet } from "react-icons/lu";

interface Response {
  formId: string;
  submittedAt?: string;
  answers?: Record<string, string | string[]>;
}

export default function QuestionsTab({ responses }: { responses: Response[] }) {
  const bienestarResponses = (responses || []).filter(
    (r) => r.formId === "bienestar"
  );

  const [page, setPage] = useState(0);

  /* =======================
     Collect unique questions
  ======================= */
  const questions = useMemo(() => {
    const set = new Set<string>();
    bienestarResponses.forEach((r) => {
      Object.keys(r.answers || {}).forEach((key) => set.add(key));
    });
    return Array.from(set);
  }, [bienestarResponses]);

  const currentQuestion = questions[page];

  /* =======================
     Aggregate answers
  ======================= */
  const answerData = useMemo(() => {
    const counts: Record<string, number> = {};

    bienestarResponses.forEach((r) => {
      const value = r.answers?.[currentQuestion];

      if (Array.isArray(value)) {
        value.forEach((v) => {
          counts[v] = (counts[v] || 0) + 1;
        });
      } else if (value) {
        counts[value] = (counts[value] || 0) + 1;
      }
    });

    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    return {
      total,
      rows: Object.entries(counts)
        .map(([label, count]) => ({
          label,
          count,
          percent: total ? Math.round((count / total) * 100) : 0,
        }))
        .sort((a, b) => b.count - a.count),
    };
  }, [bienestarResponses, currentQuestion]);

  /* =======================
     View in Sheets (CSV)
  ======================= */
  const viewInSheets = () => {
    if (!bienestarResponses.length) return;

    // Build header row
    const headers = ["Submitted At", ...questions];

    // Build rows
    const rows = bienestarResponses.map((r) => {
      return [
        r.submittedAt || "",
        ...questions.map((q) => {
          const value = r.answers?.[q];
          if (Array.isArray(value)) return value.join(", ");
          return value ?? "";
        }),
      ];
    });

    // CSV string
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    // Download
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "form-responses.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (!questions.length) {
    return (
      <p className="text-center text-gray-500 py-10">
        No question data available yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {currentQuestion}
            </h3>
            <p className="text-sm text-gray-500">
              {answerData.total} responses
            </p>
          </div>

          <button
            type="button"
            onClick={viewInSheets}
            className="px-3 py-1.5 text-xs rounded-md border border-slate-200 hover:bg-slate-50 hover:text-green-600 transition cursor-pointer"
          >
            <span>
              <LuSheet className="inline mr-2" />
            </span>
            View in Sheets
          </button>
        </div>

        {/* Answers */}
        <div className="space-y-4">
          {answerData.rows.map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700">{row.label}</span>
                <span className="text-gray-500">
                  {row.count} ({row.percent}%)
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${row.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition"
        >
          Previous
        </button>

        <span className="text-sm text-gray-500">
          Question {page + 1} of {questions.length}
        </span>

        <button
          type="button"
          disabled={page === questions.length - 1}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
