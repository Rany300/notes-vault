export default {
    "type": "object",
    "properties": {
        "title": {
            "type": "string",
            "minLength": 1,
            "maxLength": 50
        },
        "content": {
            "type": "string",
            "minLength": 1,
            "maxLength": 500
        },
        "color": {
            "type": "string",
            "enum": [
                "yellow",
                "green",
                "blue",
                "red"
            ]
        },
        "isPinned": {
            "type": "boolean"
        },
        "uid": {
            "type": "string"
        }
    },
    "required": [
        "title",
        "content",
        "color",
        "isPinned",
        "uid"
    ],
    "additionalProperties": false
};