import React from "react";

import Content from "@/components/ui/content";
import { useAdminUsersQuery } from "@/lib/endpoints";
import { DataTableDemo } from "./table";

export default function Dashboard() {
  const { data, isLoading } = useAdminUsersQuery();

  return (
    <Content className="py-8">
      <div className="bg-gray-light w-fit overflow-hidden rounded-lg border shadow-sm">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="truncate text-sm font-medium">Total Users</div>
              <div className="mt-1 text-3xl font-semibold">
                {isLoading ? "..." : data?.data?.users?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DataTableDemo />
    </Content>
  );
}
