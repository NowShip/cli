import React, { Component } from "react";

import { COMPONENTS } from "@/__registry__";
import CopyButton from "./copy-button";

type Props = {
  name: string;
};

export default function UsedComponents({ name }: Props) {
  const component = COMPONENTS[name];

  if (!component) {
    return (
      <div className="text-red">There is no component with the name {name}</div>
    );
  }

  return (
    <div className="dark:bg-yellow/15 text-yellow mb-3 flex items-center justify-between rounded-md px-4 py-2 shadow-[0px_14px_6px_0px_rgba(245,158,11,0.01),0px_8px_5px_0px_rgba(245,158,11,0.02),0px_4px_4px_0px_rgba(245,158,11,0.04),0px_1px_2px_0px_rgba(245,158,11,0.04),0px_1px_0px_0px_rgba(245,158,11,0.20)_inset]">
      <div>
        <p className="font-medium">{name}.tsx</p>
      </div>
      {component.code && <CopyButton value={component.code} />}
    </div>
  );
}
