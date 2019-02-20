(function () {

    const testCallSkipper = () => {
        const nativeElement = document.querySelector(".app tbody");
        let currentValue = 1;

        const test = (precision, string) => {
            currentValue++;
            return string + Math.round(precision / 100 * 100) / 100;
        };

        const render = (callSkiperValue) => {
            nativeElement.innerHTML += `
                <tr>
                    <td>${currentValue}</td>
                    <td>${callSkiperValue.value}</td>
                    <td>${callSkiperValue.currentSkippedCalls}</td>
                    <td>${callSkiperValue.wasSkipped}</td>
                </tr>
            `;
        };

        const callSkiper = CallSkiper(
            test,
            (currentCalls, currentSkippedCalls) => currentSkippedCalls < 10 && currentCalls % 2 === 0,
            null
        );
        const interval = setInterval(() => {
            render(callSkiper(currentValue, "test "));
            if (currentValue === 100) {
                window.clearInterval(interval);
            }
        }, 10);
    };

    const testDebounce = () => {
        let calls = 0;

        const test = debounce((t1, t0) => {
            console.log("run debounced task.. ", t1 - t0);
        }, 1000);

        const t0 = performance.now();
        const interval = setInterval(() => {
            const t1 = performance.now();
            if (++calls > 100) {
                clearInterval(interval);
            }
            test(t1, t0);
        }, 10);
    };

    const testRunOnce = () => {
        let calls = 0;

        const test = runOnce((string) => {
            console.log("run task only once.. ", string);
        });

        const interval = setInterval(() => {
            if (++calls > 100) {
                clearInterval(interval);
            }
            test("only once!!!");
        }, 10);
    };

    const testArrays = function () {
        const array = ["1", 2, null, undefined, false];
        const otherArray = [2, "1", false, null, undefined];

        function User(id, name) {
            this.id = id;
            this.name = name;
        };
        User.prototype.equals = function (other) {
            return Boolean(other)
                && this.id === other.id
                && this.name === other.name;
        };

        const objectArray = [new User(1, "qwe"), new User(2, "qwe")];
        const otherObjectArray = [new User(2, "qwe"), new User(1, "asd")];

        if (
            Arrays.arePrimitivesEqual(array, otherArray)
            && !Arrays.areObjectsEqual(objectArray, otherObjectArray)
            && Arrays.equals(objectArray, otherObjectArray, (a, b) => a.id === b.id)
        ) {
            console.log("Arrays works!");
        } else {
            console.log("Array doesn't works!");
        }
    };

    window.addEventListener("load", () => {
        testCallSkipper();
        testDebounce();
        testRunOnce();
        testArrays();
    });
})();
