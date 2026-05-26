import Link from "next/link";
import type { UnderstandingCard } from "@/types";
import { CognitiveSkillBadge } from "@/components/CognitiveSkillBadge";
import { LevelBadge } from "@/components/LevelBadge";
import { ScenarioBadge } from "@/components/ScenarioBadge";
import { Card } from "@/components/Card";

interface CardPreviewProps {
  card: UnderstandingCard;
}

export function CardPreview({ card }: CardPreviewProps) {
  return (
    <Card className="!p-5 flex flex-col h-full hover:border-brand-200 transition-colors">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <LevelBadge level={card.level} />
        {card.scenarios.slice(0, 2).map((s) => (
          <ScenarioBadge key={s} scenario={s} />
        ))}
      </div>
      <h3 className="font-semibold text-gray-900">{card.title}</h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">
        {card.cognitiveGoal}
      </p>
      <div className="mt-3 flex flex-wrap gap-1">
        {card.targetSkills.slice(0, 3).map((s) => (
          <CognitiveSkillBadge key={s} skill={s} />
        ))}
      </div>
      <Link
        href={`/train?card=${card.id}`}
        className="mt-4 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        开始训练 →
      </Link>
    </Card>
  );
}
