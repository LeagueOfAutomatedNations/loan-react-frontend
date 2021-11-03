import React, { PropsWithChildren, useLayoutEffect, useRef, useState } from "react";
import usePan from "./hooks/usePan";
import useScale from "./hooks/useScale";
import { ORIGIN, Point } from "./utils";

export type CanvasState = {
  offset: Point;
  buffer: Point;
  scale: number;
};

export const CanvasContext = React.createContext<CanvasState>({} as any);

export default function CanvasProvider(props: PropsWithChildren<unknown>) {
  const [buffer, setBuffer] = useState(ORIGIN)
  const [offset, startPan] = usePan();
  const ref = useRef<HTMLDivElement | null>(null);
  const scale = useScale(ref);

  useLayoutEffect(() => {
    const height = ref.current?.clientHeight ?? 0
    const width = ref.current?.clientWidth ?? 0

    // This is the application of the above formula!
    setBuffer({
      x: (width - width / scale) / 2,
      y: (height - height / scale) / 2
    })
  }, [scale, setBuffer])

  return (
    <CanvasContext.Provider
      value={{
        offset: offset, /*adjustedOffset.current,*/
        scale,
        buffer
      }}
    >
      <div ref={ref} onMouseDown={startPan} style={{ position: "relative" }}>
        {props.children}
      </div>
    </CanvasContext.Provider>
  );
}
