import type { CognitiveSkill, ContentScenario } from "@/types";

export const COGNITIVE_SKILLS: CognitiveSkill[] = [
  "词义理解",
  "句意重述",
  "因果推理",
  "条件与前提",
  "比较与分类",
  "观点与证据",
  "情绪与语气",
  "他人视角",
  "风险与后果",
  "反例思维",
  "价值判断",
  "提问能力",
];

export const CONTENT_SCENARIOS: ContentScenario[] = [
  "经典短句",
  "校园学习",
  "同伴关系",
  "亲子沟通",
  "网络信息",
  "消费选择",
  "健康常识",
  "社会规则",
  "AI使用",
  "自我管理",
];

export const SKILL_META: Record<
  CognitiveSkill,
  { description: string; group: "理解" | "推理" | "社会" | "元认知" }
> = {
  词义理解: { description: "抓住关键词的真实含义，不被表面说法带走", group: "理解" },
  句意重述: { description: "用自己的话准确复述，检验是否真的懂", group: "理解" },
  因果推理: { description: "分清原因、结果与先后，避免因果混淆", group: "推理" },
  条件与前提: { description: "发现一句话背后默认成立的条件", group: "推理" },
  比较与分类: { description: "区分相似概念、不同情境下的差别", group: "推理" },
  观点与证据: { description: "分辨观点、理由、证据与例子", group: "推理" },
  情绪与语气: { description: "听出话里的情绪、暗示与关系张力", group: "社会" },
  他人视角: { description: "理解别人为何那样想、那样说", group: "社会" },
  风险与后果: { description: "看到行为背后的长期影响与隐性代价", group: "社会" },
  反例思维: { description: "想到例外、边界与不一定成立的情况", group: "元认知" },
  价值判断: { description: "辨认选择背后的价值冲突与取舍", group: "元认知" },
  提问能力: { description: "把模糊的不懂变成可讨论的好问题", group: "元认知" },
};

export const SCENARIO_META: Record<ContentScenario, { description: string }> = {
  经典短句: { description: "成语、古语、格言与现代金句" },
  校园学习: { description: "阅读、作文、课堂表达与题干理解" },
  同伴关系: { description: "朋友、合作、冲突与承诺" },
  亲子沟通: { description: "亲子之间的表达、误解与期待" },
  网络信息: { description: "标题、评论、广告与热点信息" },
  消费选择: { description: "免费、会员、折扣与冲动消费" },
  健康常识: { description: "睡眠、饮食、运动与风险提示" },
  社会规则: { description: "通知、协议、规则与公共秩序" },
  AI使用: { description: "向 AI 提问、判断 AI 回答" },
  自我管理: { description: "时间、计划、情绪与目标" },
};
