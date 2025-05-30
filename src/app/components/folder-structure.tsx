"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, FolderIcon, Plus, Trash2, Pencil, FolderPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Folder } from "@/lib/types"

interface FolderStructureProps {
  onSelectFolder: (folder: Folder) => void
  selectedFolder: Folder | null
  onFoldersUpdate: (folders: Folder[]) => void
  folders: Folder[]
}

export function FolderStructure({ onSelectFolder, selectedFolder, onFoldersUpdate, folders }: FolderStructureProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "1": true,
    "3": true,
    "6": true,
  })
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [currentParentId, setCurrentParentId] = useState<string | null>(null)
  const [folderToRename, setFolderToRename] = useState<Folder | null>(null)

  const rootFolders = folders.filter((folder) => folder.parentId === null)

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }))
  }

  const handleSelectFolder = (folder: Folder) => {
    onSelectFolder(folder)
  }

  const openCreateDialog = (parentId: string | null) => {
    setCurrentParentId(parentId)
    setNewFolderName("")
    setIsCreateDialogOpen(true)
  }

  const openRenameDialog = (folder: Folder) => {
    setFolderToRename(folder)
    setNewFolderName(folder.name)
    setIsRenameDialogOpen(true)
  }

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: Folder = {
        id: `folder-${Date.now()}`,
        name: newFolderName,
        parentId: currentParentId,
        files: [],
      }

      // Notificar al componente padre directamente
      onFoldersUpdate([...folders, newFolder])
      setIsCreateDialogOpen(false)

      // Expandir la carpeta padre si existe
      if (currentParentId) {
        setExpandedFolders((prev) => ({
          ...prev,
          [currentParentId]: true,
        }))
      }
    }
  }

  const handleRenameFolder = () => {
    if (folderToRename && newFolderName.trim()) {
      const updatedFolders = folders.map((folder) =>
        folder.id === folderToRename.id ? { ...folder, name: newFolderName } : folder,
      )

      // Notificar al componente padre directamente
      onFoldersUpdate(updatedFolders)
      setIsRenameDialogOpen(false)
    }
  }

  const handleDeleteFolder = (folderId: string) => {
    // Eliminar la carpeta y todas sus subcarpetas
    const folderIdsToDelete = [folderId]

    // Función recursiva para encontrar todas las subcarpetas
    const findSubfolders = (parentId: string) => {
      folders.forEach((folder) => {
        if (folder.parentId === parentId) {
          folderIdsToDelete.push(folder.id)
          findSubfolders(folder.id)
        }
      })
    }

    findSubfolders(folderId)

    // Filtrar las carpetas que no están en la lista de eliminación
    const updatedFolders = folders.filter((folder) => !folderIdsToDelete.includes(folder.id))

    // Notificar al componente padre directamente
    onFoldersUpdate(updatedFolders)

    // Si la carpeta eliminada era la seleccionada, deseleccionar
    if (selectedFolder && folderIdsToDelete.includes(selectedFolder.id)) {
      onSelectFolder(null)
    }
  }

  const renderFolderTree = (parentId: string | null) => {
    const childFolders = folders.filter((folder) => folder.parentId === parentId)

    return childFolders.map((folder) => (
      <div key={folder.id} className="select-none">
        <div
          className={`flex items-center py-1 px-2 rounded-md cursor-pointer group ${selectedFolder?.id === folder.id ? "bg-accent" : "hover:bg-accent/50"
            }`}
          onClick={() => handleSelectFolder(folder)}
        >
          <button
            className="mr-1 p-1 hover:bg-accent rounded-md"
            onClick={(e) => {
              e.stopPropagation()
              toggleFolder(folder.id)
            }}
          >
            {expandedFolders[folder.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          <FolderIcon size={18} className="mr-2 text-yellow-500" />
          <span className="flex-1 truncate">{folder.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100"
                onClick={(e) => e.stopPropagation()}
              >
                <Pencil size={14} />
                <span className="sr-only">Acciones</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openCreateDialog(folder.id)}>
                <Plus size={14} className="mr-2" />
                <span>Nueva carpeta</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openRenameDialog(folder)}>
                <Pencil size={14} className="mr-2" />
                <span>Renombrar</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => handleDeleteFolder(folder.id)}
              >
                <Trash2 size={14} className="mr-2" />
                <span>Eliminar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {expandedFolders[folder.id] && (
          <div className="pl-6 border-l border-[hsl(var(--border))] ml-3 mt-1">{renderFolderTree(folder.id)}</div>
        )}
      </div>
    ))
  }

  return (
    <div className="w-64 h-full border-r border-[hsl(var(--border))] flex flex-col bg-[hsl(var(--background))]">
      <div className="p-4 flex items-center justify-between border-b border-[hsl(var(--border))]">
        <h2 className="font-semibold text-lg">Mi Drive</h2>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openCreateDialog(selectedFolder ? selectedFolder.id : null)}
          >
            <FolderPlus size={18} />
            <span className="sr-only">Nueva carpeta</span>
          </Button>
          {selectedFolder && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive"
              onClick={() => handleDeleteFolder(selectedFolder.id)}
            >
              <Trash2 size={18} />
              <span className="sr-only">Eliminar carpeta</span>
            </Button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">{renderFolderTree(null)}</div>

      {/* Diálogo para crear carpeta */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva carpeta</DialogTitle>
          </DialogHeader>
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Nombre de la carpeta"
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateFolder}>Crear</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para renombrar carpeta */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renombrar carpeta</DialogTitle>
          </DialogHeader>
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Nuevo nombre"
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleRenameFolder}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}