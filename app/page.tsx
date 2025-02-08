import { InvoiceGenerator } from "../components/InvoiceGenerator"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Invoice Generator</h1>
        <InvoiceGenerator />
      </div>
    </main>
  )
}

