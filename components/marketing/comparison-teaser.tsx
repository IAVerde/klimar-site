import { AlertTriangle, Check, X } from "lucide-react";

import { HOME_COMPARISON, type CompetitorId } from "@/lib/comparison";

const COMPETITORS: { id: CompetitorId; label: string }[] = [
  { id: "klimar", label: "klimar" },
  { id: "auvo", label: "auvo" },
  { id: "field-control", label: "field control" },
  { id: "excel", label: "excel" },
];

export function ComparisonTeaser() {
  return (
    <section className="section-pad relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow">
            <span>klimar vs concorrência</span>
          </div>
          <h2 className="h-section text-[clamp(32px,4vw,52px)] mt-5">
            O Excel funciona <span className="tic">— até parar de funcionar.</span>
          </h2>
        </div>
        <div className="card-surface p-2 sm:p-4 overflow-x-auto">
          <table
            className="w-full min-w-[640px]"
            style={{ borderCollapse: "separate", borderSpacing: 0 }}
          >
            <thead>
              <tr>
                <th className="text-left p-4 font-mono text-[10px] tracking-[0.16em] uppercase text-slate-500 font-semibold">
                  recurso
                </th>
                {COMPETITORS.map((c) => (
                  <th
                    key={c.id}
                    className={
                      c.id === "klimar"
                        ? "p-4 font-mono text-[11px] tracking-[0.16em] uppercase font-semibold text-[#00B8D4] text-center"
                        : "p-4 font-mono text-[10px] tracking-[0.16em] uppercase text-slate-500 font-semibold text-center"
                    }
                    style={
                      c.id === "klimar"
                        ? { background: "rgba(0,184,212,0.06)", borderRadius: "8px 8px 0 0" }
                        : undefined
                    }
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[14px]">
              {HOME_COMPARISON.map((row, idx) => (
                <tr key={row.label} className="border-t border-slate-800">
                  <td className="p-4 text-slate-200">{row.label}</td>
                  {COMPETITORS.map((c) => {
                    const cell = row.cells[c.id];
                    const isLast = idx === HOME_COMPARISON.length - 1;
                    return (
                      <td
                        key={c.id}
                        className="p-4 text-center"
                        style={
                          c.id === "klimar"
                            ? {
                                background: "rgba(0,184,212,0.04)",
                                ...(isLast ? { borderRadius: "0 0 8px 8px" } : {}),
                              }
                            : undefined
                        }
                      >
                        {renderCell(cell, c.id === "klimar")}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-500 mt-5">
          * até começar a perder atendimentos
        </p>
      </div>
    </section>
  );
}

function renderCell(
  cell: { type: string; value?: string; badge?: string },
  isKlimar: boolean,
) {
  switch (cell.type) {
    case "check":
      return (
        <span className="inline-flex items-center gap-1.5">
          <Check className="w-5 h-5 text-[#00B8D4] inline-block" />
          {cell.badge && (
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-slate-400">
              {cell.badge}
            </span>
          )}
        </span>
      );
    case "cross":
      return <X className="w-5 h-5 text-slate-600 inline-block" />;
    case "warn":
      return <AlertTriangle className="w-5 h-5 inline-block tick-warn" />;
    case "highlight":
      return (
        <span
          className="font-semibold text-[#00B8D4]"
          dangerouslySetInnerHTML={{
            __html: (cell.value ?? "").replace(/\/mês/, '<span class="text-slate-400 font-normal text-[12px]">/mês</span>'),
          }}
        />
      );
    case "text":
      return <span className={isKlimar ? "text-[#00B8D4]" : "text-slate-400"}>{cell.value}</span>;
    case "dash":
      return <span className="text-slate-500">—</span>;
    default:
      return null;
  }
}
