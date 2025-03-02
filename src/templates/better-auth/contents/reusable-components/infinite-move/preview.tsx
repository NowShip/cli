import React from "react";

import { InfiniteMove, InfiniteMoveItem } from "./main";

export default function InfiniteMove1() {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <InfiniteMove mask="xs" whenHover="pause" duplicate={2}>
        <InfiniteMoveItem className="w-24">Item 1</InfiniteMoveItem>
        <InfiniteMoveItem className="w-48">Item 2</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 3</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 4</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 5</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 6</InfiniteMoveItem>
      </InfiniteMove>
      <InfiniteMove mask="xs" whenHover="pause" duration={20}>
        <InfiniteMoveItem className="w-24">Item 1</InfiniteMoveItem>
        <InfiniteMoveItem className="w-48">Item 2</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 3</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 4</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 5</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 6</InfiniteMoveItem>
      </InfiniteMove>
      <InfiniteMove mask="xs" whenHover="pause" direction="reverse">
        <InfiniteMoveItem className="w-24">Item 1</InfiniteMoveItem>
        <InfiniteMoveItem className="w-48">Item 2</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 3</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 4</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 5</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 6</InfiniteMoveItem>
      </InfiniteMove>

      <InfiniteMove
        mask="xs"
        direction="reverse"
        orientation="vertical"
        wrapperClassName="h-48"
        duration={10}
      >
        <InfiniteMoveItem className="w-24">Item 1</InfiniteMoveItem>
        <InfiniteMoveItem className="w-48">Item 2</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 3</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 4</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 5</InfiniteMoveItem>
        <InfiniteMoveItem className="w-24">Item 6</InfiniteMoveItem>
      </InfiniteMove>
    </div>
  );
}
