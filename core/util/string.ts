export class StringUtil {
    static isAscendingSorted(arr: string[]): boolean {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1].toLowerCase() > arr[i].toLocaleLowerCase()) {
                return false;
            }
        }
        return true;
    }

    static isDescendingSorted(arr: string[]): boolean {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1].toLocaleLowerCase() < arr[i].toLocaleLowerCase()) {
                return false;
            }
        }
        return true;
    }

    static arraysAreEqual(arr1: string[], arr2: string[]): boolean {
        if (arr1.length !== arr2.length) {
            return false; // Arrays of different lengths are not equal
        }
    
        return arr1.every((value, index) => value === arr2[index]);
    }

    static compareStrings(a: string, b: string): number {
        return a.localeCompare(b);
    }
}