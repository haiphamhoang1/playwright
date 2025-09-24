import { BasePage } from "./base-page";
import { Element } from "../core/element/element";
import { BrowserManagement } from "../core/browser/browser-management";
import { FORM_FILE } from "../constant/file-location";

export class FormPage extends BasePage{
    firstNameTextBox: Element;
    lastNameTextBox: Element;
    emailTextBox: Element;
    genderMaleRadioButton: Element;
    genderFemaleRadioButton: Element;
    genderOtherRadioButton: Element;
    phoneTextBox: Element;
    dateOfBirthPicker: Element;
    subjectsMultiSelect: Element;
    hobbySportsCheckBoxes: Element;
    hobbyReadingCheckBoxes: Element;
    hobbyMusicCheckBoxes: Element;
    pictureUpload: Element;
    addressTextArea: Element;
    stateDropDown: Element;
    cityDropDown: Element;      
    submitButton: Element; 
    adBanner: Element; 

    constructor(){
        super();
        this.firstNameTextBox = new Element("id=firstName");    
        this.lastNameTextBox = new Element("id=lastName");
        this.emailTextBox = new Element("id=userEmail");
        this.genderMaleRadioButton = new Element('xpath=//label[@for="gender-radio-1"]');
        this.genderFemaleRadioButton = new Element('xpath=//label[@for="gender-radio-2"]');
        this.genderOtherRadioButton = new Element('xpath=//label[@for="gender-radio-3"]');

        this.phoneTextBox = new Element("id=userNumber");
        this.dateOfBirthPicker = new Element("id=dateOfBirthInput");
        this.subjectsMultiSelect = new Element("id=subjectsInput");
        this.hobbySportsCheckBoxes = new Element('xpath=//label[@for="hobbies-checkbox-1"]');
        this.hobbyReadingCheckBoxes = new Element('xpath=//label[@for="hobbies-checkbox-2"]');
        this.hobbyMusicCheckBoxes = new Element('xpath=//label[@for="hobbies-checkbox-3"]');
        this.pictureUpload = new Element("id=uploadPicture");
        this.addressTextArea = new Element("id=currentAddress");
        this.stateDropDown = new Element('xpath=//div[text()="Select State"]');
        this.cityDropDown = new Element('xpath=//div[text()="Select City"]');
        this.submitButton = new Element("id=submit");
        this.adBanner = new Element("id=fixedban");
    }

    async submitForm(firstName: string, lastName: string, email: string, gender: string, phone: string, dateOfBirth: string, subjects: string[], hobbies: string[], picture: string, address: string, state: string, city: string): Promise<void>{
        await this.prepareToSubmitForm();
        await this.firstNameTextBox.fillText(firstName);
        await this.lastNameTextBox.fillText(lastName);
        await this.emailTextBox.fillText(email);
        await this.selectGender(gender);
        await this.phoneTextBox.fillText(phone);
        await this.dateOfBirthPicker.fillText(dateOfBirth);
        await this.closeDateTimePicker();
        await this.fillSubjects(subjects);
        await this.selectHobbies(hobbies.toString());
        await this.selectFile(picture);
        await this.addressTextArea.fillText(address);
        await this.selectState(state);
        await this.selectCity(city);
        await this.submitButton.click();
        console.log("Clicked on Submit button");
    }

    async scrollToBottom(): Promise<void>{
        await this.submitButton.scrollToElement();
    }

    async hideAdBanner(): Promise<void>{
        await BrowserManagement.getCurrrentPage().evaluate(() => {
            if (this.adBanner) {
              this.adBanner.hide();
            }
          });
    }

    async prepareToSubmitForm(): Promise<void>{
        await this.hideAdBanner();
        await this.scrollToBottom();
    }

    async closeDateTimePicker(): Promise<void>{
        await this.dateOfBirthPicker.pressKey("Escape");
    }   

    async selectGender(gender: string): Promise<void> {
        if (gender === "Male") {
            console.log("Found Male Radio Button");
            await this.genderMaleRadioButton.verifyElementIsVisible();
            await this.genderMaleRadioButton.check();
        } else if (gender === "Female") {
            await this.genderFemaleRadioButton.verifyElementIsVisible();
            await this.genderFemaleRadioButton.check();
        } else {
            await this.genderOtherRadioButton.verifyElementIsVisible();
            await this.genderOtherRadioButton.check();
        }
    }

    async fillSubjects(subjects: string[]): Promise<void> {
        console.log("Filling subjects: ", subjects);
        for (const subject of subjects) {
            await this.subjectsMultiSelect.fillText(subject);
            await this.subjectsMultiSelect.pressKey("Enter");
        }
    }

    async selectHobbies(hobbies: string): Promise<void> {
        console.log("Selecting hobbies: ", hobbies);
         if (hobbies.includes("Sports")) {
            console.log("Selecting Sports hobby");
            await this.hobbySportsCheckBoxes.click();
        }
        if (hobbies.includes("Reading")) {
            console.log("Selecting Reading hobby");
            await this.hobbyReadingCheckBoxes.click();
        }
        if (hobbies.includes("Music")) {
            console.log("Selecting Music hobby");
            await this.hobbyMusicCheckBoxes.click();
        }
    }

    async selectFile(filePath: string): Promise<void> {
        filePath = FORM_FILE + filePath
        console.log("Uploading picture from: ", filePath);
        await this.pictureUpload.setInputFiles(filePath);
    }

    async selectState(state: string): Promise<void> {
        await this.stateDropDown.click();
        const selectedState = new Element(state, 1,{ exact: true});
        await selectedState.click();
    }   

    async selectCity(city: string): Promise<void> {
        await this.cityDropDown.click();
        const selectedCity = new Element(city, 1,{ exact: true});
        await selectedCity.click();
    }
}