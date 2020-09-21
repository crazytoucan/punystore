/**
 * A Store type included with Tinysaga. This Store can be handed directly to React-Redux
 * and will completely replace the Redux needs of some applications.
 *
 * For constructing a store, use the Store class.
 */
export interface IStore<S> {
  /**
   * Ths state of the store. Applications should feel free to reference this value directly,
   * rather than using getState().
   */
  readonly state: S;

  /**
   * Directly sets the new state of the store. If this state reference is different from the old one,
   * listeners will be notified on the next tick. If you'd like to notify listeners sooner (e.g. to
   * _synchronously_ repaint your UI), use store.flush() immediately after store.setState().
   */
  setState(nextState: S): void;

  /**
   * The state of the store as a getter function, required for React-Redux integration.
   */
  getState(): S;

  /**
   * Subscribes to changes from this store, required for React-Redux integrations. Applications
   * should generally not need to subscribe() to the Store, preferring instead to handle
   * update logic as part of their Emitter handler logic.
   *
   * @param cb
   */
  subscribe(cb: () => void): () => void;

  /**
   * Flushes any pending listener notifications synchronously, rather than waiting until the next tick.
   * The default behavior to wait a tick is to prevent multiple synchronous repaints to the same Redux tree,
   * e.g. if two different handlers for an Action both wrote to the same Store.
   */
  flush(): void;

  /**
   * Dispatches an action to this store.
   */
  dispatch(action: any): void;

  /**
   * Included for compatibility with React-Redux stores
   */
  replaceReducer(): void;
}