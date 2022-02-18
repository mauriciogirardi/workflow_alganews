import { User } from "sdk/@types";
import { Service } from "sdk/Service";

export class UserService extends Service {
    static getAllEditors() {
        return this.Http
            .get<User.EditorSummary[]>('/users/editors')
            .then(this.getData)
    }

    static getExistingEditor(id: number) {
        return this.Http
            .get<User.EditorDetailed>(`/users/editors/${id}`)
            .then(this.getData)
    }

    static getDetailedUser(userId: number) {
        return this.Http
            .get<User.Detailed>(`/users/${userId}`)
            .then(this.getData)
    }
}
