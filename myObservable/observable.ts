type Subscription = {
  unsubscribe: () => void;
};
type Observer<T> = (arg: T) => void;

type ObserverOptions = {
  priority: 1 | 2 | 3 | 4 | 5;
};

class Observable<T> {
  subscribers: Partial<Record<ObserverOptions["priority"], Observer<T>[]>> = {};
  private value: T;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  getValue(): T {
    return this.value;
  }

  next(newValue: T) {
    this.value = newValue;
    this.notifyObservers();
  }

  subscribe(
    subscriber: Observer<T>,
    options: ObserverOptions = { priority: 5 }
  ): Subscription {
    if (typeof subscriber !== "function") {
      throw new Error("subscriber must get a function");
    }
    const { priority } = options;
    this.subscribers[priority] ||= [];
    this.subscribers[priority]!.push(subscriber);
    subscriber(this.value);
    return {
      unsubscribe: () => {
        this.subscribers[priority] = this.subscribers[priority]!.filter(
          (fn) => fn !== subscriber
        );
      },
    };
  }

  private notifyObservers() {
    const priorities = Object.keys(this.subscribers).sort((a, b) =>
      a > b ? -1 : 1
    );
    priorities.forEach((priority) => {
      this.subscribers[priority].forEach((fn) => fn(this.value));
    });
  }
}

const num$ = new Observable(2);

const subscription1 = num$.subscribe(
  (num) => {
    console.log("the value is :", num);
  },
  { priority: 3 }
);

const subscription2 = num$.subscribe(
  (num) => {
    console.log("Second subscribe -", "the value is :", num);
  },
  { priority: 5 }
);

const str$ = new Observable("World");
const subOfStr = str$.subscribe((str) => {
  console.log("Hello " + str + "!");
});

num$.next(12);

str$.next("There");
