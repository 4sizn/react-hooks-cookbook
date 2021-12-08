import React, { Ref } from "react";
import useWindowSize from "./useWindowSize";
import useDimensions from "./useDimensions";

const DimensionTestComp = React.forwardRef(
  (props, ref: Ref<HTMLDivElement>) => {
    return (
      <div
        {...props}
        ref={ref}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "blue",
          resize: "both",
          overflow: "auto"
        }}
      />
    );
  }
);

export default function App() {
  const { inner, outer } = useWindowSize();
  const { ref, dimensions } = useDimensions();
  const { ref: ref2, dimensions: dimensions2 } = useDimensions();

  return (
    <div className="App">
      <h2>브라우저 사이즈 구하기</h2>
      <div>{`innerWidth:${inner.width}px, innerHeight:${inner.height}px`}</div>
      <div>{`outerWidth:${outer.width}px, outerHeight:${outer.height}px`}</div>

      <h2>컴포넌트 사이즈 구하기</h2>
      <div
        ref={ref}
        style={{
          width: 100,
          height: 100,
          backgroundColor: "yellow",
          resize: "both",
          overflow: "auto"
        }}
      />
      <div>{`width:${dimensions.width}, height:${dimensions.height}`}</div>
      <div>{`top:${dimensions.top}, right:${dimensions.right} bottom:${dimensions.bottom}, left:${dimensions.left}`}</div>
      <div>{`x:${dimensions.x}, y:${dimensions.y}`}</div>

      <DimensionTestComp ref={ref2} />
      <div>{`width:${dimensions2.width}, height:${dimensions2.height}`}</div>
      <div>{`top:${dimensions2.top}, right:${dimensions2.right} bottom:${dimensions2.bottom}, left:${dimensions.left}`}</div>
      <div>{`x:${dimensions2.x}, y:${dimensions2.y}`}</div>
    </div>
  );
}
