import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SpotlightHero } from "./SpotlightHero";

describe("SpotlightHero", () => {
  it("renders headline, subhead and CTAs (3D is progressive enhancement)", () => {
    render(<MemoryRouter><SpotlightHero /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/View my work/i)).toBeInTheDocument();
    expect(screen.getByTestId("orb-fallback")).toBeInTheDocument();
  });
});
