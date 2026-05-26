/**
 * 认知能力分类体系（Taxonomy）
 * 全站统一使用，用于卡片标注、筛选与理解地图
 */
export type CognitiveSkill =
  | "词义理解"
  | "句意重述"
  | "因果推理"
  | "条件与前提"
  | "比较与分类"
  | "观点与证据"
  | "情绪与语气"
  | "他人视角"
  | "风险与后果"
  | "反例思维"
  | "价值判断"
  | "提问能力";

/** 内容场景分类 */
export type ContentScenario =
  | "经典短句"
  | "校园学习"
  | "同伴关系"
  | "亲子沟通"
  | "网络信息"
  | "消费选择"
  | "健康常识"
  | "社会规则"
  | "AI使用"
  | "自我管理";

/**
 * 五级认知难度（按理解深度，非年级）
 * Level 1 字面理解 → Level 5 生成性理解
 */
export type CognitiveLevel = 1 | 2 | 3 | 4 | 5;

export const COGNITIVE_LEVEL_LABELS: Record<CognitiveLevel, string> = {
  1: "Level 1 · 字面理解",
  2: "Level 2 · 关系理解",
  3: "Level 3 · 情境理解",
  4: "Level 4 · 批判理解",
  5: "Level 5 · 生成性理解",
};

export const COGNITIVE_LEVEL_SHORT: Record<CognitiveLevel, string> = {
  1: "字面理解",
  2: "关系理解",
  3: "情境理解",
  4: "批判理解",
  5: "生成性理解",
};
