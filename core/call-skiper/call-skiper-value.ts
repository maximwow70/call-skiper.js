export default class CallSkiperValue {

    private _value: any = null;
    public get value(): any {
        return this._value;
    }

    private _currentCalls: number = null;
    public get currentCalls(): number {
        return this._currentCalls;
    }

    private _currentSkippedCalls: number = null;
    public get currentSkippedCalls(): number {
        return this._currentSkippedCalls;
    }

    private _wasSkipped: boolean = null;
    public get wasSkipped(): boolean {
        return this._wasSkipped;
    }

    constructor(
        value: any,
        currentCalls: number,
        currentSkippedCalls: number,
        wasSkipped: boolean
    ) {
        this._value = value;
        this._currentCalls = currentCalls;
        this._currentSkippedCalls = currentSkippedCalls;
        this._wasSkipped = wasSkipped;
    }
};
