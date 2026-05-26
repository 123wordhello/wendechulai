"use client";

import { useState } from "react";
import type { UnderstandingCard } from "@/types";
import { parseImportedJson } from "@/lib/content/normalize";
import { validateCardLibrary } from "@/lib/content/validation";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

type ImportMode = "merge" | "replace";

interface JsonImportPanelProps {
  currentCount: number;
  onImport: (cards: UnderstandingCard[], mode: ImportMode) => void;
}

export function JsonImportPanel({ currentCount, onImport }: JsonImportPanelProps) {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState<UnderstandingCard[] | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [mode, setMode] = useState<ImportMode>("merge");

  const handleParse = () => {
    const result = parseImportedJson(text);
    if (!result.ok) {
      setParseError(result.error ?? "解析失败");
      setPreview(null);
      return;
    }
    setParseError(null);
    setPreview(result.cards);
  };

  const report = preview ? validateCardLibrary(preview) : null;

  const handleApply = () => {
    if (!preview?.length) return;
    onImport(preview, mode);
    setText("");
    setPreview(null);
  };

  const sample = `[
  {
    "id": "example-card",
    "title": "示例卡片",
    "originalText": "原始材料…",
    "scenarios": ["校园学习"],
    "level": 2,
    "targetSkills": ["因果推理"],
    "cognitiveGoal": "练习…",
    "commonMisunderstanding": "…",
    "contextStory": "…",
    "steps": [
      {
        "question": "题干？",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0,
        "explanation": "…"
      }
    ],
    "reflectionQuestion": "…",
    "transferTask": "…",
    "finalPrompts": { "basic": "…", "deeper": "…", "applied": "…" },
    "summary": "…"
  }
]`;

  return (
    <Card className="!p-5 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">JSON 批量导入</h2>
        <p className="mt-1 text-sm text-gray-600">
          粘贴 JSON 数组，或 {"{ \"cards\": [...] }"}。支持自动规范化字段（如
          questions → steps）。
        </p>
      </div>

      <textarea
        className="w-full min-h-[200px] rounded-xl border border-gray-200 px-3 py-2 text-sm font-mono focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"
        placeholder={sample}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        <Button onClick={handleParse}>检查格式</Button>
        <label className="inline-flex items-center gap-2 text-sm text-gray-600">
          <input
            type="radio"
            checked={mode === "merge"}
            onChange={() => setMode("merge")}
          />
          合并（同 ID 覆盖）
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-600">
          <input
            type="radio"
            checked={mode === "replace"}
            onChange={() => setMode("replace")}
          />
          替换全部库
        </label>
      </div>

      {parseError && (
        <p className="text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
          {parseError}
        </p>
      )}

      {report && preview && (
        <div className="rounded-xl border border-brand-100 bg-brand-50/50 px-4 py-3 text-sm space-y-2">
          <p>
            解析 <strong>{preview.length}</strong> 张 · 通过质检{" "}
            <strong className="text-emerald-700">{report.validCount}</strong> ·
            待修正 <strong className="text-amber-700">{report.invalidCount}</strong>
          </p>
          {report.duplicateIds.length > 0 && (
            <p className="text-amber-800">
              导入批次内重复 ID：{report.duplicateIds.join("、")}
            </p>
          )}
          {report.invalidCount > 0 && (
            <details className="text-gray-700">
              <summary className="cursor-pointer">查看错误详情</summary>
              <ul className="mt-2 max-h-40 overflow-y-auto list-disc list-inside">
                {preview.map((c) => {
                  const r = report.results.get(c.id);
                  if (!r || r.valid) return null;
                  return (
                    <li key={c.id}>
                      <strong>{c.title || c.id}</strong>:{" "}
                      {r.errors.map((e) => e.message).join("；")}
                    </li>
                  );
                })}
              </ul>
            </details>
          )}
          <Button
            onClick={handleApply}
            disabled={preview.length === 0}
            className="mt-2"
          >
            确认导入（{mode === "merge" ? "合并" : "替换"}，当前库 {currentCount} 张）
          </Button>
        </div>
      )}
    </Card>
  );
}
