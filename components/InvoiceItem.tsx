import type { InvoiceItem as InvoiceItemType } from "../types/invoice"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface InvoiceItemProps {
  item: InvoiceItemType
  onUpdate: (id: string, field: keyof InvoiceItemType, value: string | number) => void
  onDelete: (id: string) => void
}

export function InvoiceItem({ item, onUpdate, onDelete }: InvoiceItemProps) {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <Input
        type="text"
        value={item.description}
        onChange={(e) => onUpdate(item.id, "description", e.target.value)}
        placeholder="Description"
        className="flex-grow"
      />
      <Input
        type="number"
        value={item.quantity}
        onChange={(e) => onUpdate(item.id, "quantity", Number.parseInt(e.target.value))}
        placeholder="Quantity"
        className="w-20"
      />
      <Input
        type="number"
        value={item.price}
        onChange={(e) => onUpdate(item.id, "price", Number.parseFloat(e.target.value))}
        placeholder="Price"
        className="w-24"
      />
      <Button variant="destructive" onClick={() => onDelete(item.id)}>
        Delete
      </Button>
    </div>
  )
}

