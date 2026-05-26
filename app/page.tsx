import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CARD_COUNT } from "@/data/cards";

const pillars = [
  {
    title: "不是语文题库",
    desc: "不刷标准答案，而是练「词义—关系—情境—批判—迁移」整条理解链。",
  },
  {
    title: "不是 AI 代写器",
    desc: "帮你问出更好的问题、判断 AI 回答，而不是把思考外包出去。",
  },
  {
    title: "面向真实生活",
    desc: "校园、同伴、亲子、网络、消费、健康、AI 使用……场景即战场。",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="text-center sm:text-left">
        <p className="inline-block rounded-full bg-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
          青少年认知训练 · 理解力 · 思考力 · 提问力
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          从「我看不懂」
          <br className="hidden sm:block" />
          到「我知道怎么问」
        </h1>
        <p className="mt-4 max-w-xl text-lg text-gray-600 leading-relaxed">
          <strong className="font-semibold text-gray-800">问得出来</strong>
          用结构化互动卡，训练你在真实情境里理解他人、理解信息、理解自己——并把模糊的不懂，变成可讨论的好问题。
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button href="/train">开始今日理解训练</Button>
          <Button href="/explore" variant="secondary">
            探索训练内容
          </Button>
          <Button href="/about" variant="ghost">
            了解训练体系
          </Button>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          当前样板库 {CARD_COUNT} 张 · 12 项认知能力 · 10 类场景 · 五级难度
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {pillars.map((f) => (
          <Card key={f.title} className="!p-5">
            <h3 className="font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.desc}</p>
          </Card>
        ))}
      </section>

      <Card className="bg-gradient-to-br from-brand-50 to-white">
        <h2 className="text-lg font-semibold text-gray-900">一次训练怎么走？</h2>
        <ol className="mt-4 space-y-2 text-gray-600 text-sm leading-relaxed list-decimal list-inside">
          <li>读原始材料 + 场景故事，看清本卡要练的认知动作</li>
          <li>分步互动，每一步即时反馈（对 / 错都有解释）</li>
          <li>反思与迁移：把理解用到新场景</li>
          <li>获得三层「可向 AI 提问」示例，并查看能力画像</li>
        </ol>
      </Card>
    </div>
  );
}
