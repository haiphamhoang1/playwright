import fs from 'fs';
import path from 'path';
import { UserData } from '../../data-object/user-data';
import { BookData } from '../../data-object/book-data';
import { FormData } from '../../data-object/form-data';

export class JsonHelper {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static readJsonFile(fileName: string): any{
        const rawData = fs.readFileSync(path.join(path.resolve(__dirname, '../..'), `test-data/${process.env.ENVIRONMENT}/${fileName}`), 'utf-8');
        return JSON.parse(rawData);
    }

    static getUserInfo(): UserData{
        const userDataJson = JsonHelper.readJsonFile("user-info.json");
        return userDataJson;
    }

    static getBookInfo(): BookData{
        const bookDataJson = JsonHelper.readJsonFile("book-info.json");
        return bookDataJson;
    }

    static getFormInfo(): FormData [] {
        const formDataJson = JsonHelper.readJsonFile("form-info.json");
        //console.log('Loaded formData:', formDataJson);
        return formDataJson;
    }

}

