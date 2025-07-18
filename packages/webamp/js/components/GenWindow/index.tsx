import * as React from "react";
import classnames from "classnames";

import * as Selectors from "../../selectors";
import { WindowId } from "../../types";
import { useTypedSelector } from "../../hooks";

interface TextProps {
  children: string;
}

const Text = ({ children }: TextProps) => {
  const letters = children.split("");
  return (
    <>
      {letters.map((letter, i) => (
        <div
          key={i}
          className={`gen-text-letter gen-text-${
            letter === " " ? "space" : letter.toLowerCase()
          }`}
        />
      ))}
    </>
  );
};

const CHROME_WIDTH = 19;
const CHROME_HEIGHT = 34;

interface WindowSize {
  width: number;
  height: number;
}

interface Props {
  windowId: WindowId;
  children: (windowSize: WindowSize) => React.ReactNode;
  title: string;
  onKeyDown?(e: KeyboardEvent): void;
}

export const GenWindow = ({ children, title, windowId }: Props) => {
  const getWindowPixelSize = useTypedSelector(Selectors.getWindowPixelSize);
  const { width, height } = getWindowPixelSize(windowId);

  return (
    <div
      className={classnames("gen-window", "window")}
      style={{ width, height, position: "relative" }}
    >
      <div className="gen-top">
        <div className="gen-top-left" />
        <div className="gen-top-left-fill" />
        <div className="gen-top-left-end" />
        <div className="gen-top-title">
          <Text>{title}</Text>
        </div>
        <div className="gen-top-right-end" />
        <div className="gen-top-right-fill" />
        <div className="gen-top-right" />
      </div>
      <div className="gen-middle">
        <div className="gen-middle-left">
          <div className="gen-middle-left-bottom" />
        </div>
        <div className="gen-middle-center">
          {children({
            width: width - CHROME_WIDTH,
            height: height - CHROME_HEIGHT,
          })}
        </div>
        <div className="gen-middle-right">
          <div className="gen-middle-right-bottom" />
        </div>
      </div>
      <div className="gen-bottom">
        <div className="gen-bottom-left" />
        <div className="gen-bottom-right" />
      </div>
    </div>
  );
};

export default GenWindow;
