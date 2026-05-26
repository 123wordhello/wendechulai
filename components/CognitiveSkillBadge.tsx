import type { CognitiveSkill } from "@/types";

const colors: Record<CognitiveSkill, string> = {
  词义理解: "bg-violet-100 text-violet-800",
  句意重述: "bg-indigo-100 text-indigo-800",
  因果推理: "bg-sky-100 text-sky-800",
  条件与前提: "bg-cyan-100 text-cyan-800",
  比较与分类: "bg-teal-100 text-teal-800",
  观点与证据: "bg-amber-100 text-amber-800",
  情绪与语气: "bg-rose-100 text-rose-800",
  他人视角: "bg-fuchsia-100 text-fuchsia-800",
  风险与后果: "bg-orange-100 text-orange-800",
  反例思维: "bg-lime-100 text-lime-800",
  价值判断: "bg-emerald-100 text-emerald-800",
  提问能力: "bg-brand-100 text-brand-800",
};

export function CognitiveSkillBadge({ skill }: { skill: CognitiveSkill }) {
  return (
    <span
      className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-medium ${colors[skill]}`}
    >
      {skill}
    </span>
  );
}
