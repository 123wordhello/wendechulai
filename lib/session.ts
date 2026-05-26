import type { TrainSessionResult } from "@/types";

const SESSION_KEY = "wendechulai_train_result";

export function saveTrainResult(result: TrainSessionResult): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(result));
}

export function loadTrainResult(): TrainSessionResult | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TrainSessionResult;
  } catch {
    return null;
  }
}

export function clearTrainResult(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

/** 按日期种子选取「今日」卡片，保证同一天看到同一张 */
export function getTodayCardIndex(cardCount: number): number {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  return seed % cardCount;
}
