import Link from "next/link";
import { Card } from "@/components/Card";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/Button";
import { skillProgressList } from "@/data/skills";
import { SKILL_META } from "@/data/taxonomy";

export default function MapPage() {
  const groups = ["理解", "推理", "社会", "元认知"] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">我的理解地图</h1>
        <p className="mt-2 text-gray-600 leading-relaxed">
          12 项认知能力的练习进度（示意数据）。完成更多训练后，这里会汇总你在各项能力上的成长。
        </p>
      </div>

      {groups.map((group) => (
        <Card key={group} className="space-y-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            {group}
          </h2>
          {skillProgressList
            .filter((item) => SKILL_META[item.skill].group === group)
            .map((item) => (
              <ProgressBar
                key={item.skill}
                label={item.label}
                description={item.description}
                progress={item.progress}
              />
            ))}
        </Card>
      ))}

      <Card className="bg-brand-50/50 border-brand-100">
        <p className="text-sm text-gray-700 leading-relaxed">
          每张训练卡会标注 1～3 项目标能力。在{" "}
          <Link href="/explore" className="text-brand-600 hover:underline">
            探索页
          </Link>{" "}
          按能力筛选，针对性补弱项。
        </p>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/train" fullWidth>
          开始今日训练
        </Button>
        <Button href="/explore" variant="secondary" fullWidth>
          按能力探索
        </Button>
      </div>
    </div>
  );
}
