import { Check, X } from "lucide-react";

import { PRICING_COMPARISON } from "@/lib/comparison";
import type { PlanId } from "@/lib/plans";

const COLUMNS: { id: PlanId; label: string }[] = [
  { id: "free", label: "Free" },
  { id: "pro", label: "Pro" },
  { id: "business", label: "Business" },
  { id: "enterprise", label: "Enterprise" },
];

export function PricingComparison() {
  return (
    <section className="relative pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <div className="eyebrow">
            <span>comparativo completo</span>
          </div>
          <h2 className="h-section text-[clamp(28px,3.5vw,40px)] mt-4">
            Tudo o que vai em <span className="tic">cada plano.</span>
          </h2>
        </div>
        <div className="card-surface overflow-x-auto">
          <table className="pricing-table min-w-[820px]">
            <thead>
              <tr>
                <th>Recurso</th>
                {COLUMNS.map((col) => (
                  <th
                    key={col.id}
                    className="col-klimar text-center"
                    style={{ background: "rgba(0,184,212,0.06)", color: "#00B8D4" }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRICING_COMPARISON.map((category) => (
                <CategoryBlock key={category.label} category={category} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CategoryBlock({
  category,
}: {
  category: (typeof PRICING_COMPARISON)[number];
}) {
  return (
    <>
      <tr className="cat-row">
        <td colSpan={5}>{category.label}</td>
      </tr>
      {category.rows.map((row) => (
        <tr key={row.label}>
          <th className="text-left text-[14px] text-slate-200 font-normal">{row.label}</th>
          {COLUMNS.map((col) => {
            const cell = row.cells[col.id];
            return (
              <td key={col.id} className="text-center">
                {cell.type === "check" && (
                  <Check className="w-4 h-4 text-[#00B8D4] inline-block" />
                )}
                {cell.type === "cross" && (
                  <X className="w-4 h-4 text-slate-600 inline-block" />
                )}
                {cell.type === "text" && (
                  <span className="text-slate-300">{cell.value}</span>
                )}
                {cell.type === "highlight" && (
                  <span className="font-semibold text-[#00B8D4]">{cell.value}</span>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
