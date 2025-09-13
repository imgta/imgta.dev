interface DateBlockProps {
  date?: Date | string;
}

export function DateBlock({ date }: DateBlockProps) {
  if (!date) date = new Date();

  const d = typeof date === 'string' ? new Date(date) : date;

  const YYYY = d.getFullYear().toString().split('');
  const MMM = d.toLocaleString('en-US', { month: 'short' }).toUpperCase().split('');
  const DD = d.getUTCDate().toString().padStart(2, '0').split('');

  const isoDate = d.toISOString().split('T')[0];

  return (
    <time
      dateTime={isoDate}
      className="flex flex-col max-w-fit mx-auto tabular-nums tracking-tight
      font-inter font-light text-content-700/50 dark:text-content-600/50"
    >
      <span className="flex justify-between text-base leading-none">
        {YYYY.map((char, idx) => <span key={idx}>{char}</span>)}
      </span>

      <span className="flex justify-between text-xl leading-[1.65rem]">
        {MMM.map((char, idx) => <span key={idx}>{char}</span>)}
      </span>

      <span className="flex justify-between text-[1.875rem] leading-[1.8rem]">
        {DD.map((char, idx) => <span key={idx}>{char}</span>)}
      </span>
    </time>
  );
}
