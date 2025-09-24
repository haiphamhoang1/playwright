export const AddBookSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "books": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "isbn": {
              "type": "string"
            }
          },
          "required": ["isbn"],
          "additionalProperties": false
        }
      }
    },
    "required": ["books"],
    "additionalProperties": false
};