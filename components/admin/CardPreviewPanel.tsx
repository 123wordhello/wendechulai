"use client";

import type { UnderstandingCard } from "@/types";
import { TrainFlow } from "@/components/TrainFlow";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { LevelBadge } from "@/components/LevelBadge";
import { ScenarioBadge } from "@/components/ScenarioBadge";
import { CognitiveSkillBadge } from "@/components/CognitiveSkillBadge";

interface CardPreviewPanelProps {
  card: UnderstandingCard;
  onClose: () => void;
}

export function CardPreviewPanel({ card, onClose }: CardPreviewPanelProps) {
  return (
    <div className="space-y-4">
      <Card className="!p-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm text-brand-600 font-medium">预览模式</p>
          <h2 className="text-lg font-semibold">{card.title}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <LevelBadge level={card.level} />
            {card.scenarios.map((s) => (
              <ScenarioBadge key={s} scenario={s} />
            ))}
            {card.targetSkills.map((s) => (
              <CognitiveSkillBadge key={s} skill={s} />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button href={`/train?card=${card.id}`} variant="secondary">
            在新页打开
          </Button>
          <Button variant="ghost" onClick={onClose}>
            关闭预览
          </Button>
        </div>
      </Card>
      <TrainFlow card={card} />
    </div>
  );
}
