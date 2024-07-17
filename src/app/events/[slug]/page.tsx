import Image from "next/image";

export default function Event() {
  return (
    <main className="flex flex-col md:p-24">
      <section className="w-full flex flex-col items-center justify-between gap-0">
        <div className="w-[520px] h-[120px]" />
        <Image
          width={720}
          height={120}
          src="/event.png"
          alt="event"
          className="absolute top-0 z-0 blur-[2px]"
        />
        <div className="w-[520px] h-[120px]" />

        <div className="relative z-1">
          <Image width={240} height={240} src="/artist.png" alt="event"></Image>
          <button className="px-3 py-2 text-white absolute bg-primary right-[-32px] bottom-[53px] border-2 border-[#B4B5B7] rounded-[16px] text-lg font-bold">
            Following
          </button>
        </div>

        <h1 className="text-white font-bold text-6xl relative z-1">Monolink</h1>

        <div className="mb-8 mt-3 relative z-1" data-index="attendes">
          <div className="flex gap-0 items-center rounded-[16px]">
            <Image
              width={42}
              height={42}
              src="/artist.png"
              alt="avatar"
              className="relative top-1 rounded-[12px]"
            />
            <Image
              width={42}
              height={42}
              src="/artist.png"
              alt="avatar"
              className="relative top-1 rounded-[12px] ml-[-18px]"
            />
            <Image
              width={42}
              height={42}
              src="/artist.png"
              alt="avatar"
              className="relative top-1 rounded-[12px] ml-[-18px]"
            />
            <Image
              width={42}
              height={42}
              src="/artist.png"
              alt="avatar"
              className="relative top-1 rounded-[12px] ml-[-18px]"
            />
            <div className="relative bg-input px-3 py-1 max-h-[32px] rounded-[12px] flex items-center text-[#B4B5B7] font-bold text-sm ml-[-18px]">
              +2000 attended
            </div>
          </div>
        </div>
      </section>

      <div data-index="videos" className="">
        <div
          data-index="videos-from-all"
          className="flex justify-between w-full"
        >
          <h3 className="text-white font-bold">Videos from All</h3>
        </div>
      </div>
    </main>
  );
}
