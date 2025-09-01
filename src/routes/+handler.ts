export interface Loader {
  promise1: Promise<void>;
  promise2: Promise<void>;
}

function preventUnhandledRejections(...promises: Promise<unknown>[]) {
  for (const promise of promises) promise.catch(() => {});
}

const resolveAfter = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration));

const rejectAfter = (duration: number): Promise<void> =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error("boom")), duration),
  );

export const GET = [
  (context) => {
    const promise1 = resolveAfter(500);
    const promise2 = rejectAfter(300);

    preventUnhandledRejections(promise1, promise2);

    context.loader = {
      promise1,
      promise2,
    } as Loader;
  },
] as MarkoRun.Handler[];

