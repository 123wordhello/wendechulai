import { COGNITIVE_LEVEL_SHORT } from "@/types";
import type { CognitiveLevel } from "@/types";

export function LevelBadge({ level }: { level: CognitiveLevel }) {
  return (
    <span className="inline-flex rounded-md bg-brand-50 border border-brand-100 px-2 py-0.5 text-xs font-medium text-brand-700">
      L{level} · {COGNITIVE_LEVEL_SHORT[level]}
    </span>
  );
}
