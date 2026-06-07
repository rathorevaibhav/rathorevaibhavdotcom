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
  it("exposes keyboard-operable string controls", () => {
    const { container } = render(<PlayableInstrument config={GUITAR} />);
    const hits = container.querySelectorAll('[data-hit][role="button"]');
    expect(hits.length).toBe(GUITAR.strings.length);
    expect(hits[0].getAttribute("tabindex")).toBe("0");
  });
});
