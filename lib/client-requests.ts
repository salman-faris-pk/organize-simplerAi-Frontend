import {
  ReceiptRequest,
  InvoiceRequest,
  CardStatementRequest,
} from "@/lib/validations";


export async function deleteExtraction(uuid: string) {
  const res = await fetch(`/api/delete/extraction?uuid=${uuid}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export async function updateReceipt(receipt: ReceiptRequest) {
  const res = await fetch(`/api/receipts/update`, {
    method: "PUT",
    body: JSON.stringify(receipt),
  });

  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export async function updateInvoice(invoice: InvoiceRequest) {
  const res = await fetch(`/api/invoices/update`, {
    method: "PUT",
    body: JSON.stringify(invoice),
  });
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

export async function updateCardStatement(cardStatement: CardStatementRequest) {
  const res = await fetch(`/api/card-statements/update`, {
    method: "PUT",
    body: JSON.stringify(cardStatement),
  });

  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
