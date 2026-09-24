import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Aurora Home", () => {
  beforeEach(() => {
    // SubstackPosts fetches an RSS feed in a useEffect; stub fetch so the test
    // stays offline and deterministic (no real network / unhandled rejections).
    vi.stubGlobal("fetch", () => Promise.reject(new Error("offline")));
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the hero headline and section headings", () => {
    render(<MemoryRouter><Home /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/What I work on/i)).toBeInTheDocument();
    expect(screen.getByText(/Hobbies/i)).toBeInTheDocument();
    expect(screen.getByText(/Interests/i)).toBeInTheDocument();
  });
});
