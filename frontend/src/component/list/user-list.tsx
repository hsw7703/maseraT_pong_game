import React from "react";
import { useState, useEffect } from "react";
import { Select } from "../../type/enum/select.enum";
import { AllUser } from "./all-user";
import { Friend } from "./freind";
import { ChatUser } from "./chat-user";
import Button from "../button/Button";
import { ChatParticipantType } from "../../type/chat-participant-type";

type UserListType = {
  participants: ChatParticipantType[] | null;
  isChatRoom: boolean;
};

export function UserList({
  isChatRoom,
  participants
}: UserListType): JSX.Element {
  const [select, setSelect] = useState<Select>(Select.FREIND);

  useEffect(() => {
    setSelect(curr => {
      if (curr === Select.FREIND) {
        if (isChatRoom) {
          return Select.CHAT_USER;
        } else {
          return Select.ALL_USER;
        }
      } else {
        return Select.FREIND;
      }
    });
  }, [isChatRoom]);

  const onFreindClick = () => {
    setSelect(Select.FREIND);
  };

  const onClick = () => {
    if (isChatRoom) setSelect(Select.CHAT_USER);
    else setSelect(Select.ALL_USER);
  };

  const pathName = window.location.pathname;
  return (
    <div className="content-box w-[300px] flex flex-col justify-start">
      <div className="w-[80%] flex justify-between mt-4 mx-3">
        <Button tag={isChatRoom ? "참여자" : "전체유저"} onClick={onClick} />
        <Button tag={"친구"} onClick={onFreindClick} />
      </div>
      <div className="border-main border-[1px] w-[80%] h-[55%] rounded-sm m-3 flex flex-col items-center overflow-y-scroll ">
        {select === Select.ALL_USER ? <AllUser /> : null}
        {select === Select.FREIND ? <Friend /> : null}
        {select === Select.CHAT_USER ? (
          <ChatUser participants={participants} />
        ) : null}
      </div>
      <div className="mt-7">
        <Button
          tag="차단 유저 목록"
          className="btn-lg text-sm font-main px-16 tracking-widest btn-unselected"
        />
      </div>
      {isChatRoom && (
        <div className="flex flex-row mt-4 justify-between w-[80%]">
          <Button
            tag="방 설정"
            className="btn-sm text-sm font-main pr-6 pl-7 tracking-widest"
          />
          <Button
            tag="나가기"
            className="btn-sm text-sm font-main pr-6 pl-7 tracking-widest"
            navlink="/chat"
          />
        </div>
      )}
    </div>
  );
}
