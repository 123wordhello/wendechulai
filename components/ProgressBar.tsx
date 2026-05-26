interface ProgressBarProps {
  label: string;
  description?: string;
  progress: number;
}

export function ProgressBar({
  label,
  description,
  progress,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <span className="font-medium text-gray-800">{label}</span>
          {description && (
            <p className="mt-0.5 text-sm text-gray-500">{description}</p>
          )}
        </div>
        <span className="shrink-0 text-sm font-medium text-brand-600">
          {clamped}%
        </span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-brand-100"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} 进度 ${clamped}%`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600 transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
