import { COGNITIVE_SKILLS, CONTENT_SCENARIOS } from "@/data/taxonomy";
import type { CognitiveLevel, CognitiveSkill, ContentScenario } from "@/types";

export const SKILL_TAGS = COGNITIVE_SKILLS;
export const SCENARIO_TAGS = CONTENT_SCENARIOS;

export const COGNITIVE_LEVELS: CognitiveLevel[] = [1, 2, 3, 4, 5];

/** v2 内容结构 — 与旧版 localStorage 区分 */
export const CARDS_STORAGE_KEY = "wendechulai_cards_v2";

export type { CognitiveSkill, ContentScenario, CognitiveLevel };
