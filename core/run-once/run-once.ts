export default function runOnce(action: Function) {

    let wasRunned: boolean = false;

    return (...currentArguments: any[]): any => {
        if (!wasRunned) {
            wasRunned = true;
            return action(...currentArguments);
        } else {
            return null;
        }
    };
};
