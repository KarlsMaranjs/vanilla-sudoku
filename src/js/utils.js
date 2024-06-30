/**
 * @param setA {Set}
 * @param setB {Set}
 * @return {Set}
 */
export function setIntersection(setA, setB) {
    if (setA.size > setB.size) {
        [setA, setB] = [setB, setA];
    }

    const result = new Set();
    for (const value of setA) {
        if (setB.has(value)) {
            result.add(value);
        }
    }

    return result;
}