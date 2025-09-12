interface DateBlockProps {
  date?: Date | string;
}

export function DateBlock({ date }: DateBlockProps) {
  if (!date) date = new Date();

  const d = typeof date === 'string' ? new Date(date) : date;

  const YYYY = d.getFullYear().toString();
  const MMM = d.toLocaleString('en-US', { month: 'short' }).toUpperCase().split('');
  const DD = d.getUTCDate().toString().padStart(2, '0').split('');

  const isoDate = d.toISOString().split('T')[0];

  return (
    <time
      dateTime={isoDate}
      className="font-neuvetica font-medium flex flex-col max-w-fit mx-auto space-y-1 tabular-nums text-lg text-content-800/80"
    >
      <span className="leading-none">{YYYY}</span>

      <span className="text-xl flex justify-between leading-3.5">
        {MMM.map(
          (char, idx) => <span key={idx}>{char}</span>)
        }
      </span>

      <span className="flex justify-between text-4xl tabular-nums leading-9">
        {DD.map(
          (char, idx) => <span key={idx}>{char}</span>)
        }
      </span>
    </time>
  );
}
