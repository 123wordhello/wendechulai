import { aiCards } from "./batch-ai";
import { classicCards } from "./batch-classic";
import { lifeSchoolCards } from "./batch-life-school";
import { networkCards } from "./batch-network";
import { socialCards } from "./batch-social";
import type { UnderstandingCard } from "@/types";

/**
 * 全站理解卡片库（样板 30 张）
 * 扩展方式：新增 batch-*.ts 或按场景拆分子目录后在此聚合
 */
export const understandingCards: UnderstandingCard[] = [
  ...classicCards,
  ...networkCards,
  ...socialCards,
  ...aiCards,
  ...lifeSchoolCards,
];

export function getCardById(id: string): UnderstandingCard | undefined {
  return understandingCards.find((c) => c.id === id);
}

export const CARD_COUNT = understandingCards.length;
