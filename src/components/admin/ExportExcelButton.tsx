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

    // 2. Crear resumen por comprador (agrupando por correo)
    const summaryMap = new Map()
    data.forEach(row => {
      const email = row['Correo']
      if (!summaryMap.has(email)) {
        summaryMap.set(email, {
          'Nombre': row['Nombre'],
          'Correo': email,
          'Teléfono': row['Teléfono'],
          'Cantidad de Boletas': 0,
          'Total Pagado': 0,
        })
      }
      const summary = summaryMap.get(email)
      summary['Cantidad de Boletas'] += 1
      summary['Total Pagado'] += row['Precio Pagado']
    })
    const summaryData = Array.from(summaryMap.values())

    // 3. Crear el libro y las hojas
    const workbook = xlsx.utils.book_new()
    
    // Hoja 1: Todas las boletas individuales
    const worksheet1 = xlsx.utils.json_to_sheet(data)
    worksheet1['!cols'] = [
      { wch: 40 }, { wch: 30 }, { wch: 30 }, { wch: 15 }, 
      { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 20 }
    ]
    xlsx.utils.book_append_sheet(workbook, worksheet1, 'Boletas Individuales')

    // Hoja 2: Resumen por comprador
    const worksheet2 = xlsx.utils.json_to_sheet(summaryData)
    worksheet2['!cols'] = [
      { wch: 30 }, { wch: 30 }, { wch: 15 }, { wch: 20 }, { wch: 20 }
    ]
    xlsx.utils.book_append_sheet(workbook, worksheet2, 'Resumen Compradores')

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
