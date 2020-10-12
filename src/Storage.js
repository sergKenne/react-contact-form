class Storage {

    static setFormStorage(data) {
        localStorage.setItem("formData", JSON.stringify(data));
    }

    static getFormStorage() {
        return JSON.parse(localStorage.getItem("formData"));
    }

    static setNewForm(val) {
        localStorage.setItem("newForm", JSON.stringify(val));
    }

    static getNewForm() {
        return JSON.parse(localStorage.getItem("newForm"));
    }
}

export default Storage;