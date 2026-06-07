import { describe, it, expect } from "vitest";
import { getLatestBook, getRecentMovie, getCurrentTrack, getCurrently } from "./selectors";

describe("content selectors", () => {
  it("getLatestBook returns a book with a title", () => {
    expect(getLatestBook().title.length).toBeGreaterThan(0);
  });
  it("getRecentMovie returns the movie flagged recent", () => {
    expect(getRecentMovie().recent).toBe(true);
  });
  it("getCurrentTrack returns the first on-repeat track or undefined", () => {
    const t = getCurrentTrack();
    expect(t === undefined || typeof t.title === "string").toBe(true);
  });
  it("getCurrently bundles book + movie + track", () => {
    const c = getCurrently();
    expect(c.book.title.length).toBeGreaterThan(0);
    expect(c.movie.title.length).toBeGreaterThan(0);
  });
});
