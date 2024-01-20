type Subscription = {
  unsubscribe: () => void;
};
type Observer<T> = (arg: T) => void;

class Observable<T> {
  observers: Observer<T>[] = [];
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

  subscribe(subscriber: Observer<T>): Subscription {
    if (typeof subscriber !== "function") {
      throw new Error("subscriber must get a function");
    }
    this.observers.push(subscriber);
    subscriber(this.value);
    return {
      unsubscribe: () => {
        this.observers = this.observers.filter((fn) => fn === subscriber);
      },
    };
  }

  private notifyObservers() {
    this.observers.forEach((fn) => fn(this.value));
  }
}

const num$ = new Observable(2);

const subscription1 = num$.subscribe((num) => {
  console.log("the value is :", num);
});

const subscription2 = num$.subscribe((num) => {
  console.log("Second subscribe -", "the value is :", num);
});

const str$ = new Observable("World");
const subOfStr = str$.subscribe((str) => {
  console.log("Hello " + str + "!");
});

subscription2.unsubscribe();

num$.next(12);

str$.next("There");
