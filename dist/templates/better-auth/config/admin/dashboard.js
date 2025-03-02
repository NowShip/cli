import React from "react";
import Content from "@/components/ui/content";
import { useAdminUsersQuery } from "@/lib/endpoints";
import { DataTableDemo } from "./table";
export default function Dashboard() {
    var _a, _b;
    const { data, isLoading } = useAdminUsersQuery();
    return (<Content className="py-8">
      <div className="bg-gray-light w-fit overflow-hidden rounded-lg border shadow-sm">
        <div className="p-5">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="truncate text-sm font-medium">Total Users</div>
              <div className="mt-1 text-3xl font-semibold">
                {isLoading ? "..." : ((_b = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.users) === null || _b === void 0 ? void 0 : _b.length) || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DataTableDemo />
    </Content>);
}
