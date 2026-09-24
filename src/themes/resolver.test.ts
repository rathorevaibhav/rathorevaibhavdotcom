import { describe, it, expect } from "vitest";
import { selectThemeId } from "./resolver";

const available = ["aurora", "noir"];

describe("selectThemeId", () => {
  it("uses ?theme= when valid", () => {
    expect(selectThemeId({ search: "?theme=noir", stored: null, available, fallback: "aurora" })).toBe("noir");
  });
  it("ignores invalid ?theme= and falls back to stored", () => {
    expect(selectThemeId({ search: "?theme=ghost", stored: "noir", available, fallback: "aurora" })).toBe("noir");
  });
  it("uses stored when no query", () => {
    expect(selectThemeId({ search: "", stored: "noir", available, fallback: "aurora" })).toBe("noir");
  });
  it("falls back to default when nothing valid", () => {
    expect(selectThemeId({ search: "", stored: "ghost", available, fallback: "aurora" })).toBe("aurora");
  });
});
