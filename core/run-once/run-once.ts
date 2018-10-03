export default function runOnce(action) {

    let wasRunned: boolean = false;

    return (...currentArguments): void => {
        if (!wasRunned) {
            wasRunned = true;
            return action(...currentArguments);
        } else {
            return null;
        }
    };
};
