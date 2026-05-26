import type { FinalPrompts, UnderstandingCard } from "@/types";

export interface ValidationIssue {
  field: string;
  message: string;
  severity: "error" | "warning";
}

export interface CardValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

const MIN_STEPS = 3;

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function validateFinalPrompts(fp: unknown): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!fp || typeof fp !== "object") {
    issues.push({
      field: "finalPrompts",
      message: "缺少 finalPrompts 对象",
      severity: "error",
    });
    return issues;
  }
  const p = fp as FinalPrompts;
  for (const key of ["basic", "deeper", "applied"] as const) {
    if (!hasText(p[key])) {
      issues.push({
        field: `finalPrompts.${key}`,
        message: `缺少${key === "basic" ? "基础" : key === "deeper" ? "深入" : "应用"}问题`,
        severity: "error",
      });
    }
  }
  return issues;
}

/** 内容质量检查（发布前必过项 + 建议项） */
export function validateCard(card: UnderstandingCard): CardValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  if (!hasText(card.id)) {
    errors.push({ field: "id", message: "缺少卡片 ID", severity: "error" });
  }
  if (!hasText(card.title)) {
    errors.push({ field: "title", message: "缺少标题 title", severity: "error" });
  }
  if (!hasText(card.originalText)) {
    errors.push({
      field: "originalText",
      message: "缺少原始材料 originalText",
      severity: "error",
    });
  }

  const scenarios =
    Array.isArray(card.scenarios) && card.scenarios.length > 0
      ? card.scenarios.filter((s) => hasText(s))
      : [];
  if (scenarios.length === 0) {
    errors.push({
      field: "scenarios",
      message: "缺少场景 scenarios（至少 1 个）",
      severity: "error",
    });
  }

  if (
    typeof card.level !== "number" ||
    card.level < 1 ||
    card.level > 5 ||
    !Number.isInteger(card.level)
  ) {
    errors.push({
      field: "level",
      message: "缺少或无效的难度 level（应为 1–5 整数）",
      severity: "error",
    });
  }

  if (!Array.isArray(card.targetSkills) || card.targetSkills.length === 0) {
    errors.push({
      field: "targetSkills",
      message: "缺少能力标签 targetSkills（至少 1 个）",
      severity: "error",
    });
  }

  if (!hasText(card.commonMisunderstanding)) {
    errors.push({
      field: "commonMisunderstanding",
      message: "缺少常见误解 commonMisunderstanding",
      severity: "error",
    });
  }

  if (!Array.isArray(card.steps) || card.steps.length < MIN_STEPS) {
    errors.push({
      field: "steps",
      message: `互动步骤 steps 不足（至少需要 ${MIN_STEPS} 个，当前 ${card.steps?.length ?? 0} 个）`,
      severity: "error",
    });
  } else {
    card.steps.forEach((st, i) => {
      if (!hasText(st.question)) {
        errors.push({
          field: `steps[${i}].question`,
          message: `第 ${i + 1} 步缺少题干`,
          severity: "error",
        });
      }
      const opts = st.options?.filter((o) => hasText(o)) ?? [];
      if (opts.length < 2) {
        errors.push({
          field: `steps[${i}].options`,
          message: `第 ${i + 1} 步至少需要 2 个有效选项`,
          severity: "error",
        });
      }
      if (
        typeof st.correctAnswer !== "number" ||
        st.correctAnswer < 0 ||
        st.correctAnswer >= (st.options?.length ?? 0)
      ) {
        errors.push({
          field: `steps[${i}].correctAnswer`,
          message: `第 ${i + 1} 步正确答案索引无效`,
          severity: "error",
        });
      }
      if (!hasText(st.explanation)) {
        warnings.push({
          field: `steps[${i}].explanation`,
          message: `第 ${i + 1} 步建议填写解释 explanation`,
          severity: "warning",
        });
      }
    });
  }

  errors.push(...validateFinalPrompts(card.finalPrompts));

  if (!hasText(card.summary)) {
    errors.push({
      field: "summary",
      message: "缺少总结 summary",
      severity: "error",
    });
  }

  if (!hasText(card.cognitiveGoal)) {
    warnings.push({
      field: "cognitiveGoal",
      message: "建议填写认知目标 cognitiveGoal",
      severity: "warning",
    });
  }
  if (!hasText(card.contextStory)) {
    warnings.push({
      field: "contextStory",
      message: "建议填写场景故事 contextStory",
      severity: "warning",
    });
  }
  if (!hasText(card.reflectionQuestion)) {
    warnings.push({
      field: "reflectionQuestion",
      message: "建议填写反思问题 reflectionQuestion",
      severity: "warning",
    });
  }
  if (!hasText(card.transferTask)) {
    warnings.push({
      field: "transferTask",
      message: "建议填写迁移任务 transferTask",
      severity: "warning",
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateCardIdUnique(
  cards: UnderstandingCard[],
): Map<string, string[]> {
  const dup = new Map<string, string[]>();
  const seen = new Map<string, number>();
  cards.forEach((c, index) => {
    const id = c.id?.trim() || `__index_${index}`;
    seen.set(id, (seen.get(id) ?? 0) + 1);
  });
  seen.forEach((count, id) => {
    if (count > 1) dup.set(id, [`ID「${id}」重复 ${count} 次`]);
  });
  return dup;
}

export function validateCardLibrary(cards: UnderstandingCard[]): {
  results: Map<string, CardValidationResult>;
  duplicateIds: string[];
  validCount: number;
  invalidCount: number;
} {
  const results = new Map<string, CardValidationResult>();
  const idCount = new Map<string, number>();
  cards.forEach((c) => {
    const id = c.id?.trim() || "(无ID)";
    idCount.set(id, (idCount.get(id) ?? 0) + 1);
  });

  let validCount = 0;
  let invalidCount = 0;
  cards.forEach((card) => {
    const r = validateCard(card);
    const id = card.id?.trim() || "(无ID)";
    if ((idCount.get(id) ?? 0) > 1) {
      r.errors.push({
        field: "id",
        message: `ID「${id}」在库中重复`,
        severity: "error",
      });
      r.valid = false;
    }
    results.set(card.id || `(anonymous-${results.size})`, r);
    if (r.valid) validCount++;
    else invalidCount++;
  });

  const duplicateIds = [...idCount.entries()]
    .filter(([, n]) => n > 1)
    .map(([id]) => id);

  return { results, duplicateIds, validCount, invalidCount };
}
