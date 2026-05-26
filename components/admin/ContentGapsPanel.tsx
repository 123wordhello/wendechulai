"use client";

import type { ContentGap } from "@/lib/content/stats";
import { GAP_THRESHOLDS } from "@/lib/content/stats";
import { Card } from "@/components/Card";

interface ContentGapsPanelProps {
  gaps: ContentGap[];
}

export function ContentGapsPanel({ gaps }: ContentGapsPanelProps) {
  const priority = gaps.filter(
    (g) => g.kind === "skill-level" || g.kind === "scenario-level",
  );
  const other = gaps.filter(
    (g) => g.kind !== "skill-level" && g.kind !== "scenario-level",
  );

  return (
    <Card className="!p-5">
      <h2 className="text-lg font-semibold text-gray-900">内容缺口提示</h2>
      <p className="mt-1 text-sm text-gray-500">
        能力×难度、场景×难度少于 {GAP_THRESHOLDS.skillLevel} 张，或单维度总数偏低时会提示。
      </p>
      {gaps.length === 0 ? (
        <p className="mt-4 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
          当前各维度覆盖较均衡，暂无缺口提示。
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          {priority.length > 0 && (
            <GapList title="优先补充" items={priority} variant="warn" />
          )}
          {other.length > 0 && (
            <GapList title="整体覆盖" items={other} variant="muted" />
          )}
        </div>
      )}
    </Card>
  );
}

function GapList({
  title,
  items,
  variant,
}: {
  title: string;
  items: ContentGap[];
  variant: "warn" | "muted";
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((g) => (
          <li
            key={g.id}
            className={`text-xs rounded-lg px-2.5 py-1.5 border ${
              variant === "warn"
                ? "bg-amber-50 border-amber-200 text-amber-900"
                : "bg-gray-50 border-gray-200 text-gray-700"
            }`}
            title={`当前 ${g.count} 张，建议至少 ${g.threshold} 张`}
          >
            {g.message}
            <span className="ml-1 opacity-70">({g.count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
