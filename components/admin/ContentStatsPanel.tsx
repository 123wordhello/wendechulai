"use client";

import type { ContentStats } from "@/lib/content/stats";
import { COGNITIVE_LEVEL_SHORT } from "@/types";
import { Card } from "@/components/Card";
import { COGNITIVE_SKILLS, CONTENT_SCENARIOS } from "@/data/taxonomy";
import { COGNITIVE_LEVELS } from "@/lib/constants";

interface ContentStatsPanelProps {
  stats: ContentStats;
  usingCustomStorage: boolean;
}

export function ContentStatsPanel({
  stats,
  usingCustomStorage,
}: ContentStatsPanelProps) {
  return (
    <Card className="!p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-gray-900">内容统计</h2>
        <span className="text-xs text-gray-500">
          {usingCustomStorage ? "当前：本地已保存库" : "当前：内置样板库（未写入 localStorage）"}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatBox label="总卡片" value={stats.total} />
        <StatBox label="质检通过" value={stats.validCount} accent="emerald" />
        <StatBox label="待修正" value={stats.invalidCount} accent="amber" />
        <StatBox label="能力维度" value={COGNITIVE_SKILLS.length} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <MiniBarChart title="按认知能力（卡片次）" items={COGNITIVE_SKILLS.map((s) => ({
          label: s,
          count: stats.bySkill[s],
        }))} />
        <MiniBarChart title="按场景（卡片次）" items={CONTENT_SCENARIOS.map((s) => ({
          label: s,
          count: stats.byScenario[s],
        }))} />
        <MiniBarChart
          title="按难度"
          items={COGNITIVE_LEVELS.map((l) => ({
            label: `L${l}`,
            count: stats.byLevel[l],
            hint: COGNITIVE_LEVEL_SHORT[l],
          }))}
        />
      </div>
    </Card>
  );
}

function StatBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "emerald" | "amber";
}) {
  const color =
    accent === "emerald"
      ? "text-emerald-700"
      : accent === "amber"
        ? "text-amber-700"
        : "text-brand-700";
  return (
    <div className="rounded-xl bg-surface-warm px-3 py-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function MiniBarChart({
  title,
  items,
}: {
  title: string;
  items: { label: string; count: number; hint?: string }[];
}) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      <ul className="space-y-1.5 max-h-48 overflow-y-auto text-xs">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span className="w-20 shrink-0 truncate text-gray-600" title={item.label}>
              {item.label}
            </span>
            <div className="flex-1 h-2 rounded-full bg-brand-100 overflow-hidden">
              <div
                className="h-full bg-brand-500 rounded-full"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
            <span className="w-6 text-right text-gray-700">{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
