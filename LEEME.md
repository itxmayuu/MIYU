# 🔥 GymWarm & Stretch — Tu App de Calentamiento y Estiramiento

Una aplicación web progresiva (**PWA**) diseñada específicamente para usar en el gimnasio desde tu **iPhone**, desarrollada en tu computador **Asus con Windows**.

---

## 📱 ¿Qué incluye la App?

1. **Las 7 Rutinas Completas organizadas con tus ejercicios:**
   - 🦵 **Piernas (Leg Day)**: Balanceos adelante/atrás, laterales, sentadillas al aire, círculos de cadera, zancadas dinámicas, caminata de rodillas | Cuádriceps de pie, isquios sentado, zancada corredor, mariposa, glúteo cruzado, gemelos pared.
   - 💪 **Brazos (Arm Day)**: Círculos adelante/atrás, flexión rápida de codos, curls con banda, extensiones aéreas, rotaciones de muñeca | Tríceps tras nuca, bíceps en pared, flexor y extensor de antebrazo, hombro/tríceps cruzado, bíceps y pecho atrás.
   - 🫁 **Pecho (Chest Day)**: Abrazos cruzados, rotaciones de torso, flexiones inclinadas, natación de brazos, press frontal, Y y T | Pecho marco 90°, marco alto, manos entrelazadas atrás, pectoral en suelo, colgado suave, cobra.
   - 🪽 **Espalda (Back Day)**: Band pull-aparts, gato-camello, círculos de hombros, remos sin peso, buenos días, giros de torso | Colgarse (Dead hang), pose del niño, dorsal lateral en poste, romboides abrazo, pose del niño derecha e izquierda.
   - 🪖 **Hombros (Shoulder Day)**: Dislocaciones con palo/banda, elevaciones frontales y laterales, press militar al aire, face pulls, encogimientos | Hombro posterior cruzado, deltoides pared, cuello lateral y diagonal, trapecio en espalda, empuje al frente.
   - 🧱 **Abdomen y Core**: Escaladores, rotaciones de cadera, plancha corta de activación, planchas laterales, toques pie cruzado, crunches de bicicleta | Cobra, torsión espinal, oblicuos de pie, flexores cadera, fitball, vaca.
   - ❤️ **Cardio y HIIT**: Trote en el sitio, jumping jacks, cuerda imaginaria, high knees, butt kicks, desplazamientos laterales | Gemelos escalón, sóleo pared, glúteos en 4, isquios cruzados, cuádriceps de lado, fascia plantar.

2. **Funcionalidades pensadas para el gimnasio:**
   - ⚡ **Modo Pre-Entreno vs Post-Entreno:** Cambia con un solo toque entre Dinámico (15 reps / 30s) y Estático (35s / 45s).
   - ⏱️ **Temporizador Guiado Inmersivo:** Anillo de progreso circular con segundero grande, botón de pausa/reanudación y avance de ejercicio.
   - 🔊 **Sonidos y Pitidos (Web Audio):** Avisos a los 3, 2, 1 y doble tono al cambiar de postura.
   - 🗣️ **Asistencia por Voz (TTS en Español):** Te dicta el siguiente ejercicio en voz alta para no tener que mirar el teléfono mientras te estiras.
   - 💡 **Pantalla siempre encendida (Wake Lock):** Evita que el iPhone bloquee la pantalla mientras ejecutas la rutina.
   - 📶 **100% Offline (PWA):** Guarda todos los recursos en caché; funciona aunque en tu gimnasio no haya cobertura o Wi-Fi.

---

## 🚀 Cómo usarla en tu iPhone

### Opción A: Probarla hoy mismo en tu red Wi-Fi local

1. En tu computador Asus, ve a la carpeta del proyecto:
   `C:\Users\mayus\.gemini\antigravity\scratch\gym-routine-app`
2. Haz **doble clic en `iniciar_app.bat`**.
3. Verás una ventana negra que te dirá:
   ```
   📱 En tu iPhone (conectado al mismo Wi-Fi):
      http://192.168.X.X:3000
   ```
4. En tu iPhone, abre **Safari**, escribe esa dirección IP con el puerto `:3000`.
5. Toca el botón **Compartir** (el ícono del cuadrado con la flecha hacia arriba) y selecciona:
   **"Agregar a pantalla de inicio"** (Add to Home Screen).
6. ¡Listo! Ya tienes el ícono de **GymWarm** en tu iPhone como si fuera una app descargada de la App Store.

---

### Opción B: Tenerla en la nube gratis para siempre (Sin depender de tu PC)

Para que puedas usarla en el gimnasio sin tener tu Asus encendido en casa, puedes publicarla en 2 minutos gratis:

1. **Con Vercel (Recomendado):**
   - Entra en [vercel.com](https://vercel.com) y créate una cuenta gratuita.
   - Arrastra la carpeta `gym-routine-app` a la web de Vercel.
   - En 15 segundos tendrás un enlace seguro `https://tu-gym-app.vercel.app`.
   - Abres ese enlace en Safari en tu iPhone $\rightarrow$ *Agregar a pantalla de inicio*.

2. **Con GitHub Pages:**
   - Sube los archivos a un repositorio público de GitHub y activa *Pages* en la configuración.
