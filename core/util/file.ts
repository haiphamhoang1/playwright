import * as fs from 'fs';
import * as path from 'path';

export class FileHelper {
    static writeFile(fileLocation: string, content: string){
        fs.writeFile(path.join(path.resolve(__dirname, '../..'), fileLocation), content, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } 
        });
    };
}