import { defineCard, step } from "@/lib/card-helpers";
import type { UnderstandingCard } from "@/types";

/** AI 使用 · 5 张 */
export const aiCards: UnderstandingCard[] = [
  defineCard({
    id: "ai-vague-prompt",
    title: "只会问「帮我写作文」",
    originalText: "模糊提问会得到模糊答案——好问题要包含目标、限制与你不确定的地方。",
    scenarios: ["AI使用", "校园学习"],
    level: 2,
    targetSkills: ["提问能力", "句意重述"],
    cognitiveGoal: "把「帮我做」改写成可讨论、可学习的提问",
    commonMisunderstanding: "AI 能读懂我心里想什么",
    contextStory:
      "你把「帮我写议论文」丢给 AI，得到一篇很泛的作文，老师说你「没有自己的观点」。",
    steps: [
      step(
        "「帮我写作文」对 AI 来说缺什么？",
        ["电费", "题目、立场、素材与你卡住的点", "键盘", "评分标准"],
        1,
        "需要目标、限制与卡点。",
      ),
      step(
        "更好的提问更接近？",
        ["越短越好", "说明题目、我的立场、需要示范论证还是改段落", "全部保密", "骂它笨"],
        1,
        "具体约束能得到可用帮助。",
      ),
      step(
        "若目标是学会写而不是交差，应多问？",
        ["直接要全文", "请解释论证结构并指出我草稿的漏洞", "复制百科", "让它考我"],
        1,
        "解释结构与漏洞更利于学习。",
      ),
    ],
    reflectionQuestion: "我下次向 AI 提问，愿加上哪两个具体信息？",
    transferTask: "把「帮我复习数学」改写成三个更好的问法。",
    finalPrompts: {
      basic: "我真正想解决的是什么？",
      deeper: "我需要 AI 给答案，还是给步骤与反馈？",
      applied: "我写一条包含题目、立场、卡点的新提问。",
    },
    summary: "你在练习：好问题自带目标、限制与你卡住的位置。",
  }),
  defineCard({
    id: "ai-trust-answer",
    title: "AI 说得很肯定",
    originalText: "流畅 ≠ 正确；AI 可能「自信地错」——要交叉验证关键事实。",
    scenarios: ["AI使用"],
    level: 3,
    targetSkills: ["观点与证据", "反例思维", "提问能力"],
    cognitiveGoal: "对关键事实保持核验习惯，不迷信语气",
    commonMisunderstanding: "长文+专业术语 = 可靠",
    contextStory:
      "AI 给你一段历史人物生平，你写进小论文，被老师标出两处年代错误。",
    steps: [
      step(
        "AI 的「肯定语气」说明？",
        ["已联网核实", "模型在生成最像答案的文本，不保证真", "老师批准", "法律认证"],
        1,
        "流畅是语言模型特性，不是核验保证。",
      ),
      step(
        "涉及分数与事实时，应？",
        ["直接交", "用教材/权威来源交叉验证关键事实", "只看字数", "改个标点"],
        1,
        "关键事实要交叉验证。",
      ),
      step(
        "发现 AI 可能错了，更好的做法？",
        ["假装没看见", "标注不确定并向老师或资料求证", "骂 AI", "删除作业"],
        1,
        "承认不确定并求证是学术诚实。",
      ),
    ],
    reflectionQuestion: "我上次直接采用的 AI 内容，哪一部分最该复核？",
    transferTask: "AI 给健康建议时，核验渠道应换成什么？",
    finalPrompts: {
      basic: "回答里哪些是可验证事实，哪些是推测？",
      deeper: "我如何用两个独立来源核对？",
      applied: "我标出论文里三条需核实的句子。",
    },
    summary: "你在建立习惯：肯定语气不等于已验证事实。",
  }),
  defineCard({
    id: "ai-homework-ethics",
    title: "整份作业让 AI 生成",
    originalText: "把 AI 当「代写」换短期轻松，长期可能换掉的是能力与诚信。",
    scenarios: ["AI使用", "校园学习"],
    level: 4,
    targetSkills: ["价值判断", "风险与后果", "提问能力"],
    cognitiveGoal: "在效率与能力、诚信之间做清醒选择",
    commonMisunderstanding: "没人发现就没事",
    contextStory:
      "月考作文与 AI 生成稿风格太像，老师约谈你，问：哪些段落是你自己的思考？",
    steps: [
      step(
        "整份代写的隐性代价包括？",
        ["自动满分", "能力练不到、诚信风险、被追问时说不清", "老师表扬", "变轻松"],
        1,
        "能力、诚信与可解释性都会受损。",
      ),
      step(
        "更可持续的 AI 用法接近？",
        ["全代写", "提纲、改错、追问思路，正文自己写", "抄同学", "不交"],
        1,
        "AI 适合辅助结构、反馈与追问。",
      ),
      step(
        "老师追问「你的思考」时，你需要？",
        ["背 AI 原文", "能指出自己的论点、例子与修改过程", "沉默", "怪 AI"],
        1,
        "要能说明自己的思考链条。",
      ),
    ],
    reflectionQuestion: "我愿保留哪部分自己写，哪怕更慢？",
    transferTask: "小组报告里 AI 生成 PPT 文字，分工伦理如何谈？",
    finalPrompts: {
      basic: "我用 AI 想得到什么？不愿失去什么？",
      deeper: "学校规则下，哪些用法算辅助、哪些算越界？",
      applied: "我定一条个人 AI 使用原则。",
    },
    summary: "你在辨认：AI 可以辅助思考，不宜替代思考与诚信。",
  }),
  defineCard({
    id: "ai-privacy-upload",
    title: "把试卷照片发给 AI",
    originalText: "上传内容可能进入训练或存储——涉及隐私、版权与身份安全。",
    scenarios: ["AI使用"],
    level: 3,
    targetSkills: ["风险与后果", "条件与前提", "提问能力"],
    cognitiveGoal: "上传前评估：谁可见、存多久、是否含敏感信息",
    commonMisunderstanding: "删了聊天记录就彻底消失",
    contextStory:
      "你把带姓名学号的答题卡拍照发给在线 AI 求解析，同学提醒：这算个人信息。",
    steps: [
      step(
        "上传试卷照片的风险包括？",
        ["自动加分", "泄露姓名学号、题目版权或校规问题", "网速变快", "老师奖励"],
        1,
        "个人信息与版权/校规都可能是风险。",
      ),
      step(
        "更稳妥的做法？",
        ["原图直传", "打码个人信息，只问不含敏感信息的错题思路", "发全班群", "用同学账号"],
        1,
        "打码 + 限定内容是常见做法。",
      ),
      step(
        "使用前应查看？",
        ["表情包", "平台的隐私政策与是否用于训练", "字体", "点赞数"],
        1,
        "隐私政策说明数据如何使用。",
      ),
    ],
    reflectionQuestion: "我上传过的内容里，有哪些字段应该打码？",
    transferTask: "把日记发给 AI 分析情绪，风险与试卷有何异同？",
    finalPrompts: {
      basic: "这张图里有哪些敏感信息？",
      deeper: "平台可能如何存储或使用？",
      applied: "我写一个上传前自检清单（3 条）。",
    },
    summary: "你在练习：上传前先问「谁可见、存多久、含什么敏感信息」。",
  }),
  defineCard({
    id: "ai-both-sides",
    title: "AI 只给一边倒",
    originalText: "提问方式会塑造答案；要练习要求反面、条件与证据。",
    scenarios: ["AI使用"],
    level: 4,
    targetSkills: ["反例思维", "提问能力", "观点与证据"],
    cognitiveGoal: "用提问逼迫 AI 呈现反面、前提与不确定性",
    commonMisunderstanding: "AI 中立所以不用质疑",
    contextStory:
      "你问「该不该取消晚自习」，AI 列了十条支持，你差点以为没有反面，其实是你没问。",
    steps: [
      step(
        "一边倒的回答可能来自？",
        ["世界只有一种答案", "你的提问只开了单边", "AI 有政治立场", "网络断了"],
        1,
        "提问框架会塑造回答范围。",
      ),
      step(
        "更好的追问？",
        ["谢谢不用了", "请给出反对理由、适用条件与可能代价", "再长一点", "换成英文"],
        1,
        "要求反面、条件与代价。",
      ),
      step(
        "判断议题时，你最终仍需？",
        ["完全听 AI", "用自己的情境与价值观做决定", "抛硬币", "问网友"],
        1,
        "AI 辅助思考，决定在你。",
      ),
    ],
    reflectionQuestion: "我最近的 AI 对话，有没有主动要过「反面」？",
    transferTask: "讨论「要不要带手机上学」，设计三个平衡提问。",
    finalPrompts: {
      basic: "支持方理由是什么？证据强弱如何？",
      deeper: "反对方最强的一条是什么？",
      applied: "我补充的两个追问是什么？",
    },
    summary: "你在练习：用提问拉出反面、条件与代价，而不是接受单边答案。",
  }),
];
