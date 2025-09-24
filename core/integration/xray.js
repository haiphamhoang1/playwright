const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const xrayUrl = 'https://xray.cloud.getxray.app/api/v2';

async function getApiKey(clientId, clientSecret) {
    const url = `${xrayUrl}/authenticate`;
    const credentials = {
        client_id: clientId,
        client_secret: clientSecret
    };

    try {
        const response = await axios.post(url, credentials, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error obtaining API key:', error.response ? error.response.data : error.message);
        throw error;
    }
}

function getCurrentDate() {
    const now = new Date();
    const datePart = now.toISOString().split("T")[0]; // Extract YYYY-MM-DD
    const timePart = now.toISOString().split("T")[1].slice(0, 5); // Extract HH:mm
    return `${datePart} ${timePart}`;
}

function updateIssueFieldJson(issueFieldPath, testPlanKey) {
    const currentDate = getCurrentDate();

    const issueField = JSON.parse(fs.readFileSync(issueFieldPath, "utf8"));
    issueField.fields.summary = `Automation Test Execution - ${currentDate}`;

    if (testPlanKey) {
        issueField.xrayFields.testPlanKey = testPlanKey;
    }

    // Save the updated file
    const tempFilePath = "issueField_updated.json"; // New file to avoid modifying the original
    fs.writeFileSync(tempFilePath, JSON.stringify(issueField, null, 2));

    return tempFilePath;
}

async function publishTestResultWithMultipart(filePath, infoPath, clientId, clientSecret, testPlanKey) {
    const apiKey = await getApiKey(clientId, clientSecret);
    const url = `${xrayUrl}/import/execution/junit/multipart`;

    // Update issueField.json dynamically
    const updatedIssueFieldPath = updateIssueFieldJson(infoPath, testPlanKey);

    const formData = new FormData();
    formData.append('results', fs.createReadStream(filePath), { filename: 'xray-report.xml' });
    formData.append('info', fs.createReadStream(updatedIssueFieldPath), { filename: 'issueFields.json' });

    try {
        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders(),
                'Authorization': `Bearer ${apiKey}`
            }
        });
        console.log('Test result published successfully:', response.data);
    } catch (error) {
        console.error('Error publishing test result:', error.response ? error.response.data : error.message);
    }
}

// Example usage
const args = process.argv;
const filePath = args[2];
const infoPath = args[3];
const clientId = args[4]; // Replace with your actual client ID
const clientSecret = args[5]; // Replace with your actual client secret
const testPlanKey = args[6];

publishTestResultWithMultipart(filePath, infoPath, clientId, clientSecret, testPlanKey);
