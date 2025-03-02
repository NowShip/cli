import React, { useState } from "react";
import Loader from "@/components/loader";

import Content from "@/components/ui/content";
import {
  useActionTestimonialMutation,
  useGetTestimonialsQuery,
} from "@/lib/endpoints";
import { Button } from "@/components/ui/button";
import { Archive, ArchiveRestore, EyeIcon, EyeOffIcon } from "lucide-react";
import { testimonial } from "@/db/schema";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Testimonials() {
  const [filter, setFilter] = useState<"all" | "archived" | "public">("all");

  const { data, isPending, error } = useGetTestimonialsQuery();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Content className="py-8">
      <div className="mb-8 flex items-center gap-2">
        <h3>Filter</h3>
        <Button
          variant={filter === "archived" ? "default" : "outline"}
          size="xs"
          onClick={() => {
            if (filter === "archived") {
              setFilter("all");
            } else {
              setFilter("archived");
            }
          }}
        >
          Archive
        </Button>
        <Button
          variant={filter === "public" ? "default" : "outline"}
          size="xs"
          onClick={() => {
            if (filter === "public") {
              setFilter("all");
            } else {
              setFilter("public");
            }
          }}
        >
          Public
        </Button>
      </div>

      {isPending ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-4">
          {data
            ?.filter((testimonial) => {
              if (filter === "all") return !testimonial.archived;
              if (filter === "archived") return testimonial.archived;
              if (filter === "public") return testimonial.public;
            })
            .map((testimonial) => (
              <TestimonialCard key={testimonial.id} value={testimonial} />
            ))}
        </div>
      )}

      {data?.length === 0 && <div>No testimonials found</div>}
    </Content>
  );
}

function TestimonialCard({
  value,
}: {
  value: (typeof testimonial)["$inferSelect"];
}) {
  return (
    <div className="flex justify-between gap-4 rounded-lg border p-4 shadow-sm">
      <div className="flex gap-4">
        <Avatar className="border">
          <AvatarImage src={value.image || ""} />
          <AvatarFallback>{value.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-2">
          <small className="text-muted-foreground text-sm">{value.email}</small>
          <p className="text-foreground">{value.content}</p>
        </div>
      </div>
      <div className="flex gap-2 self-start">
        <PublicIcon id={value.id} publicValue={value.public} />
        <ArchiveIcon id={value.id} archived={value.archived} />
      </div>
    </div>
  );
}

function PublicIcon({ id, publicValue }: { id: string; publicValue: boolean }) {
  const actionTestimonial = useActionTestimonialMutation();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        actionTestimonial.mutate({
          id,
          publicValue: !publicValue,
        })
      }
    >
      {publicValue ? <EyeIcon /> : <EyeOffIcon />}
    </Button>
  );
}

function ArchiveIcon({ id, archived }: { id: string; archived: boolean }) {
  const actionTestimonial = useActionTestimonialMutation();

  return archived ? (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        actionTestimonial.mutate({
          id,
          archived: false,
        })
      }
    >
      <ArchiveRestore />
    </Button>
  ) : (
    <Button
      variant="destructive"
      size="icon"
      onClick={() =>
        actionTestimonial.mutate({
          id,
          archived: true,
        })
      }
    >
      <Archive />
    </Button>
  );
}
