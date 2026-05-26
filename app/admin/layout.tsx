import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "内容编辑器 — 问得出来",
  description: "管理理解卡片内容（本地存储）",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-shell">{children}</div>;
}
