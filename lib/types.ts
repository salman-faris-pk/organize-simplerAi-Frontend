
type ReceiptItemInput = {
  description: string;
  quantity: string | number;
  amount: string | number;
};

export type UpdateReceiptPayload = {
  id: string;
  number?: string | null;
  category: string;
  date: string;
  time?: string | null;
  from: string;
  subtotal?: string | number | null;
  tax?: string | number | null;
  tip?: string | number | null;
  total: string | number;
  items?: ReceiptItemInput[];
};

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
