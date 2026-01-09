export function BackgroundCards() {
  const cardNum = Array.from({ length: 12 * 8 });
  return (
    <div className="absolute flex items-center justify-center inset-0 top-0 h-screen w-full -z-10">
      <div className="absolute inset-0 bg-radial-[100%_40%_at_center] from-background via-transparent to-background" />
      <div className="grid grid-cols-[repeat(12,12rem)] grid-rows-[repeat(11,8rem)] gap-2 pt-26">
        {cardNum.map((_, idx) =>
          <div key={idx} className="rounded-xl bg-selection dark:bg-selection/10" />
        )}
      </div>
    </div>
  );
};