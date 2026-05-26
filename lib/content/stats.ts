import {
  COGNITIVE_SKILLS,
  CONTENT_SCENARIOS,
} from "@/data/taxonomy";
import { COGNITIVE_LEVELS } from "@/lib/constants";
import type {
  CognitiveLevel,
  CognitiveSkill,
  ContentScenario,
  UnderstandingCard,
} from "@/types";

export const GAP_THRESHOLDS = {
  skillLevel: 2,
  scenarioLevel: 2,
  skillTotal: 3,
  scenarioTotal: 3,
  levelTotal: 4,
} as const;

export interface ContentStats {
  total: number;
  bySkill: Record<CognitiveSkill, number>;
  byScenario: Record<ContentScenario, number>;
  byLevel: Record<CognitiveLevel, number>;
  validCount: number;
  invalidCount: number;
}

export interface ContentGap {
  id: string;
  message: string;
  count: number;
  threshold: number;
  kind: "skill-level" | "scenario-level" | "skill" | "scenario" | "level";
}

function initSkillRecord(): Record<CognitiveSkill, number> {
  return Object.fromEntries(
    COGNITIVE_SKILLS.map((s) => [s, 0]),
  ) as Record<CognitiveSkill, number>;
}

function initScenarioRecord(): Record<ContentScenario, number> {
  return Object.fromEntries(
    CONTENT_SCENARIOS.map((s) => [s, 0]),
  ) as Record<ContentScenario, number>;
}

function initLevelRecord(): Record<CognitiveLevel, number> {
  return Object.fromEntries(
    COGNITIVE_LEVELS.map((l) => [l, 0]),
  ) as Record<CognitiveLevel, number>;
}

export function computeContentStats(
  cards: UnderstandingCard[],
  validationMap?: Map<string, { valid: boolean }>,
): ContentStats {
  const bySkill = initSkillRecord();
  const byScenario = initScenarioRecord();
  const byLevel = initLevelRecord();

  let validCount = 0;
  let invalidCount = 0;

  cards.forEach((card) => {
    const v = validationMap?.get(card.id);
    if (v) {
      if (v.valid) validCount++;
      else invalidCount++;
    }

    card.targetSkills?.forEach((skill) => {
      if (skill in bySkill) bySkill[skill as CognitiveSkill]++;
    });
    card.scenarios?.forEach((scenario) => {
      if (scenario in byScenario) byScenario[scenario as ContentScenario]++;
    });
    if (card.level >= 1 && card.level <= 5) {
      byLevel[card.level as CognitiveLevel]++;
    }
  });

  if (!validationMap) {
    validCount = cards.length;
    invalidCount = 0;
  }

  return {
    total: cards.length,
    bySkill,
    byScenario,
    byLevel,
    validCount,
    invalidCount,
  };
}

export function computeContentGaps(cards: UnderstandingCard[]): ContentGap[] {
  const gaps: ContentGap[] = [];
  const { skillLevel, scenarioLevel, skillTotal, scenarioTotal, levelTotal } =
    GAP_THRESHOLDS;

  const skillLevelCounts = new Map<string, number>();
  const scenarioLevelCounts = new Map<string, number>();

  cards.forEach((card) => {
    const level = card.level;
    card.targetSkills?.forEach((skill) => {
      const key = `${skill}::${level}`;
      skillLevelCounts.set(key, (skillLevelCounts.get(key) ?? 0) + 1);
    });
    card.scenarios?.forEach((scenario) => {
      const key = `${scenario}::${level}`;
      scenarioLevelCounts.set(key, (scenarioLevelCounts.get(key) ?? 0) + 1);
    });
  });

  COGNITIVE_SKILLS.forEach((skill) => {
    const total = cards.filter((c) => c.targetSkills?.includes(skill)).length;
    if (total < skillTotal) {
      gaps.push({
        id: `skill-${skill}`,
        kind: "skill",
        message: `「${skill}」整体内容不足`,
        count: total,
        threshold: skillTotal,
      });
    }
    COGNITIVE_LEVELS.forEach((level) => {
      const count = skillLevelCounts.get(`${skill}::${level}`) ?? 0;
      if (count < skillLevel) {
        gaps.push({
          id: `skill-level-${skill}-${level}`,
          kind: "skill-level",
          message: `「${skill}」Level ${level} 内容不足`,
          count,
          threshold: skillLevel,
        });
      }
    });
  });

  CONTENT_SCENARIOS.forEach((scenario) => {
    const total = cards.filter((c) => c.scenarios?.includes(scenario)).length;
    if (total < scenarioTotal) {
      gaps.push({
        id: `scenario-${scenario}`,
        kind: "scenario",
        message: `「${scenario}」场景整体内容不足`,
        count: total,
        threshold: scenarioTotal,
      });
    }
    COGNITIVE_LEVELS.forEach((level) => {
      const count = scenarioLevelCounts.get(`${scenario}::${level}`) ?? 0;
      if (count < scenarioLevel) {
        gaps.push({
          id: `scenario-level-${scenario}-${level}`,
          kind: "scenario-level",
          message: `「${scenario}」场景 Level ${level} 内容不足`,
          count,
          threshold: scenarioLevel,
        });
      }
    });
  });

  COGNITIVE_LEVELS.forEach((level) => {
    const count = cards.filter((c) => c.level === level).length;
    if (count < levelTotal) {
      gaps.push({
        id: `level-${level}`,
        kind: "level",
        message: `Level ${level} 整体内容不足`,
        count,
        threshold: levelTotal,
      });
    }
  });

  return gaps.sort((a, b) => a.count - b.count);
}
