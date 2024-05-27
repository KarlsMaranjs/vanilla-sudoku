class Storage {

    /**
     * @type {Storage}
     */
    static instance;

    static init() {
        if (!Storage.instance) {
            Storage.instance = new Storage();
        }
        return Storage.instance;
    }

    constructor() {
    }

    set grid(grid) {
        localStorage.setItem('grid', JSON.stringify(grid));
    }

    /**
     * @return {number[][] || []}
     */
    get grid() {
        return Array.from(JSON.parse(localStorage.getItem('grid')) || []);
    }

    remove(key = 'grid') {
        localStorage.removeItem(key);
    }

    clear() {
        localStorage.clear();
    }
}

export const storage = Storage.init();