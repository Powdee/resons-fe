import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.example.com/event", () => {
    return HttpResponse.json([
      {
        event_id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
        name: "John",
        start_date: new Date(),
      },
    ]);
  }),
];
