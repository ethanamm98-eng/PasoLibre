import { X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeModal = ({
  setQrOpen,
  isOpen,
  checkInUrl,
  event,
  t,
  language,
}: {
  setQrOpen: (open: boolean) => void;
  isOpen: boolean;
  checkInUrl: string;
  event: {
    name_en: string;
    name_es: string;
  };
  t: {
    qrTitle: string;
    scanQr: string;
    pointCamera: string;
  };
  language: "en" | "es";
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-99999 max-h-screen max-w-screen overflow-hidden bg-white overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex h-screen max-h-screen max-w-screen flex-col overflow-hidden">
        <div className="flex shrink-0 items-start justify-between gap-4 bg-[#0d4db0] px-5 py-5 text-white">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
              {t.qrTitle}
            </p>

            <h3 className="mt-1 line-clamp-2 text-xl font-bold leading-tight">
              {language === "es" ? event.name_es : event.name_en}
            </h3>

            <p className="mt-1 text-sm text-blue-100">{t.scanQr}</p>
          </div>

          <button
            type="button"
            onClick={() => setQrOpen(false)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            aria-label={language === "es" ? "Cerrar" : "Close"}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden px-4 py-4 text-center">
          <div className="flex max-h-full max-w-full flex-col items-center justify-center overflow-hidden">
            <div className="flex max-h-[70vh] max-w-[85vw] items-center justify-center rounded-4xl border border-slate-200 bg-white p-4 shadow-xl">
              <QRCodeCanvas
                value={checkInUrl}
                size={450}
                bgColor="#ffffff"
                fgColor="#0d4db0"
                level="H"
                includeMargin={false}
                className="h-auto max-h-[62vh] w-auto max-w-[76vw]"
              />
            </div>

            <p className="mt-5 max-w-sm shrink-0 text-sm font-medium text-slate-500">
              {t.pointCamera}
            </p>

            <p className="mt-4 max-w-[85vw] shrink-0 truncate rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">
              {checkInUrl}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;