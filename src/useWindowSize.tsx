import { useLayoutEffect, useState } from "react";

type BoxSize = {
  width: number;
  height: number;
};

type WindowSize = {
  inner: BoxSize;
  outer: BoxSize;
};

const defaultBoxSize = {
  width: 0,
  height: 0
};

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    inner: defaultBoxSize,
    outer: defaultBoxSize
  });

  useLayoutEffect(() => {
    function handleResize() {
      setWindowSize({
        inner: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        outer: {
          width: window.outerWidth,
          height: window.outerHeight
        }
      });
    }

    window.addEventListener("resize", handleResize);

    // react State가 업데이트가 되었을때 window size 구하기
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
