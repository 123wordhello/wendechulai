import type {
  CognitiveLevel,
  CognitiveSkill,
  ContentScenario,
} from "./taxonomy";

export interface FinalPrompts {
  basic: string;
  deeper: string;
  applied: string;
}

/** 互动步骤 — 单步选择/判断 */
export interface CardStep {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  feedbackCorrect?: string;
  feedbackIncorrect?: string;
}

/**
 * 理解训练卡片
 * 设计为可扩展至数千张：元数据 + 分步互动 + 迁移与提问
 */
export interface UnderstandingCard {
  id: string;
  title: string;
  /** 原始句子、短文或对话 */
  originalText: string;
  /** 一个或多个场景标签 */
  scenarios: ContentScenario[];
  level: CognitiveLevel;
  targetSkills: CognitiveSkill[];
  /** 本卡训练的核心认知动作（一句话） */
  cognitiveGoal: string;
  /** 用户最常见的误解 */
  commonMisunderstanding: string;
  /** 贴近青少年的具体生活情境 */
  contextStory: string;
  steps: CardStep[];
  /** 完成互动后的反思问题 */
  reflectionQuestion: string;
  /** 迁移任务：换场景再理解 */
  transferTask: string;
  finalPrompts: FinalPrompts;
  summary: string;
}

export interface TrainSessionResult {
  cardId: string;
  cardTitle: string;
  targetSkills: CognitiveSkill[];
  level: CognitiveLevel;
  summary: string;
  correctCount: number;
  totalSteps: number;
  completedAt: string;
}

export interface SkillProgress {
  skill: CognitiveSkill;
  label: string;
  description: string;
  progress: number;
}
