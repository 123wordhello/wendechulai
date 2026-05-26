import type {
  CognitiveLevel,
  CognitiveSkill,
  ContentScenario,
  UnderstandingCard,
} from "@/types";

export interface CardFilters {
  skill?: CognitiveSkill | "";
  scenario?: ContentScenario | "";
  level?: CognitiveLevel | "";
  query?: string;
}

export function filterCards(
  cards: UnderstandingCard[],
  filters: CardFilters,
): UnderstandingCard[] {
  return cards.filter((card) => {
    if (filters.skill && !card.targetSkills.includes(filters.skill)) {
      return false;
    }
    if (filters.scenario && !card.scenarios.includes(filters.scenario)) {
      return false;
    }
    if (filters.level && card.level !== filters.level) {
      return false;
    }
    if (filters.query?.trim()) {
      const q = filters.query.trim().toLowerCase();
      const haystack = [
        card.title,
        card.originalText,
        card.cognitiveGoal,
        ...card.scenarios,
        ...card.targetSkills,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
