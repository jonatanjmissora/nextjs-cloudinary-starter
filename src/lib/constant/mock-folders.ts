import { Folder } from "../types";

// Datos de ejemplo expandidos
export const initialFolders: Folder[] = [
  {
    id: "1",
    name: "Mi unidad",
    parentId: null,
    files: [
      { id: "f1", name: "Documento_Principal.pdf", type: "pdf", size: "2.5 MB", lastModified: "Hoy" },
      { id: "f2", name: "Foto_Perfil.jpg", type: "image", size: "1.2 MB", lastModified: "Ayer" },
      { id: "f3", name: "Notas_Importantes.txt", type: "text", size: "45 KB", lastModified: "2 días" },
      { id: "f4", name: "Backup_Datos.zip", type: "archive", size: "15.7 MB", lastModified: "1 semana" },
    ],
  },
  {
    id: "2",
    name: "Compartidos conmigo",
    parentId: null,
    files: [
      { id: "f5", name: "Proyecto_Colaborativo.docx", type: "word", size: "3.1 MB", lastModified: "12 may" },
      { id: "f6", name: "Presupuesto_2024.xlsx", type: "excel", size: "890 KB", lastModified: "15 may" },
      { id: "f7", name: "Reunion_Equipo.mp4", type: "video", size: "125 MB", lastModified: "18 may" },
    ],
  },
  {
    id: "3",
    name: "Documentos",
    parentId: "1",
    files: [
      { id: "f8", name: "Informe_Mensual.pdf", type: "pdf", size: "4.2 MB", lastModified: "15 may" },
      { id: "f9", name: "Contrato_Servicios.docx", type: "word", size: "1.8 MB", lastModified: "20 may" },
      { id: "f10", name: "Manual_Usuario.pdf", type: "pdf", size: "6.3 MB", lastModified: "22 may" },
    ],
  },
  {
    id: "4",
    name: "Imágenes",
    parentId: "1",
    files: [
      { id: "f11", name: "Vacaciones_Playa.jpg", type: "image", size: "5.7 MB", lastModified: "1 jun" },
      { id: "f12", name: "Familia_Reunion.png", type: "image", size: "3.3 MB", lastModified: "2 jun" },
      { id: "f13", name: "Logo_Empresa.svg", type: "image", size: "245 KB", lastModified: "5 jun" },
      { id: "f14", name: "Captura_Pantalla.png", type: "image", size: "1.1 MB", lastModified: "8 jun" },
    ],
  },
  {
    id: "5",
    name: "Trabajo",
    parentId: "3",
    files: [
      { id: "f15", name: "Presentacion_Ventas.pptx", type: "powerpoint", size: "7.8 MB", lastModified: "5 jun" },
      { id: "f16", name: "Analisis_Mercado.xlsx", type: "excel", size: "2.4 MB", lastModified: "10 jun" },
      { id: "f17", name: "Propuesta_Cliente.docx", type: "word", size: "1.9 MB", lastModified: "12 jun" },
    ],
  },
  {
    id: "6",
    name: "Proyectos",
    parentId: "1",
    files: [
      { id: "f18", name: "App_Movil_Specs.pdf", type: "pdf", size: "3.2 MB", lastModified: "14 jun" },
      { id: "f19", name: "Wireframes_UI.fig", type: "design", size: "12.5 MB", lastModified: "16 jun" },
    ],
  },
  {
    id: "7",
    name: "Frontend",
    parentId: "6",
    files: [
      { id: "f20", name: "Componentes_React.zip", type: "archive", size: "8.9 MB", lastModified: "18 jun" },
      { id: "f21", name: "Estilos_CSS.css", type: "code", size: "156 KB", lastModified: "19 jun" },
      { id: "f22", name: "Configuracion_Webpack.js", type: "code", size: "89 KB", lastModified: "20 jun" },
    ],
  },
  {
    id: "8",
    name: "Backend",
    parentId: "6",
    files: [
      { id: "f23", name: "API_Documentation.pdf", type: "pdf", size: "2.1 MB", lastModified: "21 jun" },
      { id: "f24", name: "Database_Schema.sql", type: "code", size: "67 KB", lastModified: "22 jun" },
      { id: "f25", name: "Server_Config.json", type: "code", size: "23 KB", lastModified: "23 jun" },
    ],
  },
  {
    id: "9",
    name: "Multimedia",
    parentId: "1",
    files: [
      { id: "f26", name: "Video_Tutorial.mp4", type: "video", size: "89.3 MB", lastModified: "25 jun" },
      { id: "f27", name: "Audio_Podcast.mp3", type: "audio", size: "45.7 MB", lastModified: "26 jun" },
      { id: "f28", name: "Animacion_Logo.gif", type: "image", size: "2.8 MB", lastModified: "27 jun" },
    ],
  },
  {
    id: "10",
    name: "Recursos",
    parentId: "4",
    files: [
      { id: "f29", name: "Iconos_Pack.zip", type: "archive", size: "15.2 MB", lastModified: "28 jun" },
      { id: "f30", name: "Fuentes_Tipograficas.ttf", type: "font", size: "3.4 MB", lastModified: "29 jun" },
      { id: "f31", name: "Paleta_Colores.ase", type: "design", size: "124 KB", lastModified: "30 jun" },
    ],
  },
  {
    id: "11",
    name: "Finanzas",
    parentId: "3",
    files: [
      { id: "f32", name: "Estado_Resultados.xlsx", type: "excel", size: "1.7 MB", lastModified: "1 jul" },
      { id: "f33", name: "Facturas_Junio.pdf", type: "pdf", size: "4.8 MB", lastModified: "2 jul" },
      { id: "f34", name: "Presupuesto_Anual.xlsx", type: "excel", size: "2.3 MB", lastModified: "3 jul" },
    ],
  },
  {
    id: "12",
    name: "Archivo",
    parentId: null,
    files: [
      { id: "f35", name: "Documentos_2023.zip", type: "archive", size: "156 MB", lastModified: "15 ene" },
      { id: "f36", name: "Fotos_Antiguas.zip", type: "archive", size: "89 MB", lastModified: "20 feb" },
      { id: "f37", name: "Proyectos_Finalizados.zip", type: "archive", size: "234 MB", lastModified: "10 mar" },
    ],
  },
]
