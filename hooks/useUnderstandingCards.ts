"use client";

import { useCallback, useEffect, useState } from "react";
import {
  clearCardsStorage,
  loadCardsFromStorage,
  saveCardsToStorage,
} from "@/lib/cards-storage";
import type { UnderstandingCard } from "@/types";

export function useUnderstandingCards() {
  const [cards, setCards] = useState<UnderstandingCard[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setCards(loadCardsFromStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const persist = useCallback((next: UnderstandingCard[]) => {
    saveCardsToStorage(next);
    setCards(next);
  }, []);

  const resetToDefaults = useCallback(() => {
    clearCardsStorage();
    refresh();
  }, [refresh]);

  return { cards, ready, persist, resetToDefaults, refresh };
}
