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
  Tailwind,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface TicketApprovalEmailProps {
  ticketIds: string[];
  eventTitle: string;
  eventDate: string;
  qrUrls: string[];
  guestName?: string;
}

export const TicketApprovalEmail = ({
  ticketIds,
  eventTitle,
  eventDate,
  qrUrls,
  guestName,
}: TicketApprovalEmailProps) => {
  return (
    <Html>
      <Head>
        <style>{`
          body { background-color: #000000 !important; margin: 0; padding: 0; }
          
          /* Forzar fondos */
          .force-bg-black { background-color: #000000 !important; background-image: linear-gradient(#000000, #000000) !important; }
          .force-bg-dark { background-color: #050505 !important; background-image: linear-gradient(#050505, #050505) !important; }
          .force-bg-card { background-color: #0a0a0a !important; background-image: linear-gradient(#0a0a0a, #0a0a0a) !important; }
          .force-bg-brand { background-color: #10b981 !important; background-image: linear-gradient(#10b981, #10b981) !important; }
          .force-bg-white { background-color: #ffffff !important; background-image: linear-gradient(#ffffff, #ffffff) !important; }
          
          /* Prevenir que Gmail vuelva grises/azules los textos que detecta como fechas, números o links */
          a, a[href], a:link { color: inherit !important; text-decoration: none !important; }
          span { color: inherit !important; }

          /* Forzar colores de texto incluyendo hijos inyectados por clientes de correo */
          .force-text-white, .force-text-white * { color: #ffffff !important; }
          .force-text-brand, .force-text-brand * { color: #10b981 !important; }
          .force-text-black, .force-text-black * { color: #000000 !important; }
          .force-text-pink, .force-text-pink * { color: #EE3485 !important; }
        `}</style>
      </Head>
      <Preview>Tu código QR oficial para Aeternum Inn está aquí. Prepárate.</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#10b981',
                dark: '#050505',
                card: '#0a0a0a',
                border: '#1f2937',
                pink: '#EE3485'
              }
            }
          }
        }}
      >
        <Body className="bg-black font-sans my-auto mx-auto p-4 force-bg-black force-text-white">
          <div className="force-bg-black w-full">
            <Container className="mx-auto w-full max-w-[600px] border border-gray-800 rounded-xl overflow-hidden my-4 bg-[#050505] force-bg-dark">
              
              {/* HERO SECTION */}
              <Section className="bg-black py-8 border-b border-brand/20 force-bg-black">
                <Img
                  src="https://res.cloudinary.com/dvwprigt6/image/upload/v1788903836/nkct9oqixcxuw6oianyg.png"
                  width="160"
                  alt="AETERNUM Logo"
                  className="mx-auto mb-4"
                />
                <Text className="text-brand text-[10px] font-mono tracking-[4px] text-center m-0 uppercase font-bold force-text-brand">
                  Acceso Oficial Confirmado
                </Text>
              </Section>

              {/* INTRO */}
              <Section className="bg-[#050505] p-8 pb-4 text-center force-bg-dark">
                <Heading className="text-brand text-3xl font-black tracking-tight uppercase m-0 mb-4 force-text-brand">
                  Estás Dentro
                </Heading>
                
                {guestName && (
                  <Text className="text-brand text-lg font-bold m-0 mb-4 text-center force-text-brand">
                    Hola {guestName}.
                  </Text>
                )}
                
                <Text className="text-white text-sm leading-relaxed m-0 text-center force-text-white">
                  Tu pago ha sido validado. Desconéctate del mundo y prepárate para sumergirte en una atmósfera sonora que no se repetirá.
                </Text>
              </Section>

              {/* EVENT DETAILS */}
              <Section className="mx-6 my-4 p-6 border border-brand/20 rounded-lg text-center bg-[#0a0a0a] force-bg-card">
                <Text className="text-white text-xs font-bold tracking-widest uppercase m-0 mb-2 force-text-white">Evento</Text>
                <Heading className="text-pink text-xl font-bold uppercase m-0 mb-1 force-text-pink">
                  {eventTitle}
                </Heading>
                <Text className="text-white text-sm m-0 capitalize force-text-white">
                  {eventDate}
                </Text>
              </Section>

              {/* TICKETS LOOP */}
              <Section className="bg-[#050505] px-6 py-4 force-bg-dark">
                <Text className="text-white text-lg font-bold text-center m-0 mb-6 border-b border-gray-800 pb-4 force-text-white">
                  Tus {ticketIds.length} Acceso{ticketIds.length > 1 ? 's' : ''} VIP
                </Text>

                {ticketIds.map((id, index) => (
                  <Section key={id} className="bg-black mb-8 border border-gray-800 rounded-xl overflow-hidden shadow-2xl force-bg-black">
                    {/* TICKET HEADER */}
                    <Section className="bg-brand py-3 text-center force-bg-brand">
                      <Text className="text-black text-xs font-black tracking-[3px] m-0 force-text-black">
                        TICKET {index + 1} / {ticketIds.length}
                      </Text>
                    </Section>
                    
                    {/* QR SECTION */}
                    <Section className="bg-white p-8 text-center force-bg-white">
                      <Img 
                        src={qrUrls[index]} 
                        width="200" 
                        height="200" 
                        alt={`QR Code ${index + 1}`} 
                        className="mx-auto" 
                      />
                    </Section>

                    {/* TEAR LINE */}
                    <Section className="bg-white px-4 force-bg-white">
                      <Hr className="border-t-2 border-dashed border-gray-300 m-0" />
                    </Section>

                    {/* TICKET FOOTER */}
                    <Section className="bg-[#050505] p-6 text-center border-t-2 border-dashed border-gray-800 force-bg-dark">
                      <Text className="text-brand text-[10px] font-bold tracking-widest uppercase m-0 mb-1 force-text-brand">
                        Código de Ingreso
                      </Text>
                      <Text className="text-white text-lg font-mono font-bold m-0 p-2 rounded force-text-white">
                        {id}
                      </Text>
                    </Section>
                  </Section>
                ))}
              </Section>

              {/* RULES */}
              <Section className="bg-[#0a0a0a] p-8 border-t border-gray-800 force-bg-card">
                <Text className="text-brand text-sm font-bold m-0 mb-4 uppercase force-text-brand">
                  Instrucciones Clave:
                </Text>
                <Row className="mb-3">
                  <Column className="w-6 align-top">
                    <Text className="text-brand font-bold m-0 text-sm force-text-brand">1.</Text>
                  </Column>
                  <Column>
                    <Text className="text-white text-sm m-0 leading-tight force-text-white">
                      Presenta este código QR desde tu celular al llegar. No lo imprimas.
                    </Text>
                  </Column>
                </Row>
                <Row className="mb-3">
                  <Column className="w-6 align-top">
                    <Text className="text-brand font-bold m-0 text-sm force-text-brand">2.</Text>
                  </Column>
                  <Column>
                    <Text className="text-white text-sm m-0 leading-tight force-text-white">
                      El brillo de tu pantalla debe estar al máximo para agilizar la entrada.
                    </Text>
                  </Column>
                </Row>
                <Row className="mb-3">
                  <Column className="w-6 align-top">
                    <Text className="text-brand font-bold m-0 text-sm force-text-brand">3.</Text>
                  </Column>
                  <Column>
                    <Text className="text-white text-sm m-0 leading-tight force-text-white">
                      Este código es de un único uso. Si se lo envías a un amigo, asegúrate de no usar el mismo.
                    </Text>
                  </Column>
                </Row>
              </Section>

              {/* FOOTER */}
              <Section className="bg-black text-center p-8 border-t border-brand/20 force-bg-black">
                <Text className="text-white text-xs italic m-0 mb-4 force-text-white">
                  "Llega temprano, déjate llevar por el sonido y nos vemos en la pista."
                </Text>
                <Text className="text-brand text-[12px] font-bold tracking-widest m-0 uppercase force-text-brand">
                  AETERNUM INN · Medellín
                </Text>
              </Section>

            </Container>
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default TicketApprovalEmail;
