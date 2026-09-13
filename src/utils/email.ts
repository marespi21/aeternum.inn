import { Resend } from 'resend';
import { TicketApprovalEmail } from '@/emails/TicketApprovalEmail';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function sendTicketApprovalEmail({ 
  to, 
  ticketId, 
  eventTitle, 
  eventDate,
  guestName
}: { 
  to: string, 
  ticketId: string, 
  eventTitle: string, 
  eventDate: string,
  guestName?: string 
}) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${ticketId}&color=000000&bgcolor=ffffff`;
  const formattedDate = new Date(eventDate).toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  try {
    // Si no tienes un dominio verificado, Resend solo permite enviar desde onboarding@resend.dev
    // y SÓLO al correo con el que te registraste (aeternum.inn@gmail.com).
    const data = await resend.emails.send({
      from: 'AETERNUM Society <onboarding@resend.dev>',
      to: [to],
      subject: '¡Estás dentro! Tu acceso oficial a Aeternum Inn ⚡',
      react: TicketApprovalEmail({
        ticketId,
        eventTitle,
        eventDate: formattedDate,
        qrUrl,
        guestName,
      }),
    });
    
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email via Resend:', error);
    return { success: false, error };
  }
}
