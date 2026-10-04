export type CopyValue = string | string[];

/**
 * A dictionary value is either a single string or an ordered list. Arrays are
 * used for repeated content such as bullet lists so translations keep their
 * order and can be checked at compile time.
 */
export type CopyDictionary = Record<string, CopyValue>;
