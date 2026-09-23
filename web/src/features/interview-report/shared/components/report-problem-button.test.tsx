// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ReportProblemButton } from "./report-problem-button";

const links = vi.hoisted(() => ({ REPORT: "" }));
vi.mock("@/config/external-links", () => ({ EXTERNAL_LINKS: links }));
afterEach(() => {
  cleanup();
  links.REPORT = "";
});

describe("ReportProblemButton", () => {
  it("問題報告URL未定の場合はリンクを表示しない", () => {
    render(<ReportProblemButton />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
  it("URL設定後は問題報告リンクを表示する", () => {
    links.REPORT = "https://example.com/report";
    render(<ReportProblemButton />);
    expect(screen.getByRole("link")).toHaveAttribute("href", links.REPORT);
  });
});
