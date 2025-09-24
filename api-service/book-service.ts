import { BOOK, BOOKS } from "../constant/api-endpoint";
import { APIUtils } from "../core/api/api";
import { HeaderHelper } from "./header-helper";

export class BookService {
    static async deleteBook(token: string, bookIsbn: string, userID: string) {
        const header = HeaderHelper.createDefaultHeader(token);
        const data = {
            isbn: bookIsbn,
            userId: userID
        };

        return await APIUtils.delete(`${process.env.API_URL}${BOOK}`, { headers: header, data: data });
    }

    static async addBook(token: string, bookIsbn: string, userID: string) {
        const header = HeaderHelper.createDefaultHeader(token);
        const data = {
            userId: userID,
            collectionOfIsbns: [
                {
                    isbn: bookIsbn
                }
            ]
        };
        return await APIUtils.post(`${process.env.API_URL}${BOOKS}`, { headers: header, data: data });
    }
}