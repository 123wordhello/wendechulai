import { understandingCards as defaultCards } from "@/data/cards";
import { CARDS_STORAGE_KEY } from "@/lib/constants";
import type { UnderstandingCard } from "@/types";

function isValidCard(card: unknown): card is UnderstandingCard {
  if (!card || typeof card !== "object") return false;
  const c = card as UnderstandingCard;
  return (
    typeof c.id === "string" &&
    typeof c.title === "string" &&
    Array.isArray(c.scenarios) &&
    typeof c.level === "number" &&
    Array.isArray(c.steps) &&
    c.steps.length > 0
  );
}

function isValidCardArray(data: unknown): data is UnderstandingCard[] {
  return Array.isArray(data) && data.every(isValidCard);
}

export function loadCardsFromStorage(): UnderstandingCard[] {
  if (typeof window === "undefined") return defaultCards;
  const raw = localStorage.getItem(CARDS_STORAGE_KEY);
  if (!raw) return defaultCards;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isValidCardArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    /* 损坏或旧版数据，回退默认 */
  }
  return defaultCards;
}

export function saveCardsToStorage(cards: UnderstandingCard[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
}

export function clearCardsStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CARDS_STORAGE_KEY);
}

export function hasCustomCards(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(CARDS_STORAGE_KEY) !== null;
}

export function getDefaultCards(): UnderstandingCard[] {
  return defaultCards;
}

export function getCardById(
  id: string,
  cards?: UnderstandingCard[],
): UnderstandingCard | undefined {
  const list = cards ?? loadCardsFromStorage();
  return list.find((c) => c.id === id);
}
