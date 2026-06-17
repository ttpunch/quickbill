import { getClients } from '@/modules/clients/actions'
import NewInvoiceForm from './NewInvoiceForm'

export default async function NewInvoicePage() {
  const clients = await getClients()
  return <NewInvoiceForm clients={clients} />
}
