export default function debounce (action, time) {

    let timeout = null;

    return (...currentArguments) => {

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            action(...currentArguments);
            timeout = null;
        }, time);
    };
};
