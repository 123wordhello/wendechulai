import type { ContentScenario } from "@/types";

export function ScenarioBadge({ scenario }: { scenario: ContentScenario }) {
  return (
    <span className="inline-flex rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
      {scenario}
    </span>
  );
}
