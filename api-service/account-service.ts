import { APIUtils } from '../core/api/api';
import { GENERATE_TOKEN } from '../constant/api-endpoint';
export class AccountService {
    static async generateToken(userName: string, password: string) {
        const data = {
            userName: userName,
            password: password,
        };

        return await APIUtils.post(`${process.env.API_URL}${GENERATE_TOKEN}`, { data: data });
    }
}