import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface TicketRejectionEmailProps {
  eventTitle: string;
  eventDate: string;
  guestName?: string;
}

export const TicketRejectionEmail = ({
  eventTitle,
  eventDate,
  guestName,
}: TicketRejectionEmailProps) => {
  return (
    <Html>
      <Head>
        <style>{`
          body { background-color: #000000 !important; margin: 0; padding: 0; }
          
          /* Forzar fondos */
          .force-bg-black { background-color: #000000 !important; background-image: linear-gradient(#000000, #000000) !important; }
          .force-bg-dark { background-color: #050505 !important; background-image: linear-gradient(#050505, #050505) !important; }
          .force-bg-card { background-color: #0a0a0a !important; background-image: linear-gradient(#0a0a0a, #0a0a0a) !important; }
          
          /* Prevenir que Gmail vuelva grises/azules los textos que detecta como fechas, números o links */
          a, a[href], a:link { color: inherit !important; text-decoration: none !important; }
          span { color: inherit !important; }

          /* Forzar colores de texto incluyendo hijos inyectados por clientes de correo */
          .force-text-white, .force-text-white * { color: #ffffff !important; }
          .force-text-red, .force-text-red * { color: #ef4444 !important; }
          .force-text-brand, .force-text-brand * { color: #10b981 !important; }
        `}</style>
      </Head>
      <Preview>Actualización sobre tu compra de boletas para Aeternum Inn.</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#10b981',
                dark: '#050505',
                card: '#0a0a0a',
                red: '#ef4444'
              }
            }
          }
        }}
      >
        <Body className="bg-black font-sans my-auto mx-auto p-4 force-bg-black force-text-white">
          <div className="force-bg-black w-full">
            <Container className="mx-auto w-full max-w-[600px] border border-gray-800 rounded-xl overflow-hidden my-4 bg-[#050505] force-bg-dark">
              
              {/* HERO SECTION */}
              <Section className="bg-black py-8 border-b border-red-500/20 force-bg-black">
                <Img
                  src="https://res.cloudinary.com/dvwprigt6/image/upload/v1788903836/nkct9oqixcxuw6oianyg.png"
                  width="160"
                  alt="AETERNUM Logo"
                  className="mx-auto mb-4"
                />
                <Text className="text-red-500 text-[10px] font-mono tracking-[4px] text-center m-0 uppercase font-bold force-text-red">
                  Estado de tu Compra
                </Text>
              </Section>

              {/* INTRO */}
              <Section className="bg-[#050505] p-8 pb-4 text-center force-bg-dark">
                <Heading className="text-red-500 text-3xl font-black tracking-tight uppercase m-0 mb-4 force-text-red">
                  Compra No Procesada
                </Heading>
                
                {guestName && (
                  <Text className="text-white text-lg font-bold m-0 mb-4 text-center force-text-white">
                    Hola {guestName},
                  </Text>
                )}
                
                <Text className="text-white text-sm leading-relaxed m-0 text-center force-text-white mb-6">
                  Lamentamos informarte que tu compra no pudo ser realizada porque no cumple con los requisitos o hubo un problema al verificar tu pago.
                </Text>
                
                <Text className="text-zinc-400 text-sm leading-relaxed m-0 text-center">
                  Si crees que esto es un error, por favor contáctanos directamente a nuestro Instagram <a href="https://instagram.com/aeternum.inn" className="text-brand force-text-brand font-bold underline">@aeternum.inn</a> con tu comprobante para resolverlo lo antes posible.
                </Text>
              </Section>

              {/* EVENT DETAILS */}
              <Section className="mx-6 my-6 p-6 border border-gray-800 rounded-lg text-center bg-[#0a0a0a] force-bg-card">
                <Text className="text-gray-400 text-xs font-bold tracking-widest uppercase m-0 mb-2">Evento</Text>
                <Heading className="text-white text-xl font-bold uppercase m-0 mb-1 force-text-white">
                  {eventTitle}
                </Heading>
                <Text className="text-gray-400 text-sm m-0 capitalize">
                  {eventDate}
                </Text>
              </Section>

              {/* FOOTER */}
              <Section className="bg-black text-center p-8 border-t border-red-500/20 force-bg-black">
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

export default TicketRejectionEmail;
