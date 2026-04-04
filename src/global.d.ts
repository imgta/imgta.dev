export {};

declare global {
  var umami: umami.umami;

  /**
 * @see {@link https://umami.is/docs/tracker-functions|Umami Docs}
 */
  namespace umami {
    interface PageViewProperties {
      website: string;
      hostname: string;
      language: string;
      referrer: string;
      screen: string;
      title: string;
      url: string;
    }

    interface EventData {
      [key: string]:
        | boolean
        | number
        | string
        | EventData
        | number[]
        | string[]
        | EventData[];
    }

    interface CustomPayload
      extends WithRequired<Partial<PageViewProperties>, "website"> {
      name?: string;
      data?: EventData;
    }

    interface umami {
      track: {
        (): Promise<void>;
        (eventName: string): Promise<void>;
        (eventName: string, eventData: EventData): Promise<void>;
        (props: CustomPayload): Promise<void>;
        (callback: (props: PageViewProperties) => CustomPayload): Promise<void>;
      };
      identify(uniqueId: string): Promise<void>;
      identify(uniqueId: string, data: EventData): Promise<void>;
      identify(data: EventData): Promise<void>;
    }
  }

  // pull the utility type into the global scope too
  type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
}