// TypeScript declarations for Vercel Analytics
declare global {
  interface Window {
    va?: {
      track: (eventName: string, properties?: Record<string, any>) => void;
    };
  }
}

export {};