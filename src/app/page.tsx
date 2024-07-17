import UpcomingEvents from "@vibepot/domains/events/upcoming";
import FeaturedHashTags from "@vibepot/domains/hashtags/featured";
import Image from "next/image";
import { redirect } from "next/navigation";
import { z } from "zod";

const HashtagSchema = z.object({
  hashtag: z.string(),
});

export default async function Home() {
  async function searchHashtag(formData: FormData) {
    "use server";

    const validatedFields = HashtagSchema.safeParse({
      hashtag: formData.get("hashtag"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Please enter a valid hashtag",
      };
    }

    // fetch data on http://localhost:8080/events/hashtags
    // use hashtag as query parameter
    // get data
    const response = await fetch("http://localhost:8080/events/by-hashtag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpYmVwb3RAY29udGFjdC5jb20iLCJleHAiOjE3MTQ2MzU2MzN9.cUrSordMbX-RWvCog-ae_kh6eUHKNNn5HAdmpDN_axc",
      },
      body: JSON.stringify({ tag: validatedFields.data.hashtag }),
    });

    const data = await response.json();
    const eventId = `${data?.event?.event_id}`;

    redirect(`/events/${eventId}`);
  }

  return (
    <main className="flex min-h-screen flex-col px-10 py-20 md:p-24">
      <header className="flex items-center justify-center mb-12">
        <Image src="/vibepot_logo.svg" alt="logo" width={150} height={100} />
      </header>
      <div className="flex flex-col items-center justify-center gap-4">
        <form action={searchHashtag} className="relative">
          <Image
            className="absolute left-[14px] top-[22px]"
            src="/hashtag_icon.svg"
            alt="hashtag"
            width={15}
            height={22}
          />
          <div className="flex items-center gap-3">
            <input
              name="hashtag"
              id="hashtag"
              required
              type="text"
              placeholder="Enter a hashtag here"
              className="bg-input pl-10 pr-20 text-white h-[60px] md:w-[520px] w-[300px] rounded-[16px] outline-none px-4 placeholder-font-bold placeholder-[white/0.12]"
            />
            <input type="submit" hidden />
            <button className="bg-secondary font-medium text-primary flex items-center justify-center h-[60px] w-[60px] rounded-[16px] outline-none px-4">
              <Image src="/qr.svg" alt="qrcode" width={18} height={18} />
            </button>
          </div>
        </form>
      </div>

      <FeaturedHashTags />
      <UpcomingEvents />
    </main>
  );
}
