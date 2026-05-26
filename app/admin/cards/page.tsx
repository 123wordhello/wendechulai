import Link from "next/link";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";

/** 内容系统 v2 后，样板卡请编辑 data/cards/ 批次文件 */
export default function AdminCardsPage() {
  return (
    <div className="admin-shell max-w-2xl mx-auto space-y-6 py-4">
      <h1 className="text-2xl font-bold text-gray-900">内容编辑器</h1>
      <Card>
        <p className="text-gray-700 leading-relaxed">
          内容体系已升级为<strong>认知能力 × 场景 × 五级难度</strong>
          结构。当前 30 张样板卡存放在{" "}
          <code className="text-sm bg-gray-100 px-1 rounded">data/cards/</code>{" "}
          批次文件中，便于扩展到数千张。
        </p>
        <p className="mt-4 text-gray-600 text-sm leading-relaxed">
          网页可视化编辑暂未适配新字段。请直接编辑代码，或参阅项目根目录的{" "}
          <code className="bg-gray-100 px-1 rounded">CARD_AUTHORING_GUIDE.md</code>。
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button href="/explore">在探索页预览卡片</Button>
          <Button href="/about" variant="secondary">
            了解内容体系
          </Button>
        </div>
      </Card>
      <p className="text-sm text-gray-400">
        <Link href="/" className="hover:text-brand-600">
          返回首页
        </Link>
      </p>
    </div>
  );
}
