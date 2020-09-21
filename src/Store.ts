import { IStore } from "./types";
import { Chain } from "./utils/Chain";
import { defer } from "./utils/defer";

function noop() {
  // noop
}

export class Store<S> implements IStore<S> {
  private chain = new Chain();

  /**
   * Constructs a Store with the given initial state and dispatch function.
   *
   * @param state initial state
   * @param dispatch function called whenever a React component emits an Action using `dispatch()`
   */
  constructor(public state: S, public dispatch: (action: any) => void = noop) {}

  public getState() {
    return this.state;
  }

  public setState(nextState: S) {
    if (nextState !== this.state) {
      this.state = nextState;
      this.notifySubscribers();
    }
  }

  public subscribe(cb: () => void) {
    this.chain.add(cb);
    return () => this.chain.remove(cb);
  }

  public flush() {
    this.notifySubscribers.flush();
  }

  public replaceReducer() {
    // noop
  }

  private notifySubscribers = defer(() => {
    this.chain.emit();
  });
}
