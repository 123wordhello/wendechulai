"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { UnderstandingCard } from "@/types";
import { saveTrainResult } from "@/lib/session";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CognitiveSkillBadge } from "@/components/CognitiveSkillBadge";
import { LevelBadge } from "@/components/LevelBadge";
import { ScenarioBadge } from "@/components/ScenarioBadge";

const DEFAULT_CORRECT = "你抓住了关键关系";
const DEFAULT_WRONG = "你可能只看到了字面意思，我们再往深处想一步";

interface TrainFlowProps {
  card: UnderstandingCard;
}

type Phase = "steps" | "reflect" | "prompts";

export function TrainFlow({ card }: TrainFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [phase, setPhase] = useState<Phase>("steps");

  const total = card.steps.length;
  const current = card.steps[step];
  const isLastStep = step === total - 1;

  const isCorrect = useMemo(() => {
    if (selected === null) return false;
    return selected === current.correctAnswer;
  }, [selected, current.correctAnswer]);

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelected(index);
    setShowFeedback(true);
    if (index === current.correctAnswer) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNextStep = () => {
    if (!showFeedback) return;
    if (isLastStep) {
      setPhase("reflect");
      return;
    }
    setStep((s) => s + 1);
    setSelected(null);
    setShowFeedback(false);
  };

  const handleFinish = () => {
    saveTrainResult({
      cardId: card.id,
      cardTitle: card.title,
      targetSkills: card.targetSkills,
      level: card.level,
      summary: card.summary,
      correctCount,
      totalSteps: total,
      completedAt: new Date().toISOString(),
    });
    router.push("/result");
  };

  if (phase === "reflect") {
    return (
      <div className="space-y-6">
        <Card>
          <p className="text-sm font-medium text-brand-600">反思与迁移</p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">想一想</p>
              <p className="mt-1 text-gray-800 leading-relaxed">
                {card.reflectionQuestion}
              </p>
            </div>
            <div className="rounded-xl bg-brand-50/80 border border-brand-100 px-4 py-3">
              <p className="text-sm font-medium text-brand-800">迁移任务</p>
              <p className="mt-1 text-gray-800 leading-relaxed">
                {card.transferTask}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-medium text-gray-600">常见误解：</span>
              {card.commonMisunderstanding}
            </div>
          </div>
        </Card>
        <Button fullWidth onClick={() => setPhase("prompts")}>
          查看可向 AI 提问的示例
        </Button>
      </div>
    );
  }

  if (phase === "prompts") {
    return (
      <div className="space-y-6">
        <Card>
          <p className="text-sm font-medium text-brand-600">
            可向 AI 提问的示例（mock）
          </p>
          <p className="mt-2 text-gray-600 text-sm">
            完成训练后，你可以用下面三个层次的问题向 AI 追问——记得带上你的情境与卡点。
          </p>
          <ul className="mt-6 space-y-4">
            <PromptItem label="基础问题" text={card.finalPrompts.basic} />
            <PromptItem label="深入问题" text={card.finalPrompts.deeper} />
            <PromptItem label="应用问题" text={card.finalPrompts.applied} />
          </ul>
        </Card>
        <Button fullWidth onClick={handleFinish}>
          查看我的理解结果
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <LevelBadge level={card.level} />
          {card.scenarios.map((s) => (
            <ScenarioBadge key={s} scenario={s} />
          ))}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{card.title}</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">{card.originalText}</p>
        <div className="mt-4 rounded-xl bg-brand-50/80 px-4 py-3 border border-brand-100">
          <p className="text-sm text-brand-800 font-medium">本卡训练目标</p>
          <p className="mt-1 text-gray-800">{card.cognitiveGoal}</p>
        </div>
        <p className="mt-4 text-sm text-gray-600 leading-relaxed">
          <span className="font-medium text-gray-800">场景故事：</span>
          {card.contextStory}
        </p>
        <div className="mt-4 flex flex-wrap gap-1">
          <span className="text-xs text-gray-500 w-full mb-1">训练能力</span>
          {card.targetSkills.map((s) => (
            <CognitiveSkillBadge key={s} skill={s} />
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            第 {step + 1} / {total} 步
          </span>
          <div className="flex gap-1">
            {card.steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-6 rounded-full transition-colors ${
                  i <= step ? "bg-brand-500" : "bg-brand-100"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="text-lg font-medium text-gray-900">{current.question}</p>
        <ul className="mt-4 space-y-2">
          {current.options.map((opt, i) => {
            const isSelected = selected === i;
            const isAnswer = i === current.correctAnswer;
            let optionClass =
              "w-full text-left rounded-xl border px-4 py-3 transition-all ";
            if (!showFeedback) {
              optionClass +=
                "border-gray-200 hover:border-brand-300 hover:bg-brand-50/50 cursor-pointer";
            } else if (isAnswer) {
              optionClass += "border-emerald-300 bg-emerald-50 text-emerald-900";
            } else if (isSelected && !isAnswer) {
              optionClass += "border-amber-200 bg-amber-50 text-amber-900";
            } else {
              optionClass += "border-gray-100 bg-gray-50/50 text-gray-500";
            }

            return (
              <li key={i}>
                <button
                  type="button"
                  className={optionClass}
                  onClick={() => handleSelect(i)}
                  disabled={showFeedback}
                >
                  <span className="mr-2 text-brand-400 font-medium">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>

        {showFeedback && (
          <div
            className={`mt-4 rounded-xl px-4 py-3 text-sm leading-relaxed ${
              isCorrect
                ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                : "bg-amber-50 text-amber-900 border border-amber-100"
            }`}
          >
            <p className="font-medium">
              {isCorrect
                ? current.feedbackCorrect ?? DEFAULT_CORRECT
                : current.feedbackIncorrect ?? DEFAULT_WRONG}
            </p>
            <p className="mt-2 opacity-90">{current.explanation}</p>
          </div>
        )}

        {showFeedback && (
          <div className="mt-6">
            <Button fullWidth onClick={handleNextStep}>
              {isLastStep ? "进入反思与迁移" : "下一步"}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function PromptItem({ label, text }: { label: string; text: string }) {
  return (
    <li className="rounded-xl border border-brand-100 bg-surface-warm px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        {label}
      </span>
      <p className="mt-1 text-gray-800 leading-relaxed">{text}</p>
    </li>
  );
}
