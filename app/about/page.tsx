import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { COGNITIVE_SKILLS, CONTENT_SCENARIOS } from "@/data/taxonomy";
import { COGNITIVE_LEVEL_LABELS } from "@/types";

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">我们训练什么？</h1>
        <p className="mt-2 text-gray-600 leading-relaxed">
          「问得出来」不是语文题库，也不是让 AI 替你答题。它训练你在真实情境里
          <strong className="text-gray-800">理解</strong>、
          <strong className="text-gray-800">思考</strong>，并把「看不懂」变成
          <strong className="text-gray-800">问得出</strong>的好问题。
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900">什么是理解力？</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          理解力不只是「认识每个字」。它包括：词在句里什么意思、句与句之间什么关系、
          这句话在什么情境下成立、背后默认了什么前提、有没有反例、长期会付出什么代价。
          理解力让你少被标题、口号和情绪带着走。
        </p>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900">什么是提问力？</h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          提问力不是「多问几个为什么」。它是把模糊的「我不懂」拆成：我卡在哪一层？
          我需要什么证据？这句话在什么条件下才成立？若换一个场景还成立吗？
          好问题能帮你向书本、向他人、也向 AI 要到真正有用的回答。
        </p>
      </Card>

      <Card className="bg-gradient-to-br from-brand-50 to-white">
        <h2 className="text-lg font-semibold text-gray-900">
          为什么 AI 时代更要学会提问？
        </h2>
        <ul className="mt-3 space-y-2 text-gray-700 text-sm leading-relaxed list-disc list-inside">
          <li>AI 能生成流畅答案，但不保证正确；你需要会核验、会要反面。</li>
          <li>问题越具体，AI 越能帮到你；模糊提问只会得到泛泛而谈。</li>
          <li>把思考外包给 AI，短期省事，长期可能换掉的是你自己的理解力。</li>
        </ul>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900">
          这个网站如何训练认知能力？
        </h2>
        <ol className="mt-3 space-y-2 text-gray-700 text-sm leading-relaxed list-decimal list-inside">
          <li>每张卡绑定明确的认知目标，而不是单纯背解释。</li>
          <li>用贴近生活的场景故事，把抽象句子放进真实处境。</li>
          <li>分步互动 + 即时反馈，帮你看见自己常卡在哪。</li>
          <li>反思与迁移任务，把理解用到新场景。</li>
          <li>生成基础 / 深入 / 应用三层提问，对接未来的 AI 追问。</li>
        </ol>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="!p-4">
          <h3 className="font-semibold text-gray-900 text-sm">12 项认知能力</h3>
          <p className="mt-2 text-xs text-gray-600 leading-relaxed">
            {COGNITIVE_SKILLS.join(" · ")}
          </p>
        </Card>
        <Card className="!p-4">
          <h3 className="font-semibold text-gray-900 text-sm">10 类生活场景</h3>
          <p className="mt-2 text-xs text-gray-600 leading-relaxed">
            {CONTENT_SCENARIOS.join(" · ")}
          </p>
        </Card>
      </div>

      <Card className="!p-4">
        <h3 className="font-semibold text-gray-900 text-sm">五级难度（按认知深度）</h3>
        <ul className="mt-2 space-y-1 text-xs text-gray-600">
          {([1, 2, 3, 4, 5] as const).map((l) => (
            <li key={l}>{COGNITIVE_LEVEL_LABELS[l]}</li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/explore">探索训练内容</Button>
        <Button href="/train" variant="secondary">
          开始今日训练
        </Button>
      </div>

      <p className="text-sm text-gray-400">
        创作者请参阅项目根目录的 CONTENT_SYSTEM.md 与 CARD_AUTHORING_GUIDE.md。
      </p>
    </div>
  );
}
