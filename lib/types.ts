

export type FetchJsonExtractParams = {
  text: string;
  schema: object;
  refine?: boolean | { chunkSize: number; overlap: number };
};

export type JsonExtractSchemaRequestPayload = {
  model: {
    apiKey?: string;
    name: string;
  };
  jsonSchema: string;
  text: string;
  debug?: boolean;
  refine?: boolean | { chunkSize: number; overlap: number };
};
