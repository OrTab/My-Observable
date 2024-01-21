class EventBus {
  events: Record<string, ((args: unknown) => void)[]> = {};

  emit(eventName: string, data?: unknown) {
    this.events[eventName]?.forEach((fn) => fn(data));
  }

  on(eventName: string, subscriber: (args: unknown) => void) {
    this.events[eventName] ||= [];
    this.events[eventName].push(subscriber);
    return () => {
      this.events[eventName] = this.events[eventName].filter(
        (fn) => fn !== subscriber
      );
    };
  }
}

const eventBus = new EventBus();

eventBus.on("loggedIn", () => {
  console.log("Should connect to socket");
});

eventBus.on("loggedIn", () => {
  console.log("Should show up welcome massage");
});

eventBus.emit("loggedIn");
