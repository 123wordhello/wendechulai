import {
  COGNITIVE_SKILLS,
  CONTENT_SCENARIOS,
} from "@/data/taxonomy";
import type {
  CardStep,
  CognitiveLevel,
  CognitiveSkill,
  ContentScenario,
  FinalPrompts,
  UnderstandingCard,
} from "@/types";

function slugify(title: string): string {
  const base = title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fff-]/g, "");
  return base || `card-${Date.now()}`;
}

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function parseScenarios(raw: unknown): ContentScenario[] {
  if (Array.isArray(raw)) {
    return raw.filter((s): s is ContentScenario =>
      CONTENT_SCENARIOS.includes(s as ContentScenario),
    );
  }
  if (typeof raw === "string" && raw.trim()) {
    const match = CONTENT_SCENARIOS.find((s) => s === raw.trim());
    return match ? [match] : [];
  }
  return [];
}

function parseSkills(raw: unknown): CognitiveSkill[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((s): s is CognitiveSkill =>
    COGNITIVE_SKILLS.includes(s as CognitiveSkill),
  );
}

function parseLevel(raw: unknown): CognitiveLevel {
  const n = typeof raw === "number" ? raw : Number(raw);
  if (n >= 1 && n <= 5 && Number.isInteger(n)) return n as CognitiveLevel;
  return 2;
}

function parseSteps(raw: unknown): CardStep[] {
  const list = Array.isArray(raw) ? raw : [];
  return list.map((item) => {
    const o = item as Record<string, unknown>;
    const options = Array.isArray(o.options)
      ? o.options.map((x) => asString(x))
      : ["", ""];
    const correctAnswer =
      typeof o.correctAnswer === "number" ? o.correctAnswer : 0;
    return {
      question: asString(o.question),
      options,
      correctAnswer,
      explanation: asString(o.explanation),
      feedbackCorrect: asString(o.feedbackCorrect) || undefined,
      feedbackIncorrect: asString(o.feedbackIncorrect) || undefined,
    };
  });
}

function parsePrompts(raw: unknown): FinalPrompts {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;
  return {
    basic: asString(o.basic),
    deeper: asString(o.deeper),
    applied: asString(o.applied),
  };
}

/** 将导入 JSON 单项规范为 UnderstandingCard */
export function normalizeImportedCard(
  raw: unknown,
  index: number,
): UnderstandingCard {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;

  const title = asString(o.title) || `未命名卡片 ${index + 1}`;
  const id = asString(o.id).trim() || slugify(title);

  const scenarios =
    parseScenarios(o.scenarios).length > 0
      ? parseScenarios(o.scenarios)
      : parseScenarios(o.scenario);

  const steps =
    parseSteps(o.steps).length > 0
      ? parseSteps(o.steps)
      : parseSteps(o.questions);

  return {
    id,
    title,
    originalText: asString(o.originalText),
    scenarios,
    level: parseLevel(o.level),
    targetSkills: parseSkills(o.targetSkills),
    cognitiveGoal: asString(o.cognitiveGoal) || asString(o.coreQuestion),
    commonMisunderstanding: asString(o.commonMisunderstanding),
    contextStory: asString(o.contextStory) || asString(o.scenario),
    steps,
    reflectionQuestion: asString(o.reflectionQuestion),
    transferTask: asString(o.transferTask),
    finalPrompts: parsePrompts(o.finalPrompts),
    summary: asString(o.summary),
  };
}

export function parseImportedJson(text: string): {
  ok: boolean;
  cards: UnderstandingCard[];
  error?: string;
} {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    return {
      ok: false,
      cards: [],
      error: `JSON 解析失败：${e instanceof Error ? e.message : "格式错误"}`,
    };
  }

  let array: unknown[];
  if (Array.isArray(parsed)) {
    array = parsed;
  } else if (
    parsed &&
    typeof parsed === "object" &&
    Array.isArray((parsed as { cards?: unknown }).cards)
  ) {
    array = (parsed as { cards: unknown[] }).cards;
  } else {
    return {
      ok: false,
      cards: [],
      error: "根节点须为数组，或 { \"cards\": [...] }",
    };
  }

  const cards = array.map((item, i) => normalizeImportedCard(item, i));
  return { ok: true, cards };
}
