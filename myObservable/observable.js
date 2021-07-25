class Observable {

    subscribes = []
    value
    idGenerator
    constructor(initialValue) {
        this.idGenerator = generateId()
        this.value = initialValue
    }

    getValue() {
        return this.value
    }

    next(newVal) {
        this.value = newVal
        this.executeFuncs()
    }

    subscribe(subscribeFunc, isExecuteFunc = true) {
        if (typeof subscribeFunc !== 'function') return console.error('subscribe must get a function')
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

    executeFuncs() {
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



