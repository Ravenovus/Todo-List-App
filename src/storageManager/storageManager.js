const STORAGEKEY = 'todolistAppData';

export const storageManager = {
    save(data){
        localStorage.setItem(STORAGEKEY, JSON.stringify(data));
    },

    load(){
        let data = localStorage.getItem(STORAGEKEY);
        return data ? JSON.parse(data) : null;
    },

    clearData(){
        localStorage.removeItem(STORAGEKEY);
    }
}