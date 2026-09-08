"use client";

import { QRCodeSVG } from 'qrcode.react';

export function TicketQRCode({ ticketId }: { ticketId: string }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl inline-block shadow-2xl">
      <QRCodeSVG
        value={ticketId}
        size={256}
        bgColor={"#ffffff"}
        fgColor={"#050505"}
        level={"H"}
        includeMargin={false}
      />
    </div>
  );
}
