"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useUnderstandingCards } from "@/hooks/useUnderstandingCards";
import { hasCustomCards } from "@/lib/cards-storage";
import {
  computeContentGaps,
  computeContentStats,
} from "@/lib/content/stats";
import { validateCardLibrary } from "@/lib/content/validation";
import {
  createEmptyCard,
  downloadJson,
  exportCardsAsJson,
  mergeCardsById,
} from "@/lib/content/card-template";
import type { UnderstandingCard } from "@/types";
import { ContentStatsPanel } from "@/components/admin/ContentStatsPanel";
import { ContentGapsPanel } from "@/components/admin/ContentGapsPanel";
import { JsonImportPanel } from "@/components/admin/JsonImportPanel";
import { CardEditorForm } from "@/components/admin/CardEditorForm";
import { CardPreviewPanel } from "@/components/admin/CardPreviewPanel";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

type Tab = "edit" | "import";
type EditorMode =
  | { type: "none" }
  | { type: "new" }
  | { type: "edit"; id: string };

export function AdminCardsClient() {
  const { cards, ready, persist, resetToDefaults, refresh } =
    useUnderstandingCards();
  const [tab, setTab] = useState<Tab>("edit");
  const [mode, setMode] = useState<EditorMode>({ type: "none" });
  const [previewCard, setPreviewCard] = useState<UnderstandingCard | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const libraryReport = useMemo(
    () => validateCardLibrary(cards),
    [cards],
  );

  const validationMap = useMemo(() => {
    const m = new Map<string, { valid: boolean }>();
    libraryReport.results.forEach((r, id) => {
      m.set(id, { valid: r.valid });
    });
    return m;
  }, [libraryReport]);

  const stats = useMemo(
    () => computeContentStats(cards, validationMap),
    [cards, validationMap],
  );

  const gaps = useMemo(() => computeContentGaps(cards), [cards]);

  const existingIds = useMemo(() => cards.map((c) => c.id), [cards]);

  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.scenarios.some((s) => s.includes(q)),
    );
  }, [cards, search]);

  const editingCard = useMemo(() => {
    if (mode.type === "new") return createEmptyCard();
    if (mode.type === "edit") return cards.find((c) => c.id === mode.id) ?? null;
    return null;
  }, [mode, cards]);

  const handleSave = useCallback(
    (saved: UnderstandingCard) => {
      let next: UnderstandingCard[];
      if (mode.type === "new") {
        next = [...cards, saved];
      } else {
        next = cards.map((c) => (c.id === saved.id ? saved : c));
      }
      persist(next);
      setMode({ type: "none" });
    },
    [cards, mode.type, persist],
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (cards.length <= 1) {
        alert("至少保留一张卡片。");
        return;
      }
      persist(cards.filter((c) => c.id !== id));
      setDeleteId(null);
      if (mode.type === "edit" && mode.id === id) setMode({ type: "none" });
    },
    [cards, mode, persist],
  );

  const handleImport = useCallback(
    (incoming: UnderstandingCard[], importMode: "merge" | "replace") => {
      const next =
        importMode === "replace" ? incoming : mergeCardsById(cards, incoming);
      persist(next);
      setTab("edit");
      alert(`已导入 ${incoming.length} 张，当前库共 ${next.length} 张。`);
    },
    [cards, persist],
  );

  const handleExport = () => {
    downloadJson(
      `wendechulai-cards-${new Date().toISOString().slice(0, 10)}.json`,
      exportCardsAsJson(cards),
    );
  };

  if (!ready) {
    return <p className="text-center text-gray-500 py-12">加载中…</p>;
  }

  if (previewCard) {
    return (
      <div className="admin-shell space-y-4">
        <CardPreviewPanel card={previewCard} onClose={() => setPreviewCard(null)} />
      </div>
    );
  }

  return (
    <div className="admin-shell space-y-6 pb-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-brand-600 font-medium">内容管理 · 第二阶段</p>
          <h1 className="text-2xl font-bold text-gray-900">理解卡片编辑器</h1>
          <p className="mt-1 text-sm text-gray-600 max-w-xl">
            本地编辑与 JSON 批量导入，数据保存在浏览器 localStorage。生产环境可替换为
            API / 文件同步，结构保持不变。
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => { setMode({ type: "new" }); setTab("edit"); }}>
            + 新建
          </Button>
          <Button variant="secondary" onClick={handleExport}>
            导出 JSON
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (
                confirm(
                  "恢复为内置 30 张样板？localStorage 中的自定义内容将被清除。",
                )
              ) {
                resetToDefaults();
                setMode({ type: "none" });
                refresh();
              }
            }}
          >
            恢复样板
          </Button>
        </div>
      </header>

      <ContentStatsPanel stats={stats} usingCustomStorage={hasCustomCards()} />
      <ContentGapsPanel gaps={gaps} />

      <div className="flex gap-2 border-b border-gray-200">
        <TabButton active={tab === "edit"} onClick={() => setTab("edit")}>
          编辑列表
        </TabButton>
        <TabButton active={tab === "import"} onClick={() => setTab("import")}>
          JSON 导入
        </TabButton>
      </div>

      {tab === "import" && (
        <JsonImportPanel currentCount={cards.length} onImport={handleImport} />
      )}

      {tab === "edit" && (
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-2 lg:sticky lg:top-24 lg:self-start">
            <input
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
              placeholder="搜索标题 / ID / 场景"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Card className="!p-2 max-h-[50vh] overflow-y-auto">
              <ul className="divide-y divide-gray-100">
                {filteredList.map((c) => {
                  const valid = libraryReport.results.get(c.id)?.valid ?? true;
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setMode({ type: "edit", id: c.id });
                          setDeleteId(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                          mode.type === "edit" && mode.id === c.id
                            ? "bg-brand-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span
                          className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            valid ? "bg-emerald-500" : "bg-amber-500"
                          }`}
                        />
                        <span className="font-medium line-clamp-1">
                          {c.title || c.id}
                        </span>
                        <span className="block text-xs text-gray-500 pl-4">
                          L{c.level} · {c.scenarios[0] ?? "无场景"}
                        </span>
                      </button>
                      {deleteId === c.id ? (
                        <div className="px-3 pb-2 flex gap-2 text-xs">
                          <button
                            type="button"
                            className="text-red-600"
                            onClick={() => handleDelete(c.id)}
                          >
                            确认删除
                          </button>
                          <button type="button" onClick={() => setDeleteId(null)}>
                            取消
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="px-3 pb-1 text-xs text-gray-400 hover:text-red-600"
                          onClick={() => setDeleteId(c.id)}
                        >
                          删除
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Card>
            <Link
              href="/explore"
              className="text-xs text-brand-600 hover:underline block px-1"
            >
              在探索页查看 →
            </Link>
          </aside>

          <section>
            {mode.type === "none" && (
              <Card className="text-center py-16 text-gray-600">
                选择左侧卡片编辑，或点击「新建」。
              </Card>
            )}
            {(mode.type === "new" || mode.type === "edit") && editingCard && (
              <CardEditorForm
                key={mode.type === "new" ? "new" : editingCard.id}
                card={editingCard}
                isNew={mode.type === "new"}
                existingIds={existingIds}
                onSave={handleSave}
                onCancel={() => setMode({ type: "none" })}
                onPreview={setPreviewCard}
              />
            )}
            {mode.type === "edit" && !editingCard && (
              <Card className="text-center py-12 text-gray-500">
                卡片不存在或已删除。
              </Card>
            )}
          </section>
        </div>
      )}

      <p className="text-xs text-gray-400">
        内置样板位于 <code>data/cards/</code> · 参阅 CARD_AUTHORING_GUIDE.md
      </p>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
        active
          ? "border-brand-600 text-brand-700"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
