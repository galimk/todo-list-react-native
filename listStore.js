import {AsyncStorage} from "react-native";

class ListStore {
    loadList(func) {
        AsyncStorage.getItem("items", (error, result) => {
            func(JSON.parse(result));
        });
    }

    saveList(items, func) {
        AsyncStorage.setItem("items", JSON.stringify(items), () => {
            func();
        });
    }
}

module.exports = new ListStore();
