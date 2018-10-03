export default function debounce(action: Function, time: number) {

    let timeout: number = null;

    return (...currentArguments: any[]) => {

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            action(...currentArguments);
            timeout = null;
        }, time);
    };
};
