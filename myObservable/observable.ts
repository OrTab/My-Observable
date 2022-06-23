interface ISubscription {
  unsubscribe: () => void;
}
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
    this.executeFuncs();
  }

  subscribe(
    observer: Observer<T>,
    shouldExecuteFunc: Boolean = true
  ): ISubscription {
    if (typeof observer !== "function") {
      throw new Error("subscribe must get a function");
    }
    this.observers.push(observer);
    shouldExecuteFunc && observer(this.value);
    return {
      unsubscribe: () => {
        this.observers = this.observers.filter((sub) => sub === observer);
      },
    };
  }

  private executeFuncs() {
    this.observers.forEach((func) => func(this.value));
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
