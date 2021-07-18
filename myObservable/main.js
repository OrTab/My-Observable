class Observable {

    subscribes = []

    constructor(initialValue) {
        this.value = initialValue
    }

    getValue() {
        return this.value
    }

    next(newVal) {
        this.value = newVal
        this.executeFuncs()
    }

    subscribe(func) {
        if (typeof func !== 'function') return console.warn('subscribe must get a function')
        const id = Math.random()
        this.subscribes.push({ id, func })
        func(this.value)
        return {
            id,
            unsubscribe: () => {
                this.subscribes = this.subscribes.filter(sub => sub.id !== id)
            }
        }

    }

    executeFuncs() {
        this.subscribes.forEach(({ func }) => func(this.value))
    }
}

const num$ = new Observable(2)

const subOfNum = num$.subscribe(num => {
    console.log('the value is :', num);
})

const sub2OfNum = num$.subscribe(num => {
    console.log('Second subscribe -', 'the value is :', num);
})

const str$ = new Observable('Hello')
const subOfStr = str$.subscribe(str => {
    console.log(str + ' World!')
})

sub2OfNum.unsubscribe()

num$.next([3, 5])

str$.next('Hello dear')





