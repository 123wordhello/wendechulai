import type { SkillProgress } from "@/types";
import { SKILL_META } from "@/data/taxonomy";

/** 理解地图 mock — 对应 12 项认知能力 */
export const skillProgressList: SkillProgress[] = (
  Object.keys(SKILL_META) as (keyof typeof SKILL_META)[]
).map((skill) => ({
  skill,
  label: skill,
  description: SKILL_META[skill].description,
  progress: {
    词义理解: 58,
    句意重述: 45,
    因果推理: 52,
    条件与前提: 40,
    比较与分类: 48,
    观点与证据: 55,
    情绪与语气: 42,
    他人视角: 38,
    风险与后果: 50,
    反例思维: 35,
    价值判断: 44,
    提问能力: 32,
  }[skill],
}));
