"use client";

import { useParams } from "next/navigation";

export default function Event() {
  const params = useParams();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <code className="text-secondary">{JSON.stringify(params, null, 2)}</code>
    </main>
  );
}
