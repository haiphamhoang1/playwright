import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export class CSVHelper {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static readCSVFile(fileName: string): any[] {
        const records = parse(fs.readFileSync(path.join(path.resolve(__dirname, '../..'), `test-data/${process.env.ENVIRONMENT}/${fileName}`)), {
            columns: true,
            skip_empty_lines: true
        });
        return records;
    }
}