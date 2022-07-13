import React from "react";
import ReactDOM from "react-dom";

interface PopParentProps {
  width: string;
  height: string;
  mainText?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: JSX.Element;
}

function PopUpParent({
  width,
  height,
  mainText,
  onClick,
  children,
}: PopParentProps): JSX.Element {
  const portalDiv = document.getElementById("portal") as HTMLElement;

  return ReactDOM.createPortal(
    <>
      <button
        className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,.2)] z-[1000]"
        onClick={onClick}
      ></button>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1000]">
        <div
          className={`${width} ${height} rounded-[12px] bg-white border-black border-2 p-[25px]`}
        >
          <div className="flex justify-between">
            <h1 className="text-2xl font-main text-main font-semibold">
              {mainText}
            </h1>
            <button
              className="text-red-500 font-main font-bold text-2xl"
              onClick={onClick}
            >
              X
            </button>
          </div>
          {/* 이부분이 children으로 들어갈 부분 */}
          <div className="h-full flex flex-col justify-evenly">{children}</div>
        </div>
      </div>
      {/* </div> */}
    </>,
    portalDiv,
  );
}

export default PopUpParent;
