'use client'

import { Download } from 'lucide-react'
import * as xlsx from 'xlsx'

interface ExportExcelButtonProps {
  tickets: any[]
  eventTitle: string
  earlyPrice: number
  anytimePrice: number
}

export function ExportExcelButton({ tickets, eventTitle, earlyPrice, anytimePrice }: ExportExcelButtonProps) {
  const handleExport = () => {
    // 1. Formatear los datos para Excel
    const data = tickets.map((ticket) => {
      const isManual = ticket.receipt_url?.startsWith('manual_sale:')
      const email = isManual ? ticket.receipt_url.split(':')[1] : ticket.profiles?.email
      const name = isManual ? ticket.receipt_url.split(':')[2] : ticket.profiles?.full_name
      const paymentMethod = isManual ? (ticket.receipt_url.split(':')[3] || 'efectivo') : 'pasarela / app'
      const manualPhone = isManual ? ticket.receipt_url.split(':')[4] : null
      const phone = isManual ? manualPhone : ticket.profiles?.phone

      return {
        'ID / Ticket': ticket.id,
        'Nombre': name || 'Sin nombre',
        'Correo': email || 'Sin correo',
        'Teléfono': phone || 'Sin teléfono',
        'Tipo de Boleta': ticket.ticket_type || 'ANYTIME',
        'Precio Pagado': ticket.ticket_type === 'EARLY' ? earlyPrice : anytimePrice,
        'Estado': ticket.status,
        'Método de Pago': paymentMethod,
        'Fecha de Compra': new Date(ticket.created_at).toLocaleDateString('es-CO', { 
            year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' 
        }),
      }
    })

    // 2. Crear el libro y la hoja
    const worksheet = xlsx.utils.json_to_sheet(data)
    const workbook = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Boletas')

    // 3. Ajustar el ancho de las columnas
    const columnWidths = [
      { wch: 40 }, // ID / Ticket
      { wch: 30 }, // Nombre
      { wch: 30 }, // Correo
      { wch: 15 }, // Teléfono
      { wch: 15 }, // Tipo de Boleta
      { wch: 15 }, // Precio Pagado
      { wch: 15 }, // Estado
      { wch: 15 }, // Método de Pago
      { wch: 20 }, // Fecha de Compra
    ]
    worksheet['!cols'] = columnWidths

    // 4. Descargar el archivo
    const safeTitle = eventTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    xlsx.writeFile(workbook, `boletas_${safeTitle}.xlsx`)
  }

  return (
    <button 
      onClick={handleExport}
      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-sm uppercase tracking-widest px-4 py-2.5 rounded-xl transition-colors shadow-lg"
    >
      <Download className="w-4 h-4" />
      Exportar a Excel
    </button>
  )
}
