export class HeaderHelper {
    static createDefaultHeader(token: string): Record<string, string>{
        return {
            Authorization:`Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };
}