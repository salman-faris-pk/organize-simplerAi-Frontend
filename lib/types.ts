
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


