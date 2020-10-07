export function sleep(ms: number) {
  if (typeof ms !== 'number' || ms < 0)
    return Promise.reject(
      new Error('Invalid argument "ms", value must be a number >= 0')
    );

  return new Promise((resolve) => setTimeout(resolve, ms));
}
