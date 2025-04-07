"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowDownCircle, BanknoteIcon, CheckCircle2, FileIcon, UploadCloudIcon, UserIcon, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PdfProcessor() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<null | {
    devolver: string
    ingresos: string
    retenciones: string
    estado: string
    hijos: boolean
  }>(null)
  const { toast } = useToast()

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile)
      } else {
        toast({
          title: "Error",
          description: "Por favor, sube un archivo PDF.",
          variant: "destructive",
        })
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile)
      } else {
        toast({
          title: "Error",
          description: "Por favor, sube un archivo PDF.",
          variant: "destructive",
        })
      }
    }
  }

  const processFile = () => {
    if (!file) return

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      // Mock results - in a real app, this would come from your API
      setResults({
        devolver: "1.176,12",
        ingresos: "30.700",
        retenciones: "5.200",
        estado: "Soltero",
        hijos: false,
      })
      setIsProcessing(false)
    }, 1500)
  }

  const resetForm = () => {
    setFile(null)
    setResults(null)
  }

  if (results) {
    return (
      <div className="max-w-md mx-auto p-4">
        <Card className="overflow-hidden border-none shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
            <CardTitle className="text-xl font-medium">Resultados del Proceso</CardTitle>
            <CardDescription className="text-slate-200">Resumen de su declaración fiscal</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Amount to Return */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <ArrowDownCircle className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm font-medium text-slate-600">A Devolver</span>
              </div>
              <span className="text-lg font-bold text-green-600">€{results.devolver}</span>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Income */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BanknoteIcon className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-slate-600">Ingresos</span>
              </div>
              <span className="text-lg font-medium">€{results.ingresos}</span>
            </div>

            {/* Withholdings */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <BanknoteIcon className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-slate-600">Retenciones</span>
              </div>
              <span className="text-lg font-medium">€{results.retenciones}</span>
            </div>

            <div className="h-px bg-slate-100" />

            {/* Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <UserIcon className="h-5 w-5 text-amber-600" />
                </div>
                <span className="text-sm font-medium text-slate-600">Estado Civil</span>
              </div>
              <Badge variant="outline" className="font-medium">
                {results.estado}
              </Badge>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-2 rounded-full">
                  {results.hijos ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-slate-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-600">Hijos</span>
              </div>
              <span className="text-sm font-medium">{results.hijos ? "Sí" : "No"}</span>
            </div>

            <Button onClick={resetForm} variant="outline" className="w-full mt-4">
              Procesar otro documento
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="border-none shadow-lg">
        <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
          <CardTitle className="text-xl font-medium">Procesador de Documentos</CardTitle>
          <CardDescription className="text-slate-200">Sube tu declaración fiscal en formato PDF</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
              isDragging ? "border-slate-500 bg-slate-50" : "border-slate-200"
            } ${file ? "bg-slate-50" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              {file ? (
                <>
                  <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center">
                    <FileIcon className="h-8 w-8 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center">
                    <UploadCloudIcon className="h-8 w-8 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium">Arrastra y suelta tu archivo PDF aquí</p>
                    <p className="text-sm text-slate-500">o haz clic para seleccionar</p>
                  </div>
                </>
              )}

              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />

              {!file && (
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                  className="mt-2"
                >
                  Seleccionar archivo
                </Button>
              )}
            </div>
          </div>

          {file && (
            <Button onClick={processFile} className="w-full mt-4" disabled={isProcessing}>
              {isProcessing ? "Procesando..." : "Procesar documento"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

