import type { CardStep, UnderstandingCard } from "@/types";

export function step(
  question: string,
  options: [string, string, string, string],
  correctAnswer: number,
  explanation: string,
  feedback?: { correct?: string; incorrect?: string },
): CardStep {
  return {
    question,
    options: [...options],
    correctAnswer,
    explanation,
    feedbackCorrect: feedback?.correct,
    feedbackIncorrect: feedback?.incorrect,
  };
}

export type CardDraft = Omit<UnderstandingCard, "steps"> & { steps: CardStep[] };

export function defineCard(draft: CardDraft): UnderstandingCard {
  return { ...draft };
}
