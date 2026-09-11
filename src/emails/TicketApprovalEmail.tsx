import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface TicketApprovalEmailProps {
  ticketId: string;
  eventTitle: string;
  eventDate: string;
  qrUrl: string;
  guestName?: string;
}

export const TicketApprovalEmail = ({
  ticketId,
  eventTitle,
  eventDate,
  qrUrl,
  guestName,
}: TicketApprovalEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>¡Estás dentro! Tu acceso oficial a Aeternum Inn ⚡</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://res.cloudinary.com/dvwprigt6/image/upload/v1788903836/nkct9oqixcxuw6oianyg.png"
            width="150"
            alt="AETERNUM Logo"
            style={logo}
          />
          <Text style={subtitle}>TU ACCESO ESTÁ CONFIRMADO · ¡PREPÁRATE!</Text>

          <Section style={card}>
            <Heading style={heading}>¡Pago verificado con éxito!</Heading>
            <Text style={text}>
              {guestName ? `Hola ${guestName},` : ''}
              <br />
              Ya eres parte de esta noche. Gracias por unirte a nosotros; prepárate para desconectarte del mundo y sumergirte en una atmósfera sonora y visual única. Lo que va a pasar en la pista no se repetirá.
            </Text>

            <Heading style={eventTitleStyle}>{eventTitle}</Heading>
            <Text style={dateStyle}>{eventDate}</Text>

            <Section style={qrContainer}>
              <Img src={qrUrl} width="200" height="200" alt="Ticket QR Code" style={qrCode} />
            </Section>

            <Text style={ticketIdStyle}>TICKET ID: {ticketId}</Text>
          </Section>

          <Section style={bulletsContainer}>
            <Text style={bulletText}>
              • <strong>Acceso:</strong> Presenta este código QR en pantalla directamente desde tu celular.
            </Text>
            <Text style={bulletText}>
              • <strong>Nota:</strong> Este acceso es personal, único e intransferible.
            </Text>
          </Section>

          <Text style={footerText}>
            Llega temprano, déjate llevar por el sonido y nos vemos donde la música manda: en la pista de baile.
          </Text>

          <Hr style={hr} />
          <Text style={footerBottom}>
            Medellín, Colombia<br />
            AETERNUM INN
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TicketApprovalEmail;

const main = {
  backgroundColor: '#050505',
  fontFamily: "'Courier New', Courier, monospace",
  padding: '40px 0',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
  textAlign: 'center' as const,
  border: '1px solid #1a1a1a',
  backgroundColor: '#050505',
};

const logo = {
  margin: '0 auto 10px auto',
  display: 'block',
};

const subtitle = {
  color: '#10b981',
  fontSize: '12px',
  letterSpacing: '2px',
  marginTop: '0',
  textAlign: 'center' as const,
};

const card = {
  margin: '40px 0',
  padding: '30px',
  backgroundColor: '#0a0a0a',
  border: '1px solid #10b98140',
  borderRadius: '12px',
};

const heading = {
  color: '#10b981',
  textTransform: 'uppercase' as const,
  marginBottom: '20px',
  textAlign: 'center' as const,
  fontSize: '24px',
};

const text = {
  color: '#a1a1aa',
  fontSize: '14px',
  marginBottom: '30px',
  textAlign: 'center' as const,
  lineHeight: '1.6',
};

const eventTitleStyle = {
  color: '#ffffff',
  fontSize: '24px',
  textTransform: 'uppercase' as const,
  margin: '10px 0',
  textAlign: 'center' as const,
};

const dateStyle = {
  color: '#a1a1aa',
  marginBottom: '40px',
  textTransform: 'capitalize' as const,
  textAlign: 'center' as const,
};

const qrContainer = {
  background: '#ffffff',
  padding: '15px',
  display: 'inline-block',
  borderRadius: '8px',
};

const qrCode = {
  display: 'block',
  margin: '0 auto',
};

const ticketIdStyle = {
  color: '#52525b',
  fontSize: '11px',
  marginTop: '30px',
  textAlign: 'center' as const,
};

const bulletsContainer = {
  textAlign: 'left' as const,
  margin: '0 auto',
  maxWidth: '400px',
  marginBottom: '30px',
};

const bulletText = {
  color: '#a1a1aa',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '8px 0',
};

const footerText = {
  color: '#a1a1aa',
  fontSize: '13px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
};

const hr = {
  borderColor: '#3f3f46',
  borderStyle: 'dashed',
  margin: '40px 0 20px 0',
};

const footerBottom = {
  color: '#52525b',
  fontSize: '12px',
  lineHeight: '1.5',
  textAlign: 'center' as const,
};
