# 问得出来 · 内容体系说明

本文档描述「问得出来」训练内容的整体架构，便于将样板库从 30 张扩展到数千张。

## 产品定位

- **不是**语文题库、知识点背诵或 AI 代答工具。
- **是**青少年认知训练：理解力、思考力、提问力。
- **路径**：从「我看不懂」→「我知道卡在哪」→「我能问出好问题」。

## 三维标注体系

每张理解卡片在数据层至少标注三个维度：

| 维度 | 用途 | 定义位置 |
|------|------|----------|
| 认知能力 `targetSkills` | 本卡训练哪几种思维动作 | `types/taxonomy.ts` → `CognitiveSkill` |
| 内容场景 `scenarios` | 材料来自哪类生活情境（可多选） | `ContentScenario` |
| 认知难度 `level` | 1–5 级理解深度 | `CognitiveLevel` |

### 12 项认知能力

1. 词义理解  
2. 句意重述  
3. 因果推理  
4. 条件与前提  
5. 比较与分类  
6. 观点与证据  
7. 情绪与语气  
8. 他人视角  
9. 风险与后果  
10. 反例思维  
11. 价值判断  
12. 提问能力  

说明与分组见 `data/taxonomy.ts` 中的 `SKILL_META`。

### 10 类内容场景

1. 经典短句  
2. 校园学习  
3. 同伴关系  
4. 亲子沟通  
5. 网络信息  
6. 消费选择  
7. 健康常识  
8. 社会规则  
9. AI 使用  
10. 自我管理  

### 五级难度（按认知深度，非年级）

| Level | 名称 | 用户应达到的状态 |
|-------|------|------------------|
| 1 | 字面理解 | 看懂词语与基本意思 |
| 2 | 关系理解 | 看出因果、转折、比较、条件 |
| 3 | 情境理解 | 放进具体生活场景理解 |
| 4 | 批判理解 | 发现前提、漏洞、例外、隐性成本 |
| 5 | 生成性理解 | 迁移到新场景并提出高质量问题 |

## 理解卡片数据结构

TypeScript 定义：`types/card.ts` → `UnderstandingCard`。

| 字段 | 说明 |
|------|------|
| `id` | 唯一标识，建议 `场景-主题` 英文 kebab-case |
| `title` | 卡片标题 |
| `originalText` | 原始句子、短文或对话 |
| `scenarios` | 场景标签数组，1–3 个为宜 |
| `level` | 1–5 |
| `targetSkills` | 1–3 项认知能力 |
| `cognitiveGoal` | 本卡训练的核心认知动作（一句话） |
| `commonMisunderstanding` | 用户最常见的误解 |
| `contextStory` | 贴近青少年的情境故事 |
| `steps` | 3–5 个互动步骤（选择/判断） |
| `reflectionQuestion` | 反思问题 |
| `transferTask` | 迁移到新场景的任务 |
| `finalPrompts` | basic / deeper / applied 三层 AI 提问示例 |
| `summary` | 完成后简短总结 |

### 互动步骤 `CardStep`

- `question`、`options`（通常 4 项）、`correctAnswer`（0-based 索引）
- `explanation`：答后解释
- `feedbackCorrect` / `feedbackIncorrect`（可选）：即时鼓励语

## 代码与文件组织

```
data/
  taxonomy.ts          # 能力/场景元数据（UI、文档）
  cards/
    index.ts           # 聚合导出 understandingCards
    batch-classic.ts   # 按批次或场景拆分
    batch-network.ts
    ...
types/
  taxonomy.ts          # 枚举类型
  card.ts              # 卡片与训练结果类型
lib/
  filters.ts           # 探索页筛选
  card-helpers.ts      # defineCard / step 工厂函数
```

**扩展建议：**

- 每 50–100 张新建一个 `batch-*.ts`，在 `index.ts` 中 import 聚合。
- 未来可改为 `data/cards/json/*.json` + 构建时校验，或 CMS / API 同结构下发。
- 客户端 localStorage 键：`wendechulai_cards_v2`（与旧版区分）。

## 样板库分布（当前 30 张）

| 要求 | 数量 |
|------|------|
| 经典短句 | ≤8（当前 7） |
| 网络信息 | ≥5（当前 5） |
| 同伴 + 亲子 | ≥5（当前 6） |
| AI 使用 | ≥5（当前 5） |
| 健康 + 消费 | ≥3（当前 3） |

## 页面与内容关系

| 页面 | 作用 |
|------|------|
| `/` | 产品定位与入口 |
| `/about` | 向用户解释理解力、提问力与训练方式 |
| `/explore` | 按能力 / 场景 / 难度筛选卡片 |
| `/train?card=` | 单卡训练流 |
| `/result` | 本次能力标签与总结 |
| `/map` | 12 项能力进度（mock） |

## 后续接入 AI

- `finalPrompts` 可由模型根据 `reflectionQuestion`、`transferTask` 与答题记录生成，但结构保持不变。
- 提问能力类卡片应示范「具体、可检验、带情境」的问法，避免「帮我写作文」类模糊请求。
