import React from "react";
import Content from "./ui/content";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

type Props = {
  type: "admin";
};

export default function PageProtect({ type }: Props) {
  if (type === "admin") {
    return (
      <Content className="flex h-dvh items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Access Denied</h1>
          <p className="text-muted">
            You are not authorized to access this page
          </p>
          <Button href="/" className="mt-8 rounded-full">
            <ArrowLeft className="mr-2" size={20} />
            Go back home
          </Button>
        </div>
      </Content>
    );
  }

  return <></>;
}
