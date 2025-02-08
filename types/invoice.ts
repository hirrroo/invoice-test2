export interface InvoiceItem {
  id: string
  description: string
  quantity: number
  price: number
}

export interface Invoice {
  customerName: string
  customerEmail: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  items: InvoiceItem[]
}

