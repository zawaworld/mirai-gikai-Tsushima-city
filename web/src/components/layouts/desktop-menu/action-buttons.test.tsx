// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DesktopMenuActionButtons } from "./action-buttons";

const config = vi.hoisted(() => ({
  siteName: "みらい議会ー対馬市版",
  externalLinks: { aboutNote: "", donation: "https://example.com/donate" },
  features: { showTeamMiraiSection: false },
}));
vi.mock("@/config/site.config", () => ({ siteConfig: config }));

afterEach(() => {
  cleanup();
  config.externalLinks.aboutNote = "";
  config.features.showTeamMiraiSection = false;
});

describe("DesktopMenuActionButtons", () => {
  it("未設定の紹介リンクと非公式運営時の寄附リンクを表示しない", () => {
    render(<DesktopMenuActionButtons />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
  it("設定済みの紹介記事だけを表示する", () => {
    config.externalLinks.aboutNote = "https://example.com/about";
    render(<DesktopMenuActionButtons />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://example.com/about"
    );
    expect(screen.queryByText("寄附で応援する")).not.toBeInTheDocument();
  });
  it("公式セクション有効時は寄附リンクを表示する", () => {
    config.features.showTeamMiraiSection = true;
    render(<DesktopMenuActionButtons />);
    expect(
      screen.getByRole("link", { name: /寄附で応援する/ })
    ).toHaveAttribute("href", "https://example.com/donate");
  });
});
