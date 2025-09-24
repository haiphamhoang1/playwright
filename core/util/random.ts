import { faker } from "@faker-js/faker";
import { DateHelper } from "./date";

export class RandomHelper {
    static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static generateRandomEmail(email: string): string {
        return `${email}${DateHelper.getCurrentEpochTime()}@example.com`;
    }

    static generateRandomRoleName(role: string): string {
        return `${role}${DateHelper.getCurrentEpochTime()}${RandomHelper.getRandomInt(1, 1000)}`;
    }

    static generateRandomFirstName(): string {
        return faker.person.firstName();
    }

    static generateRandomLastName(): string {
        return faker.person.lastName();
    }

    static generateAliasRandomEmail(email: string): string {
        const [baseName, domain] = email.split("@");
        return `${baseName}+${DateHelper.getFormattedDate('MMddyyyyHHmmss')}@${domain}`;
    }

    static generateAliasRandomName(name: string): string {
        return `${name}+${DateHelper.getFormattedDate('MMddyyyyHHmmss')}`;
    }
}