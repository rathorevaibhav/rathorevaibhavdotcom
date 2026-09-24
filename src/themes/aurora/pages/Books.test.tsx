import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Books from "./Books";

describe("Aurora Books", () => {
  it("renders the heading and at least one book title", () => {
    render(<MemoryRouter><Books /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1, name: /books/i })).toBeInTheDocument();
    expect(screen.getByText(/Becoming a Technical Leader/i)).toBeInTheDocument();
  });
});
