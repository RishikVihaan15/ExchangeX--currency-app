import { FiArrowRight } from "react-icons/fi";
import { formatCurrencyValue, formatNumber } from "../utils/formatNumber.js";
function exportToCSV(rows) {
  if (!rows.length) return;

  const headers = ["Time", "Amount", "From", "To", "Result", "Rate"];

  const csvRows = rows.map((row) => [
    new Date(row.createdAt).toLocaleString(),
    row.amount,
    row.from,
    row.to,
    row.result,
    row.rate,
  ]);

  const csvContent = [headers, ...csvRows]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "conversion-history.csv";
  link.click();

  URL.revokeObjectURL(url);
}

export default function HistoryTable({ rows }) {
  if (!rows.length) {
    return (
      <div className="panel text-sm text-slate-500 dark:text-slate-400">
        No conversions yet. Head to the{" "}
        <span className="font-semibold text-ocean">Converter</span> to get
        started.
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => exportToCSV(rows)}
          disabled={!rows.length}
          className="rounded-lg bg-ocean px-4 py-2 text-white font-semibold hover:opacity-90 disabled:opacity-50"
        >
          Export CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-card backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Pair</th>
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Rate</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/60">
              {rows.map((row, i) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-ocean/5 dark:hover:bg-ocean/10"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <td className="px-4 py-3 text-slate-400 dark:text-slate-500 text-xs">
                    {new Date(row.createdAt).toLocaleString()}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    {formatNumber(row.amount)}
                    <span className="text-slate-400"> {row.from}</span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-ocean/10 px-2 py-0.5 text-xs font-bold text-ocean dark:bg-ocean/20 dark:text-cyan-400">
                      {row.from}
                      <FiArrowRight size={10} />
                      {row.to}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-extrabold text-ocean dark:text-cyan-400 tabular-nums">
                    {formatCurrencyValue(row.result)}
                    <span className="text-xs font-semibold text-slate-400">
                      {" "}
                      {row.to}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-500 tabular-nums">
                    {formatCurrencyValue(row.rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
