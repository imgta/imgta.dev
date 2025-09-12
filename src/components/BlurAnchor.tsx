import { cn } from '@/lib/utils';

type BlurAnchorProps = {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
  edges?: 'top' | 'bottom' | 'both';
  blurPx?: number;
};

export const BlurAnchor = ({
  children,
  className,
  edges = 'both',
  bgColor = '#fafafa',
  blurPx = 4,
}: BlurAnchorProps) => {
  return (
    <div className={cn('relative', className)}
      style={
        {
          '--blur': `${blurPx}px`,
          '--tint': bgColor,
        } as React.CSSProperties
      }
    >
      {children}

      {(edges === 'top' || edges === 'both') && (
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 z-10 h-36',
            'backdrop-blur-[var(--blur)]',
            '[mask-image:linear-gradient(to_bottom,#fff_50%,transparent)]',
            'bg-[linear-gradient(to_bottom,var(--tint),transparent)]',
          )}
        />
      )}

      {(edges === 'bottom' || edges === 'both') && (
        <div
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 z-10 h-36',
            'backdrop-blur-[var(--blur)]',
            '[mask-image:linear-gradient(to_top,#fff_50%,transparent)]',
            'bg-[linear-gradient(to_top,var(--tint),transparent)]',
          )}
        />
      )}
    </div>
  );
};

export function ProgressiveBlur() {
  return (
    <BlurAnchor edges="both" blurPx={3} className="w-full">
      <div className="prose max-w-lg text-justify overflow-y-auto max-h-[450px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati, reiciendis eum vitae nostrum, temporibus repudiandae
        voluptatibus, natus iure ipsa velit odit quibusdam illum. Quaerat
        cumque laudantium libero reprehenderit perferendis quo nulla
        voluptate? Repellat tenetur labore exercitationem dicta libero
        voluptate suscipit, iusto ea assumenda. Ipsa enim, quidem atque
        modi error eaque, debitis perferendis, hic iste libero dignissimos
        ea! Quod inventore beatae aspernatur nulla rem perferendis aperiam
        at debitis delectus odit quia animi ex mollitia vero molestias
        itaque deleniti, quos exercitationem consequatur assumenda dolor?
        Quod reiciendis in similique reprehenderit commodi quo blanditiis
        nobis hic ea optio illum placeat officia alias quasi autem earum
        quos obcaecati, voluptatum corporis quisquam. Quisquam iste, quas
        explicabo omnis harum aut quam adipisci, voluptatem saepe
        accusantium doloribus repellendus amet culpa magnam ex et dolores
        accusamus commodi facere aliquam voluptatum alias? Officia
        expedita ut vel? Beatae deserunt sequi id eos libero suscipit
        totam cum, sed architecto atque quisquam et incidunt quod fuga
        ullam repellat assumenda quos ab, voluptatum sint nesciunt? Ad
        sapiente est laborum quam sint eius sequi. Eum, veniam
        dignissimos.

        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Obcaecati, reiciendis eum vitae nostrum, temporibus repudiandae
        voluptatibus, natus iure ipsa velit odit quibusdam illum. Quaerat
        cumque laudantium libero reprehenderit perferendis quo nulla
        voluptate? Repellat tenetur labore exercitationem dicta libero
        voluptate suscipit, iusto ea assumenda. Ipsa enim, quidem atque
        modi error eaque, debitis perferendis, hic iste libero dignissimos
        ea! Quod inventore beatae aspernatur nulla rem perferendis aperiam
        at debitis delectus odit quia animi ex mollitia vero molestias
        itaque deleniti, quos exercitationem consequatur assumenda dolor?
        Quod reiciendis in similique reprehenderit commodi quo blanditiis
        nobis hic ea optio illum placeat officia alias quasi autem earum
        quos obcaecati, voluptatum corporis quisquam. Quisquam iste, quas
        explicabo omnis harum aut quam adipisci, voluptatem saepe
        accusantium doloribus repellendus amet culpa magnam ex et dolores
        accusamus commodi facere aliquam voluptatum alias? Officia
        expedita ut vel? Beatae deserunt sequi id eos libero suscipit
        totam cum, sed architecto atque quisquam et incidunt quod fuga
        ullam repellat assumenda quos ab, voluptatum sint nesciunt? Ad
        sapiente est laborum quam sint eius sequi. Eum, veniam
        dignissimos.
      </div>
    </BlurAnchor>
  );
};