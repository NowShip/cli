"use client";

import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function ClientOnly({ children }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : null;
}
