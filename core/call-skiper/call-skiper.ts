import CallSkiperValue from "./call-skiper-value";

export default function CallSkiper(
    action: Function,
    shouldSkip: Function = null,
    maxSkipNumber: number = null
) {
    let currentCalls: number = 0;
    let currentSkippedCalls: number = 0;

    const canSkip = (): boolean => {
        return !Boolean(maxSkipNumber) || currentSkippedCalls < maxSkipNumber;
    };

    return (...actionArguments: any[]): CallSkiperValue => {
        const isSkipRequire: boolean = canSkip()
            && (!Boolean(shouldSkip) || shouldSkip(currentCalls, currentSkippedCalls, maxSkipNumber));
        return new CallSkiperValue(
            isSkipRequire ? null : action(...actionArguments),
            ++currentCalls,
            isSkipRequire ? ++currentSkippedCalls : currentSkippedCalls,
            isSkipRequire
        );
    };
};
