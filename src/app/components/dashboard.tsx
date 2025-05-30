"use client"

import { useCallback, useState } from "react";
import { FolderStructure } from "./folder-structure";
import { Folder } from "@/lib/types";
import { initialFolders } from "@/lib/constant/mock-folders";


export default function Dashboard() {

  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"name" | "date" | "size">("name")
  const [folders, setFolders] = useState<Folder[]>(initialFolders)

  // Usar useCallback para evitar recreaciones innecesarias de la función
  const handleFoldersUpdate = useCallback(
    (updatedFolders: Folder[]) => {
      setFolders(updatedFolders)

      // Si la carpeta seleccionada fue eliminada, deseleccionarla
      if (selectedFolder && !updatedFolders.some((folder) => folder.id === selectedFolder.id)) {
        setSelectedFolder(null)
      }
    },
    [selectedFolder],
  )

  // Manejar la selección de carpeta de forma segura
  const handleSelectFolder = useCallback(
    (folder: Folder) => {
      // Verificar que la carpeta existe en el estado actual
      const folderExists = folders.some((f) => f.id === folder.id)
      if (folderExists) {
        setSelectedFolder(folder)
      }
    },
    [folders],
  )

  return (
    <div className="flex h-screen bg-background">
      <FolderStructure
        onSelectFolder={handleSelectFolder}
        selectedFolder={selectedFolder}
        onFoldersUpdate={handleFoldersUpdate}
        folders={folders}
      />
    </div>
  )
}
