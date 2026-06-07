import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Movies from "./Movies";

describe("Aurora Movies", () => {
  it("renders heading + the recently-watched feature + a favourite", () => {
    render(<Movies />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Recently watched/i)).toBeInTheDocument();
    expect(screen.getByText(/Interstellar/i)).toBeInTheDocument();
  });
});
