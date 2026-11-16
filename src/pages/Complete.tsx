import { useSearchParams } from 'react-router-dom';
import { AssessmentHeader } from '@/components/AssessmentHeader';
import { CheckCircle, Clock } from 'lucide-react';

export default function Complete() {
  const [searchParams] = useSearchParams();
  const pending = searchParams.get('pending') === '1';
  // Llegó por el link del bot de WhatsApp (token BOT-…): el resultado y el siguiente paso le llegan por ahí.
  const porWhatsApp = searchParams.get('canal') === 'wa';

  return (
    <div className="assessment-container">
      <AssessmentHeader />
      <main className="assessment-content">
        <div className="assessment-card text-center animate-scale-in">
          <div className="w-24 h-24 bg-stage-autocritica/10 rounded-full flex items-center justify-center mx-auto mb-6">
            {pending ? (
              <Clock className="w-12 h-12 text-stage-autocritica" />
            ) : (
              <CheckCircle className="w-12 h-12 text-stage-autocritica" />
            )}
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">
            {pending ? 'Respuestas guardadas' : '¡Gracias!'}
          </h1>

          {pending ? (
            <>
              <p className="text-lg text-muted-foreground leading-relaxed mb-2">
                Tuvimos un problema de conexión al enviar sus respuestas, pero quedaron guardadas en este dispositivo.
              </p>
              <p className="text-muted-foreground">
                Por favor contacte a Recursos Humanos para confirmar la recepción, o vuelva a abrir esta página desde este mismo dispositivo para reintentar el envío automáticamente.
              </p>
            </>
          ) : (
            <>
              <p className="text-lg text-muted-foreground leading-relaxed mb-2">
                Sus respuestas de esta prueba fueron enviadas correctamente.
              </p>
              <p className="text-muted-foreground">
                {porWhatsApp
                  ? 'Esta prueba es solo una parte del proceso. En unos minutos le llega por WhatsApp el resultado y, si corresponde, el siguiente paso.'
                  : 'Esta prueba es solo una parte del proceso. Recursos Humanos le contactará para indicarle el siguiente paso.'}
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
