// @ts-nocheck
interface Subscribe {
    id: Number,
    subscribeFunc: Function
}

interface Subscription {
    id: Number,
    unsubscribe: Function
}

class Observable {

    subscribes: Array<Subscribe> = []
    value: any
    private idGenerator: Generator

    constructor(initialValue: any) {
        this.idGenerator = generateId()
        this.value = initialValue
    }

    getValue(): any {
        return this.value
    }

    next(newVal: any) {
        this.value = newVal
        this.executeFuncs()
    }

    subscribe(subscribeFunc: Function, isExecuteFunc: Boolean = true): Subscription {
        if (typeof subscribeFunc !== 'function') {
            console.error('subscribe must get a function')
            return
        }
        const id = this.idGenerator.next().value
        this.subscribes.push({ id, subscribeFunc })
        isExecuteFunc && subscribeFunc(this.value)
        return {
            id,
            unsubscribe: () => {
                this.subscribes = this.subscribes.filter(sub => sub.id !== id)
            }
        }
    }

   private executeFuncs() {
        this.subscribes.forEach(({ subscribeFunc }) => subscribeFunc(this.value))
    }
}

const num$ = new Observable(2)

const subOfNum = num$.subscribe(num => {
    console.log('the value is :', num);
})

const sub2OfNum = num$.subscribe(num => {
    console.log('Second subscribe -', 'the value is :', num);
})

const str$ = new Observable('World')
const subOfStr = str$.subscribe(str => {
    console.log('Hello ' + str + '!')
})

sub2OfNum.unsubscribe()

num$.next([3, 5])

str$.next('There')


function* generateId() {
    let id = 1
    while (true) {
        yield id++
    }

}




