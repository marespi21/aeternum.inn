import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS?.replace(/\s+/g, ''), // Remove spaces if they copied them
  },
});

export async function sendTicketApprovalEmail({ 
  to, 
  ticketId, 
  eventTitle, 
  eventDate 
}: { 
  to: string, 
  ticketId: string, 
  eventTitle: string, 
  eventDate: string 
}) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${ticketId}&color=000000&bgcolor=ffffff`;
  const formattedDate = new Date(eventDate).toLocaleDateString('es-CO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const html = `
    <div style="font-family: 'Courier New', Courier, monospace; background-color: #050505; color: #f4f4f5; padding: 40px 20px; max-width: 600px; margin: 0 auto; text-align: center; border: 1px solid #1a1a1a;">
      <img src="https://res.cloudinary.com/dvwprigt6/image/upload/v1788903836/nkct9oqixcxuw6oianyg.png" alt="AETERNUM Logo" width="150" style="display: block; margin: 0 auto 10px auto;" />
      <p style="color: #10b981; font-size: 12px; letter-spacing: 2px; margin-top: 0;">SOCIETY // ACCESO EXCLUSIVO</p>
      
      <div style="margin: 40px 0; padding: 30px; background-color: #0a0a0a; border: 1px solid #10b98140; border-radius: 12px;">
        <h2 style="color: #10b981; text-transform: uppercase; margin-bottom: 20px;">¡Pago Aprobado!</h2>
        <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 30px;">Tu comprobante ha sido verificado. Aquí tienes tu código QR oficial para ingresar a:</p>
        
        <h3 style="color: #ffffff; font-size: 24px; text-transform: uppercase; margin: 10px 0;">${eventTitle}</h3>
        <p style="color: #a1a1aa; margin-bottom: 40px; text-transform: capitalize;">${formattedDate}</p>
        
        <div style="background: #ffffff; padding: 15px; display: inline-block; border-radius: 8px;">
          <img src="${qrUrl}" alt="Ticket QR Code" width="200" height="200" style="display: block;" />
        </div>
        
        <p style="color: #52525b; font-size: 11px; margin-top: 30px;">TICKET ID: ${ticketId}</p>
      </div>

      <p style="color: #a1a1aa; font-size: 12px; line-height: 1.5;">
        Este código QR es único e intransferible.<br />
        Preséntalo en la entrada desde tu celular. Recibirás las coordenadas exactas de la locación 2 horas antes del evento.
      </p>
      
      <div style="margin-top: 40px; border-top: 1px dashed #3f3f46; padding-top: 20px;">
        <p style="color: #52525b; font-size: 10px;">MEDELLÍN, COLOMBIA · AETERNUM SOCIETY</p>
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: '"AETERNUM Society" <' + process.env.GMAIL_USER + '>',
      to: to,
      subject: `TICKET APROBADO // ${eventTitle}`,
      html: html,
    });
    return { success: true, data: info };
  } catch (error) {
    console.error('Error sending email via Gmail:', error);
    return { success: false, error };
  }
}
