import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Music from "./Music";

describe("Aurora Music", () => {
  it("renders the musician intro + both instruments", () => {
    render(<Music />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    // Both instruments render as their own section headings (scoped so the
    // word also appearing in the intro/notes copy doesn't make these ambiguous).
    expect(screen.getByRole("heading", { name: /guitar/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /mandolin/i })).toBeInTheDocument();
  });
});
