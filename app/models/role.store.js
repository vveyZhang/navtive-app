class roleStore {

    roles = [];

    filterRoleName(level) {
        for (let item of this.roles) {
            if (item.Level == level) return item.Name
        }
    };

    updataRoles(roles) {
        this.roles = roles;
    }
}

export default new roleStore();
