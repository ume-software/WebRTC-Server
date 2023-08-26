const mongoose = require('mongoose'); // Make sure to import mongoose


// # replace schema here
const userMongooseSchema = new mongoose.Schema({
    mail: { type: String, unique: true },
    username: { type: String },
    password: { type: String },
});

function generateMongoDBValidationSchema(mongooseSchema) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: 'object',
            required: [],
            properties: {},
        },
    };

    for (const [key, value] of Object.entries(mongooseSchema.obj)) {
        jsonSchema.$jsonSchema.required.push(key);
        jsonSchema.$jsonSchema.properties[key] = {
            bsonType: mapMongooseTypeToBSONType(value.type),
            description: value.description || key,
        };
    }

    return jsonSchema;
}

function mapMongooseTypeToBSONType(mongooseType) {
    // Map Mongoose types to BSON types
    const typeMap = {
        String: 'string',
        Number: 'double',
        Date: 'date',
        Boolean: 'bool',
        ObjectId: 'objectId',
        // ... and more as needed
    };

    return typeMap[mongooseType.name] || 'mixed';
}

const userSchemaValidation = generateMongoDBValidationSchema(userMongooseSchema);

console.log(JSON.stringify(userSchemaValidation, null, 2));
