interface ISubscription {
  unsubscribe: () => void;
}
type TSubscriber = <T>(arg: T) => void;

class Observable<T> {
  subscribers: TSubscriber[] = [];
  value;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  getValue(): T {
    return this.value;
  }

  next<T>(newValue: T) {
    this.value = newValue;
    this.executeFuncs();
  }

  subscribe(
    subscribeFunc: TSubscriber,
    shouldExecuteFunc: Boolean = true
  ): ISubscription {
    if (typeof subscribeFunc !== "function") {
      throw new Error("subscribe must get a function");
    }
    this.subscribers.push(subscribeFunc);
    shouldExecuteFunc && subscribeFunc(this.value);
    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter(
          (sub) => sub === subscribeFunc
        );
      },
    };
  }

  private executeFuncs() {
    this.subscribers.forEach((func) => func(this.value));
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

num$.next([3, 5]);

str$.next("There");
