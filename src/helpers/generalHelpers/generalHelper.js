export const arrHasDuplicates = (arr) => arr.length !== new Set(arr).size;

export const randUrl = () => ("x".repeat(5)
    .replace(/./g, c => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]));

export const randShipId = () => ("x".repeat(2)
    .replace(/./g, c => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"[Math.floor(Math.random() * 62)]));