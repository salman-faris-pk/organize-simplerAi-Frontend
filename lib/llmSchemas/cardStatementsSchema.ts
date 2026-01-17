
export const cardStatementsSchema = {
  $schema: "https://json-schema.org/draft-07/schema#",
  title: "Credit Card Statement",
  type: "object",
  additionalProperties: false,
  properties: {
    issuer: {
      type: "object",
      description: "Issuer of the credit card statement.",
      additionalProperties: false,
      properties: {
        name: { type: "string" ,description: "Name of the credit card issuer."},
        address: { type: "string", description:
            "Full address of the credit card issuer. If there is a newline, make the separation with a comma."},
      },
      required: ["name", "address"],
    },

    recipient: {
      type: "object",
      description: "Recipient of the credit card statement.",
      additionalProperties: false,
      properties: {
        name: { type: "string" ,description: "Name of the recipient."},
        address: { type: "string",description:
            "Full address of the recipient. If there is a newline, make the separation with a comma." },
      },
      required: ["name", "address"],
    },

    date: {
      type: "string",
      format: "date",
      description:"Date of the credit card statement. Must be in the format YYYY-MM-DD.",
    },

    credit_card: {
      type: "object",
      description: "Credit card of the credit card statement",
      additionalProperties: false,
      properties: {
        name: { type: "string", description: "Name of the credit card." },
        holder: { type: "string",description: "Name of the credit card holder." },
        number: {
          type: "string",
          pattern: "^[X*]{4} [X*]{4} [X*]{4} \\d{4}$",
          description: "Number of the credit card. Must be in the format XXXX XXXX XXXX XXXX."
        },
      },
      required: ["name", "holder", "number"],
    },

    transactions: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        description: "List of transactions of the credit card statement.",
        additionalProperties: false,
        properties: {
          description: { type: "string" ,description:"Name of the transaction, including the country code if applicable."},
          category: {
            type: "string",
            enum: [
              "food",
              "travel",
              "hobbies",
              "services",
              "shopping",
              "entertainment",
              "other",
            ],
            description:'Category of the transaction. If the category is not listed, use "other".'
          },
          amount: { type: "number", minimum: 0 ,description: "Amount of the transaction."},
        },
        required: ["description", "category", "amount"],
      },
    },

    currency: {
      type: "string",
      pattern: "^[A-Z]{3}$",
      description:"Currency of the credit card statement. It must be a valid ISO 4217 currency code.",
    },

    total_amount_due: {
      type: "number",
      minimum: 0,
      description: "Total amount due of the credit card statement.",
    },
  },

  required: [
    "issuer",
    "recipient",
    "date",
    "credit_card",
    "transactions",
    "currency",
    "total_amount_due",
  ],
};
