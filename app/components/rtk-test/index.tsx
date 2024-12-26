"use client";

import { decrement, increment } from "@/app/store/services/test";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RtkTest() {
  const dispatch = useDispatch();
  const counterValue = useSelector((state: { counter: { value: number } }) => state.counter.value);

  return (
    <div className="border rounded border-solid border-black p-2 flex flex-col items-center justify-center gap-2 w-[160px]">
      <div className="flex gap-3 items-center">
        <button
          className="border rounded px-4 border-black flex justify-center items-center"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <p className="w-[20px] flex justify-center">{counterValue}</p>
        <button
          className="border rounded px-4 border-black flex justify-center items-center"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
    </div>
  );
}
