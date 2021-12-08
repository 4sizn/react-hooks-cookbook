import { Ref, useLayoutEffect, useRef, useState } from "react";
import { throttle } from "./util";

export type UseDimensionsHook = (
  liveMeasure?: boolean
) => {
  ref: Ref<HTMLElement> | undefined;
  dimensions: Dimension;
  measure: Function;
};

export type Dimension = {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  x: number;
  y: number;
};

const defaultDimension: Dimension = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  x: 0,
  y: 0
};

function getDimension(node: HTMLElement): Dimension {
  const rect = node.getBoundingClientRect();

  return {
    width: rect.width,
    height: rect.height,
    top: "y" in rect ? rect.y : rect.top,
    left: "x" in rect ? rect.x : rect.left,
    right: rect.right,
    bottom: rect.bottom,
    x: "x" in rect ? rect.x : rect.left,
    y: "y" in rect ? rect.y : rect.top
  };
}

const useDimensions: UseDimensionsHook = (liveMeasure = true) => {
  const ref = useRef<HTMLElement | null>(null);
  const node = ref.current;
  const [dimensions, setDimensions] = useState<Dimension>(defaultDimension);
  const measure = throttle(() => {
    if (node) {
      window.requestAnimationFrame(() => setDimensions(getDimension(node)));
    }
  }, 33);
  const resizeObserver = new ResizeObserver(measure);

  useLayoutEffect(() => {
    if (node) {
      measure();

      if (liveMeasure) {
        window.addEventListener("resize", measure);
        window.addEventListener("scroll", measure);
        resizeObserver.observe(node);
      }

      return () => {
        window.removeEventListener("resize", measure);
        window.removeEventListener("scroll", measure);
        resizeObserver.disconnect();
      };
    }
  }, [node]);

  return { ref, dimensions, measure };
};

export default useDimensions;
