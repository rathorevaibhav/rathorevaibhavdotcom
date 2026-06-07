import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AuroraLayout from "./Layout";

describe("AuroraLayout", () => {
  it("renders the wordmark and nav links", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<AuroraLayout />}>
            <Route index element={<div>page body</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText("Vaibhav Rathore")).toBeInTheDocument();
    expect(screen.getAllByText("Work").length).toBeGreaterThan(0);
    expect(screen.getByText("page body")).toBeInTheDocument();
  });
});
