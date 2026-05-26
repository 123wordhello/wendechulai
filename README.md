# 问得出来

帮助青少年训练**理解力、思考力与提问力**的互动网站（MVP）。

- 技术栈：Next.js（App Router）+ React + TypeScript + Tailwind CSS
- 内容：本地 `data/cards/`（30 张样板卡），可扩展至数千张
- 文档：[CONTENT_SYSTEM.md](./CONTENT_SYSTEM.md) · [CARD_AUTHORING_GUIDE.md](./CARD_AUTHORING_GUIDE.md)

## 页面

| 路径 | 说明 |
|------|------|
| `/` | 首页：产品定位 |
| `/about` | 训练体系说明 |
| `/explore` | 按能力 / 场景 / 难度筛选 |
| `/train` | 训练（支持 `?card=id`） |
| `/result` | 本次训练结果 |
| `/map` | 12 项认知能力地图（mock） |

## 本地启动

```bash
npm install
npm run dev
```

打开 http://localhost:3000

```bash
npm run build
npm start
```

## 项目结构

```
types/           taxonomy.ts · card.ts
data/
  taxonomy.ts    能力与场景元数据
  cards/         批次化卡片（batch-*.ts → index.ts）
app/             页面
components/      UI 与 TrainFlow
lib/             filters · cards-storage · card-helpers
```

## 内容体系概要

- **12 项认知能力**（词义理解 → 提问能力）
- **10 类生活场景**（经典短句、网络信息、AI 使用等）
- **五级难度**（字面理解 → 生成性理解）

详见 CONTENT_SYSTEM.md。
