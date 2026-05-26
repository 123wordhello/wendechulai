"use client";

import { useState } from "react";
import type { CardStep, ContentScenario, CognitiveSkill, UnderstandingCard } from "@/types";
import { COGNITIVE_SKILLS, CONTENT_SCENARIOS } from "@/data/taxonomy";
import { COGNITIVE_LEVELS } from "@/lib/constants";
import { COGNITIVE_LEVEL_SHORT } from "@/types";
import { validateCard } from "@/lib/content/validation";
import { createEmptyStep } from "@/lib/content/card-template";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

const inputClass =
  "w-full rounded-xl border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const textareaClass = `${inputClass} min-h-[72px] resize-y`;

interface CardEditorFormProps {
  card: UnderstandingCard;
  isNew: boolean;
  existingIds: string[];
  onSave: (card: UnderstandingCard) => void;
  onCancel: () => void;
  onPreview: (card: UnderstandingCard) => void;
}

export function CardEditorForm({
  card: initial,
  isNew,
  existingIds,
  onSave,
  onCancel,
  onPreview,
}: CardEditorFormProps) {
  const [card, setCard] = useState<UnderstandingCard>(initial);

  const update = <K extends keyof UnderstandingCard>(
    key: K,
    value: UnderstandingCard[K],
  ) => setCard((c) => ({ ...c, [key]: value }));

  const toggleScenario = (s: ContentScenario) => {
    setCard((c) => ({
      ...c,
      scenarios: c.scenarios.includes(s)
        ? c.scenarios.filter((x) => x !== s)
        : [...c.scenarios, s],
    }));
  };

  const toggleSkill = (s: CognitiveSkill) => {
    setCard((c) => ({
      ...c,
      targetSkills: c.targetSkills.includes(s)
        ? c.targetSkills.filter((x) => x !== s)
        : [...c.targetSkills, s],
    }));
  };

  const updateStep = (i: number, patch: Partial<CardStep>) => {
    setCard((c) => ({
      ...c,
      steps: c.steps.map((st, j) => (j === i ? { ...st, ...patch } : st)),
    }));
  };

  const updateOption = (si: number, oi: number, value: string) => {
    setCard((c) => ({
      ...c,
      steps: c.steps.map((st, j) =>
        j === si
          ? { ...st, options: st.options.map((o, k) => (k === oi ? value : o)) }
          : st,
      ),
    }));
  };

  const addStep = () =>
    setCard((c) => ({ ...c, steps: [...c.steps, createEmptyStep()] }));

  const removeStep = (i: number) => {
    if (card.steps.length <= 1) return;
    setCard((c) => ({ ...c, steps: c.steps.filter((_, j) => j !== i) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dup =
      isNew && existingIds.includes(card.id.trim());
    const result = validateCard(card);
    if (dup) {
      alert("该 ID 已存在，请更换。");
      return;
    }
    if (!result.valid) {
      alert(
        "质检未通过：\n" + result.errors.map((x) => `· ${x.message}`).join("\n"),
      );
      return;
    }
    onSave({
      ...card,
      id: card.id.trim(),
      steps: card.steps.map((st) => ({
        ...st,
        options: st.options.map((o) => o.trim()),
      })),
    });
  };

  const liveValidation = validateCard(card);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!liveValidation.valid && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm">
          <p className="font-medium text-amber-900">质检待修正</p>
          <ul className="mt-1 list-disc list-inside text-amber-800">
            {liveValidation.errors.map((e, i) => (
              <li key={i}>{e.message}</li>
            ))}
          </ul>
        </div>
      )}

      <Card className="!p-4 space-y-3">
        <h3 className="font-semibold text-gray-900">基本信息</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>ID</label>
            <input
              className={inputClass}
              value={card.id}
              onChange={(e) => update("id", e.target.value)}
              disabled={!isNew}
            />
          </div>
          <div>
            <label className={labelClass}>标题 title</label>
            <input
              className={inputClass}
              value={card.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>难度 level</label>
            <select
              className={inputClass}
              value={card.level}
              onChange={(e) =>
                update("level", Number(e.target.value) as UnderstandingCard["level"])
              }
            >
              {COGNITIVE_LEVELS.map((l) => (
                <option key={l} value={l}>
                  L{l} · {COGNITIVE_LEVEL_SHORT[l]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>原始材料 originalText</label>
          <textarea
            className={textareaClass}
            value={card.originalText}
            onChange={(e) => update("originalText", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>场景 scenarios</label>
          <div className="flex flex-wrap gap-2">
            {CONTENT_SCENARIOS.map((s) => (
              <label
                key={s}
                className={`text-xs rounded-lg border px-2 py-1 cursor-pointer ${
                  card.scenarios.includes(s)
                    ? "border-brand-400 bg-brand-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={card.scenarios.includes(s)}
                  onChange={() => toggleScenario(s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass}>能力 targetSkills</label>
          <div className="flex flex-wrap gap-2">
            {COGNITIVE_SKILLS.map((s) => (
              <label
                key={s}
                className={`text-xs rounded-lg border px-2 py-1 cursor-pointer ${
                  card.targetSkills.includes(s)
                    ? "border-brand-400 bg-brand-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={card.targetSkills.includes(s)}
                  onChange={() => toggleSkill(s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass}>认知目标 cognitiveGoal</label>
          <input
            className={inputClass}
            value={card.cognitiveGoal}
            onChange={(e) => update("cognitiveGoal", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>常见误解 commonMisunderstanding</label>
          <textarea
            className={textareaClass}
            value={card.commonMisunderstanding}
            onChange={(e) => update("commonMisunderstanding", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>场景故事 contextStory</label>
          <textarea
            className={textareaClass}
            value={card.contextStory}
            onChange={(e) => update("contextStory", e.target.value)}
          />
        </div>
      </Card>

      <Card className="!p-4 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-900">
            互动步骤 steps（至少 3 个）
          </h3>
          <button
            type="button"
            className="text-sm text-brand-600"
            onClick={addStep}
          >
            + 添加步骤
          </button>
        </div>
        {card.steps.map((st, si) => (
          <div
            key={si}
            className="rounded-lg border border-gray-100 bg-surface-warm p-3 space-y-2"
          >
            <div className="flex justify-between">
              <span className="text-xs font-medium text-gray-600">
                第 {si + 1} 步
              </span>
              {card.steps.length > 1 && (
                <button
                  type="button"
                  className="text-xs text-red-600"
                  onClick={() => removeStep(si)}
                >
                  删除
                </button>
              )}
            </div>
            <input
              className={inputClass}
              placeholder="题干"
              value={st.question}
              onChange={(e) => updateStep(si, { question: e.target.value })}
            />
            {st.options.map((opt, oi) => (
              <input
                key={oi}
                className={inputClass}
                placeholder={`选项 ${String.fromCharCode(65 + oi)}`}
                value={opt}
                onChange={(e) => updateOption(si, oi, e.target.value)}
              />
            ))}
            <select
              className={inputClass}
              value={st.correctAnswer}
              onChange={(e) =>
                updateStep(si, { correctAnswer: Number(e.target.value) })
              }
            >
              {st.options.map((opt, oi) => (
                <option key={oi} value={oi}>
                  正确：{String.fromCharCode(65 + oi)}. {opt || "(空)"}
                </option>
              ))}
            </select>
            <textarea
              className={textareaClass}
              placeholder="解释 explanation"
              value={st.explanation}
              onChange={(e) => updateStep(si, { explanation: e.target.value })}
            />
          </div>
        ))}
      </Card>

      <Card className="!p-4 space-y-3">
        <h3 className="font-semibold text-gray-900">反思 · 提问 · 总结</h3>
        <div>
          <label className={labelClass}>反思 reflectionQuestion</label>
          <textarea
            className={textareaClass}
            value={card.reflectionQuestion}
            onChange={(e) => update("reflectionQuestion", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>迁移 transferTask</label>
          <textarea
            className={textareaClass}
            value={card.transferTask}
            onChange={(e) => update("transferTask", e.target.value)}
          />
        </div>
        {(["basic", "deeper", "applied"] as const).map((key) => (
          <div key={key}>
            <label className={labelClass}>
              {key === "basic" ? "基础" : key === "deeper" ? "深入" : "应用"}问题
            </label>
            <textarea
              className={textareaClass}
              value={card.finalPrompts[key]}
              onChange={(e) =>
                update("finalPrompts", {
                  ...card.finalPrompts,
                  [key]: e.target.value,
                })
              }
            />
          </div>
        ))}
        <div>
          <label className={labelClass}>总结 summary</label>
          <textarea
            className={textareaClass}
            value={card.summary}
            onChange={(e) => update("summary", e.target.value)}
          />
        </div>
      </Card>

      <div className="flex flex-col gap-2 sm:flex-row sticky bottom-2 bg-surface-warm/95 py-2">
        <Button type="submit" fullWidth>
          保存到本地库
        </Button>
        <Button
          type="button"
          variant="secondary"
          fullWidth
          onClick={() => onPreview(card)}
        >
          预览训练
        </Button>
        <Button type="button" variant="ghost" fullWidth onClick={onCancel}>
          取消
        </Button>
      </div>
    </form>
  );
}
