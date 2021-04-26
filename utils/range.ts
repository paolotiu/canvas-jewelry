export function range(start: number, stop: number, returnNull?: false): number[];
export function range(start: number, stop: number, returnNull?: true): null[];
export function range(start: number, stop: number, returnNull = false) {
  return Array.from({ length: stop - start }, (_, i) => (returnNull ? null : start + i));
}
