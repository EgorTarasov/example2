import { makeAutoObservable } from "mobx";
import PocketBase, { RecordAuthResponse, RecordModel } from 'pocketbase';
import { WorkFlowInfo } from "./models";


export class RootStore {
    pb: PocketBase
    userRecord: RecordModel | null = null;
    currentPipelineId: number | null = null;


    constructor(baseUrl: string) {
        this.pb = new PocketBase(
            baseUrl,

        )
        makeAutoObservable(this);
    }


    async login(loginInfo: { email: string, password: string }) {
        const authData = await this.pb.collection('users').authWithPassword(
            loginInfo.email,
            loginInfo.password,
        );
        this.userRecord = authData.record;
        localStorage.setItem('authToken', JSON.stringify(authData));
    }

    loadUserData() {
        const authData = localStorage.getItem('authToken');
        if (authData) {
            const parsedData = JSON.parse(authData) as RecordAuthResponse;
            this.userRecord = parsedData.record;
        }
    }

    async getToken() {
        return this.pb.authStore.isValid && await this.pb.collection('users').authRefresh();
    }
    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    async logout() {
        this.pb.authStore.clear();
    }

    async listWorkFlows() {
        const records = await this.pb.collection('workflows').getFullList<WorkFlowInfo>({
            sort: 'created',

        })
        return records;

    }

}
// @ts-ignore
export const rootStore = new RootStore(import.meta.env.VITE_API_URL as string);
