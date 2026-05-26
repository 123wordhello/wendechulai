"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useUnderstandingCards } from "@/hooks/useUnderstandingCards";
import { getTodayCardIndex } from "@/lib/session";
import { TrainFlow } from "@/components/TrainFlow";
import { Button } from "@/components/Button";

function TrainContent() {
  const searchParams = useSearchParams();
  const cardId = searchParams.get("card");
  const { cards, ready } = useUnderstandingCards();

  const card = useMemo(() => {
    if (!cards.length) return null;
    if (cardId) {
      return cards.find((c) => c.id === cardId) ?? null;
    }
    const index = getTodayCardIndex(cards.length);
    return cards[index];
  }, [cards, cardId]);

  if (!ready) {
    return <p className="text-center text-gray-500 py-12">加载中…</p>;
  }

  if (!card) {
    return (
      <div className="text-center space-y-4 py-12">
        <p className="text-gray-600">
          {cardId ? "找不到该训练卡片。" : "暂无训练卡片。"}
        </p>
        <Button href="/explore">浏览训练内容</Button>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-sm text-gray-500">
        {cardId ? "选定训练" : "今日推荐"} · {card.title}
      </p>
      <TrainFlow card={card} />
    </div>
  );
}

export default function TrainPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500 py-12">加载中…</p>}>
      <TrainContent />
    </Suspense>
  );
}
