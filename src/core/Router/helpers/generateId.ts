export const generateId: () => string = (() => {
    let value: number = 0;

    return () => (value++).toString();
})();