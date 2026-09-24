import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Work from "./Work";

describe("Aurora Work", () => {
  it("renders the heading and a role from the content layer", () => {
    render(<MemoryRouter><Work /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1, name: /professional journey/i })).toBeInTheDocument();
    expect(screen.getByText(/Senior Software Engineer/i)).toBeInTheDocument();
  });
});
