type Procedure = (...args: any[]) => void

export function debounce<F extends Procedure>(
    func: F,
    waitMillisecond: number
    ): F {
    let timeoutId: number;

    return function(this: any, ...args: any[]) {
        if (timeoutId !== undefined) {
            clearTimeout(timeoutId)
        }

        const context = this;
        timeoutId = window.setTimeout(function() {
            func.apply(context, args)
        }, waitMillisecond)
    } as F
}
