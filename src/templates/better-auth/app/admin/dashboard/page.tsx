"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

import { Button } from "@/components/ui/button";
import appConfig from "@/config/app";
import Dashboard from "@/config/admin/dashboard";
import Testimonials from "@/config/admin/testimonials";
import { useGetSessionQuery } from "@/lib/endpoints";
import LoadingPage from "@/components/loading-page";
import PageProtect from "@/components/page-protect";
import Content from "@/components/ui/content";

export default function AdminDashboardPage() {
  const { data: session, isPending } = useGetSessionQuery();

  const [activeTab, setActiveTab] = useState<AdminTab>(appConfig.admin.tabs[0]);

  if (isPending) {
    return <LoadingPage />;
  }

  if (session?.user?.role !== "admin") {
    return <PageProtect type="admin" />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="shadow-sm dark:border-b">
        <Content className="py-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <div className="mt-4 flex flex-wrap gap-0.5">
            {appConfig.admin.tabs.map((tab) => (
              <Button
                key={tab}
                size={"xs"}
                className="border-none capitalize duration-0"
                variant={activeTab === tab ? "default" : "outline"}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </Content>
      </div>

      <MotionConfig transition={{ duration: 0.1, ease: "easeOut" }}>
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "dashboard" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={"dashboard"}
            >
              <Dashboard />
            </motion.div>
          ) : activeTab === "testimonials" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={"testimonials"}
            >
              <Testimonials />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
