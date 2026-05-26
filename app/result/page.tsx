"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadTrainResult } from "@/lib/session";
import type { TrainSessionResult } from "@/types";
import { COGNITIVE_LEVEL_SHORT } from "@/types";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CognitiveSkillBadge } from "@/components/CognitiveSkillBadge";
import { LevelBadge } from "@/components/LevelBadge";

export default function ResultPage() {
  const [result, setResult] = useState<TrainSessionResult | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setResult(loadTrainResult());
    setReady(true);
  }, []);

  if (!ready) {
    return <p className="text-center text-gray-500 py-12">加载中…</p>;
  }

  if (!result) {
    return (
      <Card className="text-center">
        <p className="text-gray-600">还没有完成训练记录。</p>
        <div className="mt-6">
          <Button href="/train">开始训练</Button>
        </div>
      </Card>
    );
  }

  const accuracy =
    result.totalSteps > 0
      ? Math.round((result.correctCount / result.totalSteps) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-brand-600 font-medium">本次训练完成</p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">{result.cardTitle}</h1>
        <div className="mt-3">
          <LevelBadge level={result.level} />
        </div>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900">本次训练的认知能力</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {result.targetSkills.map((s) => (
            <CognitiveSkillBadge key={s} skill={s} />
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          互动正确率 {accuracy}%（{result.correctCount} / {result.totalSteps}）
          · 难度 {COGNITIVE_LEVEL_SHORT[result.level]}
        </p>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900">简短总结</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">{result.summary}</p>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/explore" fullWidth>
          探索更多训练
        </Button>
        <Button href={`/train?card=${result.cardId}`} variant="secondary" fullWidth>
          再练这张卡
        </Button>
      </div>

      <p className="text-center text-sm text-gray-400">
        <Link href="/map" className="hover:text-brand-600">
          查看理解地图
        </Link>
        {" · "}
        <Link href="/" className="hover:text-brand-600">
          返回首页
        </Link>
      </p>
    </div>
  );
}
