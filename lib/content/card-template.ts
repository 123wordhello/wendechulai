import type { CardStep, UnderstandingCard } from "@/types";

export function createEmptyStep(): CardStep {
  return {
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
  };
}

export function createEmptyCard(): UnderstandingCard {
  return {
    id: `card-${Date.now()}`,
    title: "",
    originalText: "",
    scenarios: [],
    level: 2,
    targetSkills: [],
    cognitiveGoal: "",
    commonMisunderstanding: "",
    contextStory: "",
    steps: [createEmptyStep(), createEmptyStep(), createEmptyStep()],
    reflectionQuestion: "",
    transferTask: "",
    finalPrompts: { basic: "", deeper: "", applied: "" },
    summary: "",
  };
}

export function exportCardsAsJson(cards: UnderstandingCard[]): string {
  return JSON.stringify(cards, null, 2);
}

export function downloadJson(filename: string, content: string): void {
  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** 合并导入：按 id upsert */
export function mergeCardsById(
  existing: UnderstandingCard[],
  incoming: UnderstandingCard[],
): UnderstandingCard[] {
  const map = new Map<string, UnderstandingCard>();
  existing.forEach((c) => map.set(c.id, c));
  incoming.forEach((c) => map.set(c.id, c));
  return [...map.values()];
}
