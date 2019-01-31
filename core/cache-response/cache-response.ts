export default class CacheResponse<T> {

    /**
     * @returns Promise<T>
     */
    private _request: Function = null;

    private _cache: T = null;
    private _loadingPromise: Promise<T> = null;

    constructor(request) {
        this._request = request;
    }

    public get(...currentArguments): Promise<T> {
        if (!this._cache && !this._loadingPromise) {
            this._loadingPromise = this._request(...currentArguments)
                .then(response => {
                    this._cache = response;
                    this._loadingPromise = null;
                    return this._cache;
                });
        }
        return this._loadingPromise || Promise.resolve(this._cache);
    }

    public clear(): void {
        this._cache = null;
    }

    public reload(...currentArguments): Promise<T> {
        this.clear();
        return this.get(...currentArguments);
    }
};
