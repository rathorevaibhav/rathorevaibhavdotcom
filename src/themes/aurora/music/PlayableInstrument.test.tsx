import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PlayableInstrument } from "./PlayableInstrument";
import { GUITAR, MANDOLIN } from "./instrumentConfigs";

describe("PlayableInstrument", () => {
  it("renders an svg with the right number of string courses + hit lanes", () => {
    const { container } = render(<PlayableInstrument config={GUITAR} />);
    expect(container.querySelector("svg")).toBeTruthy();
    expect(container.querySelectorAll('[data-hit]').length).toBe(GUITAR.strings.length);
  });
  it("renders mandolin with 4 courses (8 visible strings)", () => {
    const { container } = render(<PlayableInstrument config={MANDOLIN} />);
    expect(container.querySelectorAll('[data-hit]').length).toBe(4);
    expect(container.querySelectorAll('.vis').length).toBe(8);
  });
});
