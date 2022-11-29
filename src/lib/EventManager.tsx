export default class EventManager {
  listeners: any

  constructor() {
    this.listeners = new Map()
  }

  on(event: string, listener: any) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }

    this.listeners.get(event).push(listener)
  }

  emit(event: string, payload: object | string) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event).forEach((listener: any) => {
      listener(payload)
    });
  }

  removeListener(event: string, listenerToRemove: any) {
    const listeners = this.listeners.get(event);

    if (!listeners) return;

    const filteredListeners = listeners.filter(
      (listener: any) => listener !== listenerToRemove
    );

    this.listeners.set(event, filteredListeners)
  }
}
