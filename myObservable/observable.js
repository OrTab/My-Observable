
class Observable {
    subscribers = [];
    value;

    constructor(initialValue) {
        this.value = initialValue;
    }

    getValue() {
        return this.value;
    }

    next(newValue) {
        this.value = newValue;
        this.executeFuncs();
    }

    subscribe(
        subscribeFunc,
        shouldExecuteFunc = true
    ) {
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

    executeFuncs() {
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
