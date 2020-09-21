interface IListener {
  (): void;
}

function pull<T>(arr: T[], value: T) {
  const idx = arr.indexOf(value);
  if (idx !== -1) {
    arr.splice(idx, 1);
  }
}

function noop() {
  // empty
}

function setWhere<T>(arr: T[], value: T, nextValue: T) {
  const idx = arr.indexOf(value);
  if (idx !== -1) {
    arr[idx] = nextValue;
  }
}

export class Chain {
  private emitting = false;
  private listeners: IListener[] = [];
  private nextListeners: IListener[] | null = null;

  public emit() {
    if (this.emitting) {
      throw new Error("emit() when already emitting");
    }

    this.emitting = true;
    const chain = this.listeners;
    for (let i = 0; i < chain.length; i++) {
      try {
        chain[i]();
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
      }
    }

    this.emitting = false;
    if (this.nextListeners !== null) {
      this.listeners = this.nextListeners;
      this.nextListeners = null;
    }
  }

  public add(handler: IListener) {
    if (this.emitting) {
      if (this.nextListeners === null) {
        this.nextListeners = [...this.listeners, handler];
      } else {
        this.nextListeners.push(handler);
      }
    } else {
      this.listeners.push(handler);
    }
  }

  public remove(handler: IListener) {
    if (this.emitting) {
      if (this.nextListeners === null) {
        this.nextListeners = [...this.listeners];
      }

      pull(this.nextListeners, handler);
      setWhere(this.listeners, handler, noop);
    } else {
      pull(this.listeners, handler);
    }
  }
}
