import { Resend } from 'resend';
import { TicketApprovalEmail } from '@/emails/TicketApprovalEmail';
import { TicketRejectionEmail } from '@/emails/TicketRejectionEmail';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function sendTicketApprovalEmail({ 
  to, 
  tickets, 
  eventTitle, 
  eventDate,
  guestName
}: { 
  to: string, 
  tickets: { id: string, type: string }[], 
  eventTitle: string, 
  eventDate: string,
  guestName?: string 
}) {
  const formattedDate = new Date(eventDate).toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const qrUrls = tickets.map(t => `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${t.id}&color=000000&bgcolor=ffffff`);

  try {
    // Si no tienes un dominio verificado, Resend solo permite enviar desde onboarding@resend.dev
    // y SÓLO al correo con el que te registraste (aeternum.inn@gmail.com).
    const data = await resend.emails.send({
      from: 'AETERNUM INN <tickets@aeternum-inn.com>',
      to: [to],
      subject: `¡Estás dentro! Tus boletas para Aeternum Inn ⚡`,
      react: TicketApprovalEmail({
        tickets,
        eventTitle,
        eventDate: formattedDate,
        qrUrls,
        guestName,
      }),
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return { success: false, error };
  }
}

export async function sendTicketRejectionEmail({ 
  to, 
  eventTitle, 
  eventDate,
  guestName
}: { 
  to: string, 
  eventTitle: string, 
  eventDate: string,
  guestName?: string 
}) {
  const formattedDate = new Date(eventDate).toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  try {
    const data = await resend.emails.send({
      from: 'AETERNUM INN <tickets@aeternum-inn.com>',
      to: [to],
      subject: `Actualización sobre tu compra - Aeternum Inn ❌`,
      react: TicketRejectionEmail({
        eventTitle,
        eventDate: formattedDate,
        guestName,
      }),
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Error sending rejection email via Resend:', error);
    return { success: false, error };
  }
}
