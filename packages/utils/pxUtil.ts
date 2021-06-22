
export const pxCheck = (value: string | number): string => {
    return isNaN(Number(value)) ? String(value) : `${value}px`;
};