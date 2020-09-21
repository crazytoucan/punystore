interface IDeferResult {
  (): void;
  flush(): void;
}

export function defer(fn: () => void) {
  let handle = 0;
  const onTimeout = () => {
    handle = 0;
    fn();
  };

  const retval = (() => {
    if (handle === 0) {
      handle = setTimeout(onTimeout);
    }
  }) as IDeferResult;

  retval.flush = () => {
    if (handle !== 0) {
      clearTimeout(handle);
      handle = 0;
      fn();
    }
  };

  return retval;
}
