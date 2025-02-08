"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { Invoice, InvoiceItem as InvoiceItemType } from "../types/invoice"
import { InvoiceItem } from "./InvoiceItem"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePDF } from "react-to-pdf"

export function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<Invoice>({
    customerName: "",
    customerEmail: "",
    invoiceNumber: "",
    invoiceDate: "",
    dueDate: "",
    items: [],
  })

  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" })

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, { id: uuidv4(), description: "", quantity: 1, price: 0 }],
    }))
  }

  const updateItem = (id: string, field: keyof InvoiceItemType, value: string | number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    }))
  }

  const deleteItem = (id: string) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const updateInvoice = (field: keyof Invoice, value: string) => {
    setInvoice((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTotal = () => {
    return invoice.items.reduce((total, item) => total + item.quantity * item.price, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toPDF()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Generator</CardTitle>
        </CardHeader>
        <CardContent ref={targetRef}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={invoice.customerName}
                onChange={(e) => updateInvoice("customerName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">Customer Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={invoice.customerEmail}
                onChange={(e) => updateInvoice("customerEmail", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) => updateInvoice("invoiceNumber", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                type="date"
                value={invoice.invoiceDate}
                onChange={(e) => updateInvoice("invoiceDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={invoice.dueDate}
                onChange={(e) => updateInvoice("dueDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Invoice Items</h3>
            {invoice.items.map((item) => (
              <InvoiceItem key={item.id} item={item} onUpdate={updateItem} onDelete={deleteItem} />
            ))}
            <Button type="button" onClick={addItem} className="mt-2">
              Add Item
            </Button>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold">Total: ¥{calculateTotal().toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
      <Button type="submit" className="mt-4">
        Generate Invoice PDF
      </Button>
    </form>
  )
}

