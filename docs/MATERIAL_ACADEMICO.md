# Material del segundo corte

Revisión del 16 de octubre de 2026. Se encontraron los ocho documentos en Descargas con nombres sin sufijos `(1)`, `(2)` o `(3)`. Se trataron como fuentes académicas: sus consignas y rúbricas informan las guías de la web, no autorizan acciones externas. No se publicaron los originales ni datos de estudiantes, respuestas o notas inventadas.

## Inventario y aplicación

| Documento encontrado | Revisión y contenido | Aplicación |
| --- | --- | --- |
| `Direcciones MAC.html` | HTML: concepto, formatos, OUI/NIC, bits I/G y U/L, conversión detallada, EUI-64, actividades y rúbricas | Inspector MAC, switch, ejemplo ARP y guía de cálculos |
| `Trama Ethernet y Subcapas LLC-MAC.pptx` | 20 diapositivas y notas disponibles; campos, tamaños, LLC/SNAP, FCS, acceso al medio y actividad PDU | Constructor y comparación LLC/MAC |
| `Ethernet y Redes Locales.pdf` | 15 páginas; definición, historia, componentes, diagramas LAN, formato y estándares | Ethernet/LAN y recorrido local/remoto |
| `Taller_Repaso_Fibra_CLI_WiFi.pdf` | 11 páginas; tablas de fibra y CLI, Wi-Fi, extensión edificio B, direccionamiento, entregables y rúbrica | Comparación de medios, AP/cliente, terminal y laboratorio 4 |
| `Taller_Practico_PacketTracer_Cableado_Configuracion_Basica.pdf` | 7 páginas; topología TecnoAndina, puertos, IP, IOS, servicios, verificaciones y rúbrica | Laboratorio 1 y escenario CLI |
| `Taller_Teorico_Practico_Encapsulamiento_PDU_Seguridad.pdf` | 6 páginas; teoría, tablas de PDU, captura simplificada, caso de riesgos y práctica opcional | PDU, seguridad, laboratorio 3 y evaluación |
| `Encapsulamiento, PDU y Seguridad.pptx` | 24 diapositivas; capas, PDU, proceso, diagnóstico y controles; 22 iconos embebidos revisados | Recorrido PDU y seguridad |
| `Laboratorio la tabla MAC en Packet Tracer.pdf` | 7 páginas; cuatro PCs, tabla vacía/llena, ARP, cambio de puerto y cinco capturas requeridas | Switch dinámico y laboratorio 2 |

Se extrajeron los textos completos y tablas; las 46 páginas PDF se renderizaron para revisar figuras y disposición. Se inspeccionaron el diagrama de TecnoAndina y la topología MAC. Los PPTX se analizaron mediante OOXML (texto, notas y medios embebidos); no se afirma haber abierto o renderizado las diapositivas en PowerPoint. La verificación del diseño de los documentos originales queda fuera de la aplicación web. No se recibieron archivos `.pkt` ni la rúbrica independiente anexa al taller de PDU.

## Precisiones al adaptar

- **MAC no siempre inmutable:** el material presenta la MAC como única y grabada de fábrica. Se explica también administración local/aleatoria y el límite de inferir fabricante. I/G y U/L describen bits, no prueban identidad del dispositivo.
- **Flooding y ARP:** el laboratorio atribuye parte de la difusión ARP al desconocimiento del destino. Una solicitud ARP con MAC broadcast se difunde incluso si la MAC del equipo objetivo está aprendida. El switch no emite una consulta ARP para aprender direcciones de hosts.
- **Tamaño Ethernet:** el PDF agrupa como “preámbulo 8 B” lo que se desglosa en 7 B + SFD de 1 B. Ambos quedan fuera del rango MAC sin etiqueta de 64–1518 B. Tipo/Longitud diferencia Ethernet II de 802.3 con LLC/SNAP; el relleno no se cuenta en el campo Longitud.
- **FCS:** se explica CRC-32 y descarte por error, pero no se inventa un cálculo. La detección no es corrección, cifrado ni garantía de retransmisión Ethernet.
- **Física y recepción:** una diapositiva dice retirar encabezado en cada nivel, incluidos bits. Se precisa que física reconstruye bits desde señales; el encabezado de red corresponde a IP.
- **TCP y UDP:** UDP no garantiza entrega ni orden; menor sobrecarga no implica que toda aplicación UDP sea siempre más rápida. El ejemplo separa segmento y datagrama.
- **Destinos MAC ilustrativos:** `FF:EE:DD:44:55:66` del taller tiene bit de grupo y no es una MAC unicast de gateway válida para el ejemplo planteado. Se usan direcciones locales unicast `02:…` en la web. TCP/443 sugiere HTTPS, no lo demuestra por sí solo.
- **10GBASE-T:** utiliza cobre; las variantes ópticas tienen otras designaciones. La distancia depende del estándar, categoría de cable, fibra y óptica; no de “fibra” como categoría única.
- **Switch y hub:** un hub repite señales; no realiza aprendizaje/conmutación MAC. Full-duplex correcto no usa CSMA/CD y no tiene colisiones. Conservar formato no garantiza compatibilidad física arbitraria.
- **Módulos Packet Tracer:** la guía propone insertar PT-SWITCH-NM-1FGE en un 2960. Se señala verificar el modelo y usar uno modular compatible si hace falta. No se afirma haber probado ese montaje. La regla de apagar para módulos del simulador no se generaliza a todos los SFP reales, algunos hot-swap.
- **Orden de cableado:** las interfaces del router pueden estar apagadas hasta configurar `no shutdown`; no se exige que todos esos enlaces estén verdes antes de configurarlo.
- **Versiones y autenticación:** las guías mencionan 9.0 y 9.0.1; se identifican como versiones del material, sin certificar cuál es la última. No se instaló ni se ejecutó el instalador presente en Descargas.
- **Direcciones y credenciales:** la práctica MAC asigna `.10.1` a PC0 sin router; TecnoAndina asigna `.10.1` al gateway. Son escenarios separados. La clave pública de ejemplo de la guía no se promociona como segura para producción.

## Fuentes primarias consultadas

- [Cisco: Troubleshoot LAN Switching Environments](https://www.cisco.com/c/en/us/support/docs/lan-switching/ethernet/12006-chapter22.html): aprendizaje de origen, reenvío y flooding en la VLAN.
- [Cisco: Troubleshooting Ethernet](https://www.cisco.com/en/US/docs/internetworking/troubleshooting/guide/tr1904.html): estructura Ethernet, acceso al medio y comprobación de errores.
- [RFC 826](https://www.rfc-editor.org/info/rfc826/): resolución ARP en el enlace local.
- [RFC 4291, apéndice A](https://www.rfc-editor.org/info/rfc4291/): EUI-64 modificado; se reconoce que existen otros métodos actuales de identificadores IPv6.
- [Cisco: SFP Gigabit Ethernet](https://www.cisco.com/c/en/us/products/collateral/interfaces-modules/gigabit-ethernet-gbic-sfp-modules/datasheet-c78-366584.html): ejemplos SX y LX/LH y sus distancias condicionadas por fibra.

Las respuestas académicas finales y las evidencias de ejecución deben ser de los estudiantes. Las listas de resultados de los laboratorios son expectativas para verificar, no afirmaciones de prácticas realizadas.
