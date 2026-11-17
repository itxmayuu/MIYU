// Base de datos de rutinas: Dinámico (Pre) y Estático (Post)
export const ROUTINES_DATA = [
  {
    id: "piernas",
    name: "Piernas",
    subtitle: "Leg Day",
    icon: "🦵",
    color: "#f97316", // Naranja vibrante
    description: "Movilidad de cadera, tobillo y rodillas antes de cargar peso; descarga de cuádriceps, glúteos e isquiotibiales al finalizar.",
    warmup: {
      type: "dinamico",
      defaultDuration: 30, // segundos recomendados o 15 reps
      exercises: [
        {
          name: "Balanceos de pierna adelante y atrás",
          detail: "Sueltos, como un péndulo. Apóyate en una pared o poste si lo necesitas.",
          repsOrTime: "15 reps por pierna o 30s",
          duration: 30,
          target: "Cadera e Isquiotibiales",
          tip: "Mantén el torso erguido sin arquear la zona lumbar."
        },
        {
          name: "Balanceos de pierna laterales",
          detail: "Cruzando por delante del cuerpo y abriendo hacia el lateral.",
          repsOrTime: "15 reps por pierna o 30s",
          duration: 30,
          target: "Aductores y Abductores",
          tip: "Movimiento controlado sin forzar el rango articular."
        },
        {
          name: "Sentadillas al aire",
          detail: "Bajando profundo y con fluidez, sin peso.",
          repsOrTime: "15 reps controladas",
          duration: 30,
          target: "Cuádriceps, Glúteos y Tobillos",
          tip: "Empuja las rodillas hacia afuera y mantén el pecho levantado."
        },
        {
          name: "Círculos amplios de cadera",
          detail: "Manos en la cintura, dibujando círculos grandes y fluidos en ambos sentidos.",
          repsOrTime: "10 círculos por lado o 30s",
          duration: 30,
          target: "Articulación coxofemoral y lumbares",
          tip: "Movimiento suave para lubricar la articulación."
        },
        {
          name: "Zancadas (lunges) dinámicas alternas",
          detail: "Paso amplio sin peso, alternando piernas y manteniendo el torso vertical.",
          repsOrTime: "16 pasos totales o 30s",
          duration: 30,
          target: "Psoas, Cuádriceps y Glúteos",
          tip: "No dejes que la rodilla delantera sobrepase en exceso la punta del pie."
        },
        {
          name: "Caminata elevando las rodillas al pecho",
          detail: "Eleva la rodilla agarrándola brevemente contra el pecho en cada paso.",
          repsOrTime: "15 reps alternas o 30s",
          duration: 30,
          target: "Flexores de cadera y Glúteo mayor",
          tip: "Ponte de puntillas en el pie de apoyo para activar gemelos."
        }
      ]
    },
    cooldown: {
      type: "estatico",
      defaultDuration: 35,
      exercises: [
        {
          name: "Cuádriceps de pie",
          detail: "Talón al glúteo, rodillas juntas y empujando ligeramente la cadera al frente.",
          repsOrTime: "30 a 45s por pierna",
          duration: 35,
          target: "Cuádriceps femoral",
          tip: "Mantén las dos rodillas alineadas para aislar el cuádriceps."
        },
        {
          name: "Isquiotibiales sentado",
          detail: "Pierna extendida alcanzando la punta del pie desde la bisagra de cadera.",
          repsOrTime: "30 a 45s por pierna",
          duration: 35,
          target: "Isquiosurales y pantorrilla",
          tip: "No curvees la espalda alta; busca llevar el pecho hacia la rodilla."
        },
        {
          name: "Zancada de corredor profunda",
          detail: "Paso largo con rodilla trasera apoyada, soltando el psoas y abriendo cadera.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Psoas ilíaco y flexores",
          tip: "Aprieta el glúteo de la pierna trasera para estirar más profundo."
        },
        {
          name: "Estiramiento de aductores en mariposa",
          detail: "Plantas de los pies juntas, empujando suavemente las rodillas hacia el suelo.",
          repsOrTime: "30 a 45s continuo",
          duration: 35,
          target: "Aductores internos",
          tip: "Respira hondo y baja las rodillas con cada exhalación."
        },
        {
          name: "Estiramiento de glúteo cruzado (Figura 4)",
          detail: "Acostado boca arriba, tobillo sobre la rodilla contraria y tirando hacia el pecho.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Glúteo medio y Piramidal",
          tip: "Excelente para aliviar tensión del nervio ciático post-sentadillas."
        },
        {
          name: "Gemelos contra la pared",
          detail: "Punta del pie apoyada en alto contra la pared, talón en el suelo y acercando la cadera.",
          repsOrTime: "30 a 45s por pierna",
          duration: 35,
          target: "Gastrocnemio y Tendón de Aquiles",
          tip: "Mantén la rodilla de atrás completamente bloqueada."
        }
      ]
    }
  },
  {
    id: "brazos",
    name: "Brazos",
    subtitle: "Arm Day (Bíceps y Tríceps)",
    icon: "💪",
    color: "#eab308", // Amarillo oro
    description: "Activación articular de codos, muñecas y hombros; estiramiento de bíceps, tríceps y antebrazos.",
    warmup: {
      type: "dinamico",
      defaultDuration: 30,
      exercises: [
        {
          name: "Círculos de brazos hacia adelante",
          detail: "Círculos controlados de menor a mayor diámetro.",
          repsOrTime: "15 reps o 30s",
          duration: 30,
          target: "Deltoides y Manguito Rotador",
          tip: "Mantén los brazos totalmente estirados."
        },
        {
          name: "Círculos de brazos hacia atrás",
          detail: "Círculos amplios abriendo el pecho al pasar los brazos por detrás.",
          repsOrTime: "15 reps o 30s",
          duration: 30,
          target: "Deltoides posterior y Pectoral",
          tip: "Siente cómo se juntan las escápulas atrás."
        },
        {
          name: "Flexión y extensión rápida de codos",
          detail: "Simulando un curl rápido sin peso, bombeando sangre a los codos.",
          repsOrTime: "20 reps o 30s",
          duration: 30,
          target: "Líquido sinovial en codos y bíceps/tríceps",
          tip: "Mantén codos pegados a las costillas."
        },
        {
          name: "Curls de bíceps con banda elástica ligera",
          detail: "Repeticiones continuas con muy poca tensión para calentar el tendón.",
          repsOrTime: "15 reps fluidas",
          duration: 30,
          target: "Tendón distal del bíceps",
          tip: "Si no tienes banda, hazlo contra resistencia isométrica propia."
        },
        {
          name: "Extensiones de tríceps aéreas dinámicas",
          detail: "Codos elevados apuntando al techo, extendiendo y doblando sin carga.",
          repsOrTime: "15 reps o 30s",
          duration: 30,
          target: "Cabeza larga del tríceps",
          tip: "Asegura rango completo de movimiento."
        },
        {
          name: "Rotaciones suaves de muñecas",
          detail: "Manos entrelazadas dibujando figuras en 'ocho' o giros en ambos sentidos.",
          repsOrTime: "15 giros a cada lado",
          duration: 30,
          target: "Túnel carpiano y tendones flexores/extensores",
          tip: "Vital para evitar dolores al hacer curls pesados o fondos."
        }
      ]
    },
    cooldown: {
      type: "estatico",
      defaultDuration: 35,
      exercises: [
        {
          name: "Tríceps tras nuca",
          detail: "Brazo doblado detrás de la cabeza, tirando del codo suavemente con la mano opuesta.",
          repsOrTime: "30 a 45s por brazo",
          duration: 35,
          target: "Tríceps (cabeza larga) y dorsal",
          tip: "No bajes la cabeza; mantén la mirada al frente."
        },
        {
          name: "Bíceps en pared",
          detail: "Palma apoyada plana contra la pared a la altura del hombro y girando el torso al lado opuesto.",
          repsOrTime: "30 a 45s por brazo",
          duration: 35,
          target: "Vientre muscular del bíceps y deltoides anterior",
          tip: "Mantén el codo completamente bloqueado."
        },
        {
          name: "Antebrazo flexor",
          detail: "Brazo estirado al frente, palma hacia arriba, jalando los dedos suavemente hacia abajo.",
          repsOrTime: "30 a 45s por brazo",
          duration: 35,
          target: "Músculos flexores del antebrazo",
          tip: "Alivia la sobrecarga de agarre de barras y mancuernas."
        },
        {
          name: "Antebrazo extensor",
          detail: "Brazo estirado al frente, palma hacia abajo, jalando el dorso de la mano hacia abajo.",
          repsOrTime: "30 a 45s por brazo",
          duration: 35,
          target: "Músculos extensores del antebrazo",
          tip: "Fundamental para prevenir el codo de tenista."
        },
        {
          name: "Hombro y tríceps cruzado",
          detail: "Brazo estirado cruzando horizontalmente por debajo de la barbilla.",
          repsOrTime: "30 a 45s por brazo",
          duration: 35,
          target: "Deltoides posterior y tríceps lateral",
          tip: "Mantén el hombro bajo, lejos de la oreja."
        },
        {
          name: "Bíceps y pecho con manos entrelazadas atrás",
          detail: "Entrelaza los dedos por detrás de la espalda y levanta suavemente los brazos.",
          repsOrTime: "30 a 45s continuo",
          duration: 35,
          target: "Bíceps, deltoides anterior y pectoral",
          tip: "Abre bien la caja torácica."
        }
      ]
    }
  },
  {
    id: "pecho",
    name: "Pecho",
    subtitle: "Chest Day",
    icon: "🫁",
    color: "#ef4444", // Rojo potente
    description: "Movilidad escapular y calentamiento del manguito rotador antes del press; apertura y descompresión pectoral al final.",
    warmup: {
      type: "dinamico",
      defaultDuration: 30,
      exercises: [
        {
          name: "Aperturas dinámicas (Abrazos cruzados)",
          detail: "Brazos abiertos en cruz y cruzando al frente de manera rítmica.",
          repsOrTime: "15 reps alternando qué brazo va arriba",
          duration: 30,
          target: "Pectoral mayor y deltoides posterior",
          tip: "Abre bien el pecho en cada repetición."
        },
        {
          name: "Rotaciones de torso de pie",
          detail: "Pies firmes, girando el torso de lado a lado con los codos a 90 grados.",
          repsOrTime: "20 giros alternos",
          duration: 30,
          target: "Columna torácica y oblicuos",
          tip: "Gira desde la parte alta de la espalda, no de las rodillas."
        },
        {
          name: "Flexiones inclinadas suaves",
          detail: "En la pared o sobre un banco alto, con tempo lento y controlado.",
          repsOrTime: "10 a 12 reps suaves",
          duration: 30,
          target: "Activación de pectorales y tríceps",
          tip: "Concéntrate en activar la conexión mente-músculo."
        },
        {
          name: "Círculos amplios de brazos alternos",
          detail: "Movimiento de natación (estilo libre y crol de espalda).",
          repsOrTime: "15 reps por lado o 30s",
          duration: 30,
          target: "Cápsula del hombro",
          tip: "Mantén el ritmo suave sin tirones."
        },
        {
          name: "Press frontal dinámico al aire",
          detail: "Empuja al frente con fuerza y regresa apretando el pecho.",
          repsOrTime: "15 reps activando fuerte",
          duration: 30,
          target: "Pectorales y serratos",
          tip: "Imagina que estás empujando una barra imaginaria pesada."
        },
        {
          name: "Elevaciones en forma de 'Y' y 'T'",
          detail: "Inclinando el torso, eleva los brazos formando una Y y luego una T.",
          repsOrTime: "12 a 15 reps",
          duration: 30,
          target: "Trapecio inferior y manguito rotador",
          tip: "Clave para proteger los hombros durante el press de banca."
        }
      ]
    },
    cooldown: {
      type: "estatico",
      defaultDuration: 35,
      exercises: [
        {
          name: "Pecho en marco de puerta (Brazo a 90°)",
          detail: "Antebrazo apoyado en marco a 90°, dando un paso al frente.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Fibras medias del pectoral mayor",
          tip: "Gira ligeramente el cuerpo en sentido opuesto."
        },
        {
          name: "Pecho en marco de puerta (Brazo alto)",
          detail: "Brazo estirado hacia arriba en ángulo de 120° en el marco, inclinando el cuerpo al frente.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Fibras inferiores y esternales del pectoral",
          tip: "Excelente estiramiento tras fondos o press declinado."
        },
        {
          name: "Manos entrelazadas en espalda baja",
          detail: "Junta las manos atrás, estira los codos y saca el pecho hacia el techo.",
          repsOrTime: "30 a 45s continuo",
          duration: 35,
          target: "Pectoral menor y deltoides anterior",
          tip: "Respira profundo expandiendo la caja torácica."
        },
        {
          name: "Estiramiento pectoral en el suelo",
          detail: "Tumbado boca abajo, un brazo en cruz apoyado y rotando la cadera sobre ese lado.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Pectoral profundo y cápsula anterior",
          tip: "El estiramiento más profundo para pecho; ve con calma."
        },
        {
          name: "Dejarse caer colgado suavemente",
          detail: "Apoyado o colgado de una barra alta, dejando caer el peso del cuerpo de forma relajada.",
          repsOrTime: "30 a 40s",
          duration: 35,
          target: "Pectorales, dorsales y descompresión espinal",
          tip: "Mantén los pies apoyados en el suelo si no quieres colgarte al 100%."
        },
        {
          name: "Postura de la cobra suave",
          detail: "Boca abajo, empujando suavemente el suelo con las palmas y alargando el pecho.",
          repsOrTime: "30 a 45s continuo",
          duration: 35,
          target: "Pared torácica anterior y abdomen",
          tip: "No comprimas la zona lumbar; alarga la coronilla hacia arriba."
        }
      ]
    }
  },
  {
    id: "espalda",
    name: "Espalda",
    subtitle: "Back Day",
    icon: "🪽",
    color: "#06b6d4", // Cian eléctrico
    description: "Activación escapular y bisagra lumbar antes de tracciones; descompresión de columna y dorsales al finalizar.",
    warmup: {
      type: "dinamico",
      defaultDuration: 30,
      exercises: [
        {
          name: "Tirones al pecho con banda (Band pull-aparts)",
          detail: "Separar la banda horizontalmente hasta tocar el esternón juntando escápulas.",
          repsOrTime: "15 a 20 reps controladas",
          duration: 30,
          target: "Deltoides posterior y romboides",
          tip: "Si no tienes banda, junta las escápulas activamente con los brazos extendidos."
        },
        {
          name: "Gato - Camello en cuadrupedia",
          detail: "Alternar arqueo y flexión completa de toda la columna vertebral.",
          repsOrTime: "10 a 12 ciclos lentos",
          duration: 30,
          target: "Movilidad global de la columna",
          tip: "Coordina con tu respiración: inhala al arquear, exhala al redondear."
        },
        {
          name: "Rotaciones de hombros hacia atrás",
          detail: "Elevando hombros a orejas y haciendo círculos grandes hacia atrás.",
          repsOrTime: "15 rotaciones profundas",
          duration: 30,
          target: "Trapecios y elevadores de la escápula",
          tip: "Siente cómo deslizan las escápulas por la caja torácica."
        },
        {
          name: "Remos dinámicos de pie sin peso",
          detail: "Inclinando el torso a 45°, llevando codos hacia atrás y apretando la espalda 1 segundo.",
          repsOrTime: "15 reps sintiendo la contracción",
          duration: 30,
          target: "Dorsal ancho y romboides",
          tip: "Mantén el cuello neutro alineado con la columna."
        },
        {
          name: "Buenos días sin peso (Good Mornings)",
          detail: "Bisagra de cadera con manos tras la cabeza, empujando glúteos atrás con espalda recta.",
          repsOrTime: "12 a 15 reps",
          duration: 30,
          target: "Erectores espinales y cadena posterior",
          tip: "Nunca dobles la espalda; las rodillas van ligeramente flexionadas."
        },
        {
          name: "Giros de torso rápidos",
          detail: "Brazos extendidos a los lados girando activamente a izquierda y derecha.",
          repsOrTime: "20 giros rítmicos",
          duration: 30,
          target: "Músculos rotadores espinales",
          tip: "Permite que el talón contrario pivote para proteger las rodillas."
        }
      ]
    },
    cooldown: {
      type: "estatico",
      defaultDuration: 35,
      exercises: [
        {
          name: "Colgarse de la barra (Dead hang)",
          detail: "Suspenderse de una barra de dominadas dejando que la gravedad descomprima la columna.",
          repsOrTime: "30 a 45s",
          duration: 35,
          target: "Descompresión vertebral, dorsales y antebrazos",
          tip: "Respira hondo y relaja completamente los hombros."
        },
        {
          name: "Pose del niño (Child's Pose)",
          detail: "Sentado sobre los talones, brazos estirados al frente tocando el suelo con la frente.",
          repsOrTime: "40 a 45s continuo",
          duration: 35,
          target: "Zona lumbar y dorsal ancho",
          tip: "Camina con las yemas de los dedos lo más lejos posible."
        },
        {
          name: "Estiramiento dorsal lateral en poste",
          detail: "Sujétate con una mano de un soporte vertical y empuja la cadera hacia el lado opuesto.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Dorsal ancho y cuadrado lumbar",
          tip: "Siente la línea completa desde la axila hasta la cadera."
        },
        {
          name: "Estiramiento de romboides (Abrazo apretado)",
          detail: "Abrázate a ti mismo cruzando los brazos y tratando de tocar los bordes de tus escápulas.",
          repsOrTime: "30 a 40s continuo",
          duration: 35,
          target: "Romboides y trapecio medio",
          tip: "Redondea suavemente la espalda alta mientras tiras hacia afuera."
        },
        {
          name: "Pose del niño desplazada a la derecha",
          detail: "En pose del niño, camina con ambas manos hacia el lado derecho para abrir el costado izquierdo.",
          repsOrTime: "30 a 45s en esta postura",
          duration: 35,
          target: "Dorsal ancho izquierdo",
          tip: "Empuja el glúteo izquierdo hacia atrás contra el talón."
        },
        {
          name: "Pose del niño desplazada a la izquierda",
          detail: "En pose del niño, camina con ambas manos hacia el lado izquierdo para abrir el costado derecho.",
          repsOrTime: "30 a 45s en esta postura",
          duration: 35,
          target: "Dorsal ancho derecho",
          tip: "Empuja el glúteo derecho hacia atrás contra el talón."
        }
      ]
    }
  },
  {
    id: "hombros",
    name: "Hombros",
    subtitle: "Shoulder Day",
    icon: "🪖",
    color: "#8b5cf6", // Púrpura dinámico
    description: "Preparación articular 360° para deltoides y cuello; descarga y eliminación de tensión post-presses.",
    warmup: {
      type: "dinamico",
      defaultDuration: 30,
      exercises: [
        {
          name: "Dislocaciones de hombros con palo/banda",
          detail: "Pasar un palo de escoba o banda elástica de adelante hacia atrás con brazos rectos.",
          repsOrTime: "12 a 15 pasadas suaves",
          duration: 30,
          target: "Movilidad global de la articulación glenohumeral",
          tip: "Si te cuesta pasar, separa más las manos; nunca fuerces el movimiento."
        },
        {
          name: "Elevaciones frontales dinámicas sin peso",
          detail: "Subir y bajar brazos extendidos al frente de manera continua hasta la altura de los ojos.",
          repsOrTime: "15 reps o 30s",
          duration: 30,
          target: "Deltoides anterior",
          tip: "Mantén el núcleo abdominal activo."
        },
        {
          name: "Elevaciones laterales dinámicas sin peso",
          detail: "Subir y bajar brazos a los lados hasta los 90° con tempo constante.",
          repsOrTime: "15 reps o 30s",
          duration: 30,
          target: "Deltoides lateral o medio",
          tip: "Piensa en empujar las paredes con los nudillos."
        },
        {
          name: "Press militar dinámico al aire",
          detail: "Movimiento de press sobre la cabeza extendiendo completamente los brazos.",
          repsOrTime: "15 reps activando escápulas",
          duration: 30,
          target: "Deltoides y trapecios",
          tip: "No arquees la zona lumbar al extender arriba."
        },
        {
          name: "Face pulls dinámicos con banda ligera",
          detail: "Tirar hacia la frente rotando las manos hacia afuera (pulgares atrás).",
          repsOrTime: "15 reps enfatizando rotadores",
          duration: 30,
          target: "Deltoides posterior y rotadores externos",
          tip: "Es el mejor ejercicio de prevención de lesiones de hombro."
        },
        {
          name: "Encogimientos de hombros rotativos",
          detail: "Llevar hombros hacia las orejas, luego hacia atrás y hacia abajo.",
          repsOrTime: "15 círculos amplios",
          duration: 30,
          target: "Trapecio superior y cuello",
          tip: "Hazlo sin prisas liberando la tensión acumulada."
        }
      ]
    },
    cooldown: {
      type: "estatico",
      defaultDuration: 35,
      exercises: [
        {
          name: "Hombro posterior cruzado",
          detail: "Brazo cruzado por delante del pecho presionando con el antebrazo contrario.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Deltoides posterior e infraespinoso",
          tip: "Baja el hombro; no dejes que suba a la oreja."
        },
        {
          name: "Deltoides anterior en pared",
          detail: "Brazo estirado hacia atrás con la palma apoyada en la pared a la altura del hombro.",
          repsOrTime: "30 a 45s por brazo",
          duration: 35,
          target: "Deltoides anterior y tendón del bíceps",
          tip: "Gira el pecho suavemente en dirección contraria."
        },
        {
          name: "Inclinación lateral del cuello",
          detail: "Llevar la oreja hacia el hombro con suavidad, usando el propio peso de la mano.",
          repsOrTime: "30s por lado",
          duration: 35,
          target: "Trapecio superior y escalenos",
          tip: "Aplica una presión muy suave, jamás des tirones."
        },
        {
          name: "Inclinación diagonal del cuello",
          detail: "Girar la cabeza 45° e inclinar la barbilla mirando en dirección a la axila.",
          repsOrTime: "30s por lado",
          duration: 35,
          target: "Músculo elevador de la escápula",
          tip: "Alivia el dolor típico que se acumula tras press militar pesado."
        },
        {
          name: "Estiramiento de trapecio con mano en espalda",
          detail: "Mano colocada en la espalda baja mientras inclinas la cabeza al lado contrario.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Trapecio superior",
          tip: "Mantén los dos hombros nivelados."
        },
        {
          name: "Empuje al frente con manos entrelazadas",
          detail: "Entrelazar dedos al frente, empujar palmas adelante y redondear suavemente la espalda alta.",
          repsOrTime: "30 a 45s continuo",
          duration: 35,
          target: "Espalda alta y deltoides posterior",
          tip: "Mete la barbilla hacia el pecho para descomprimir la zona cervical."
        }
      ]
    }
  },
  {
    id: "core",
    name: "Abdomen",
    subtitle: "Core / Abs Day",
    icon: "🧱",
    color: "#10b981", // Esmeralda
    description: "Activación isométrica y térmica del cinturón abdominal; estiramiento del recto y flexores de cadera.",
    warmup: {
      type: "dinamico",
      defaultDuration: 30,
      exercises: [
        {
          name: "Escaladores (Mountain climbers)",
          detail: "En posición de flexión, llevando rodillas alternas hacia el pecho a ritmo ágil.",
          repsOrTime: "20 a 24 pasos o 30s",
          duration: 30,
          target: "Core global y flexores de cadera",
          tip: "Mantén la cadera baja alineada con los hombros."
        },
        {
          name: "Rotaciones amplias de cadera",
          detail: "Círculos gigantes con la cadera para despertar el suelo pélvico y transverso.",
          repsOrTime: "10 círculos por sentido",
          duration: 30,
          target: "Pélvis y lumbares",
          tip: "Movimiento suelto y relajado."
        },
        {
          name: "Plancha frontal corta de activación",
          detail: "Apoyo en antebrazos apretando abdomen y glúteos al 100%.",
          repsOrTime: "20 segundos máximo",
          duration: 20,
          target: "Transverso abdominal y recto anterior",
          tip: "El objetivo es despertar el músculo, no fatigarlo antes de entrenar."
        },
        {
          name: "Planchas laterales cortas",
          detail: "Cuerpo recto apoyado en un antebrazo, activando los oblicuos inferiores.",
          repsOrTime: "15 segundos por lado",
          duration: 30,
          target: "Oblicuos internos/externos y cuadrado lumbar",
          tip: "Asegúrate de que la cadera no caiga al suelo."
        },
        {
          name: "Toques cruzados a la punta del pie de pie",
          detail: "De pie con piernas abiertas, tocar mano derecha a pie izquierdo y viceversa.",
          repsOrTime: "16 toques alternos o 30s",
          duration: 30,
          target: "Cadena cruzada y rotadores",
          tip: "Flexiona ligeramente las rodillas si sientes tensión en isquios."
        },
        {
          name: "Crunches de bicicleta de pie",
          detail: "Manos tras la cabeza, llevando rodilla y codo contrario a encontrarse al frente.",
          repsOrTime: "16 reps alternas o 30s",
          duration: 30,
          target: "Oblicuos y recto anterior",
          tip: "Exhala con fuerza en cada encuentro de codo y rodilla."
        }
      ]
    },
    cooldown: {
      type: "estatico",
      defaultDuration: 35,
      exercises: [
        {
          name: "Postura de la cobra",
          detail: "Pelvis pegada al suelo, empujando suavemente el suelo con las palmas y alargando el vientre.",
          repsOrTime: "35 a 45s continuo",
          duration: 35,
          target: "Recto anterior del abdomen",
          tip: "Activa ligeramente los glúteos para proteger las vértebras lumbares."
        },
        {
          name: "Torsión espinal tumbada",
          detail: "Tumbado boca arriba, cruzar una rodilla doblada sobre el cuerpo mirando hacia el lado opuesto.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Oblicuos, lumbares y glúteo",
          tip: "Intenta que los dos hombros permanezcan en contacto con el suelo."
        },
        {
          name: "Estiramiento de oblicuos de pie",
          detail: "De pie, elevar un brazo por encima de la cabeza e inclinarse lateralmente.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Oblicuo externo e intercostales",
          tip: "No dobles el torso hacia adelante, muévete en plano puramente lateral."
        },
        {
          name: "Estiramiento de flexores de cadera",
          detail: "En zancada con rodilla en suelo, empujar la pelvis hacia adelante y abajo.",
          repsOrTime: "30 a 45s por lado",
          duration: 35,
          target: "Psoas mayor y recto femoral",
          tip: "Contrae el glúteo de la rodilla apoyada para aumentar el estiramiento."
        },
        {
          name: "Estiramiento abdominal sobre Fitball",
          detail: "Recostarse boca arriba sobre una pelota suiza dejando caer la cabeza y los brazos.",
          repsOrTime: "40 a 50s relajado",
          duration: 40,
          target: "Descompresión total de la pared abdominal",
          tip: "Si no hay Fitball disponible en tu gym, sustitúyelo por una cobra profunda."
        },
        {
          name: "Pose de la vaca en el suelo",
          detail: "En 4 puntos de apoyo, dejar caer el abdomen hacia el suelo elevando suavemente la mirada.",
          repsOrTime: "30 a 45s continuo",
          duration: 35,
          target: "Fascia abdominal y zona media",
          tip: "Inhala profundamente expandiendo la barriga con aire."
        }
      ]
    }
  },
  {
    id: "cardio",
    name: "Cardio",
    subtitle: "Cardio Day / HIIT",
    icon: "❤️",
    color: "#ec4899", // Rosa neón
    description: "Elevación progresiva de pulso y temperatura corporal; descarga muscular de piernas y fascia plantar al finalizar.",
    warmup: {
      type: "dinamico",
      defaultDuration: 30,
      exercises: [
        {
          name: "Trote ligero en el sitio",
          detail: "Impacto muy suave, soltando brazos y hombros.",
          repsOrTime: "30 a 40 segundos",
          duration: 30,
          target: "Elevación de frecuencia cardíaca",
          tip: "Aterriza con la parte media del pie, no con el talón."
        },
        {
          name: "Jumping Jacks",
          detail: "Saltos abriendo y cerrando piernas y brazos de forma coordinada.",
          repsOrTime: "25 a 30 saltos o 30s",
          duration: 30,
          target: "Sistema cardiovascular y coordinación motora",
          tip: "Mantén un ritmo constante y controlado."
        },
        {
          name: "Saltos cortos de cuerda imaginaria",
          detail: "Rebotar sobre las puntas de los pies rotando las muñecas.",
          repsOrTime: "30 a 45 segundos",
          duration: 30,
          target: "Tendón de Aquiles y gemelos",
          tip: "Apenas 2 o 3 centímetros de elevación del suelo son suficientes."
        },
        {
          name: "High Knees (Rodillas altas)",
          detail: "Subir rodillas alternas hacia el pecho a ritmo ágil.",
          repsOrTime: "20 a 30 segundos",
          duration: 30,
          target: "Flexores de cadera y potencia aeróbica",
          tip: "Mantén el torso ligeramente inclinado al frente."
        },
        {
          name: "Butt Kicks (Talones a los glúteos)",
          detail: "Llevar talones rápidamente hacia los glúteos en carrera estacionaria.",
          repsOrTime: "20 a 30 segundos",
          duration: 30,
          target: "Cuádriceps dinámicos y frecuencia",
          tip: "Mantén los brazos en braceo atlético activo."
        },
        {
          name: "Desplazamientos laterales rápidos",
          detail: "En posición de semi-sentadilla, dar 2 o 3 pasos laterales rápidos a cada lado.",
          repsOrTime: "30 segundos",
          duration: 30,
          target: "Abductores, glúteo medio y agilidad",
          tip: "Permanece bajo y no cruces los pies."
        }
      ]
    },
    cooldown: {
      type: "estatico",
      defaultDuration: 35,
      exercises: [
        {
          name: "Gemelos en escalón",
          detail: "Punta del pie en el borde del escalón, dejando caer el talón hacia abajo.",
          repsOrTime: "30 a 45s por pierna",
          duration: 35,
          target: "Gastrocnemio y tendón de Aquiles",
          tip: "Permite que el propio peso del cuerpo haga el trabajo."
        },
        {
          name: "Sóleo en pared",
          detail: "Igual que el de gemelos pero flexionando ligeramente la rodilla de atrás.",
          repsOrTime: "30 a 45s por pierna",
          duration: 35,
          target: "Músculo sóleo profundo",
          tip: "Crucial tras correr o saltar la cuerda."
        },
        {
          name: "Glúteos en '4' (sentado o acostado)",
          detail: "Cruzar un tobillo sobre el muslo opuesto y acercar la pierna al pecho.",
          repsOrTime: "35 a 45s por lado",
          duration: 35,
          target: "Glúteos y rotadores externos de cadera",
          tip: "Siente cómo cede la tensión tras el impacto."
        },
        {
          name: "Isquiotibiales de pie con piernas cruzadas",
          detail: "Cruzar una pierna por delante de la otra y bajar lentamente a tocar los pies.",
          repsOrTime: "30 a 45s por cruce",
          duration: 35,
          target: "Isquiotibiales y banda iliotibial",
          tip: "Deja caer la cabeza relajando el cuello."
        },
        {
          name: "Cuádriceps tumbado de lado",
          detail: "Acostado sobre un lado, sujetar el empeine superior y llevar el talón al glúteo.",
          repsOrTime: "30 a 45s por pierna",
          duration: 35,
          target: "Cuádriceps y flexores de cadera",
          tip: "Tumbado es más fácil mantener la pelvis neutra que de pie."
        },
        {
          name: "Estiramiento de la fascia plantar",
          detail: "Sentado, tomar con la mano los dedos del pie y jalarlos firmemente hacia la espinilla.",
          repsOrTime: "30 a 45s por pie",
          duration: 35,
          target: "Fascia plantar y arco del pie",
          tip: "Evita la fascitis plantar causada por calzado de gym y saltos."
        }
      ]
    }
  }
];
