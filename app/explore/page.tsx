"use client";

import { useMemo, useState } from "react";
import { useUnderstandingCards } from "@/hooks/useUnderstandingCards";
import { COGNITIVE_SKILLS, CONTENT_SCENARIOS } from "@/data/taxonomy";
import { COGNITIVE_LEVELS } from "@/lib/constants";
import { filterCards, type CardFilters } from "@/lib/filters";
import { COGNITIVE_LEVEL_SHORT } from "@/types";
import type { CognitiveLevel } from "@/types";
import { CardPreview } from "@/components/CardPreview";

const inputClass =
  "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function ExplorePage() {
  const { cards, ready } = useUnderstandingCards();
  const [skill, setSkill] = useState<CardFilters["skill"]>("");
  const [scenario, setScenario] = useState<CardFilters["scenario"]>("");
  const [level, setLevel] = useState<CardFilters["level"]>("");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      filterCards(cards, {
        skill: skill || undefined,
        scenario: scenario || undefined,
        level: level || undefined,
        query,
      }),
    [cards, skill, scenario, level, query],
  );

  if (!ready) {
    return <p className="text-center text-gray-500 py-12">加载中…</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">探索训练内容</h1>
        <p className="mt-2 text-gray-600 leading-relaxed">
          按认知能力、生活场景或难度筛选。当前共 {cards.length}{" "}
          张样板卡，内容体系可持续扩展。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            认知能力
          </label>
          <select
            className={inputClass}
            value={skill}
            onChange={(e) => setSkill(e.target.value as CardFilters["skill"])}
          >
            <option value="">全部</option>
            {COGNITIVE_SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            场景
          </label>
          <select
            className={inputClass}
            value={scenario}
            onChange={(e) =>
              setScenario(e.target.value as CardFilters["scenario"])
            }
          >
            <option value="">全部</option>
            {CONTENT_SCENARIOS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            难度
          </label>
          <select
            className={inputClass}
            value={level === "" ? "" : String(level)}
            onChange={(e) => {
              const v = e.target.value;
              setLevel(v ? (Number(v) as CognitiveLevel) : "");
            }}
          >
            <option value="">全部</option>
            {COGNITIVE_LEVELS.map((l) => (
              <option key={l} value={l}>
                L{l} · {COGNITIVE_LEVEL_SHORT[l]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            搜索
          </label>
          <input
            className={inputClass}
            placeholder="标题、目标…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <p className="text-sm text-gray-500">
        显示 {filtered.length} / {cards.length} 张
      </p>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 py-12">没有匹配的卡片，试试调整筛选。</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((card) => (
            <CardPreview key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}
