/**
 * Vue's withModifiers function is not type safe 100%, this is just wrapper for it
 */
export declare function withEventModifiers<T extends (event: any) => any>(fn: T, modifiers: string[]): T;
