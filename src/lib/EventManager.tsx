export default class EventManager {
  listeners: any

  constructor() {
    this.listeners = {}
  }

  on(event: string, listener: any) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(listener)
  }

  emit(event: string, payload: object | string) {
    if (!this.listeners[event]) return;

    this.listeners[event].forEach((listener: any) => {
      listener(payload)
    });
  }

  removeListener(event: string, listenerToRemove: any) {
    const listeners = this.listeners[event];

    if (!listeners) return;

    const filteredListeners = listeners.filter(
      (listener: any) => listener !== listenerToRemove
    );

    this.listeners[event] = filteredListeners;
  }
}

const toastEventManager = new EventManager()

function addToast1(payload: object) {
  console.log('addtoast listener1', payload)
}

function addToast2(payload: object) {
  console.log('addtoast listener1', payload)
}

toastEventManager.on('addToast', addToast1)
toastEventManager.on('addToast', addToast2)

toastEventManager.emit('addToast', { type: 'danger', text: 'Texto' })

toastEventManager.removeListener('addToast', addToast1)

toastEventManager.emit('addtoast', 'depois de remover...')

console.log(toastEventManager)
