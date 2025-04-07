"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileIcon,
  UploadCloudIcon,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Clock,
  TrendingUp,
  ArrowDownCircle,
  BanknoteIcon,
  UserIcon,
  XCircle,
  ArrowLeftIcon,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

type ResultsType = {
  devolver: string
  ingresos: string
  retenciones: string
  estado: string
  hijos: boolean
}

export default function ModernLandingUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<ResultsType | null>(null)
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
      // Set mock results
      setResults({
        devolver: "1.176,12",
        ingresos: "30.700",
        retenciones: "5.200",
        estado: "Soltero",
        hijos: false,
      })
      setIsProcessing(false)
      toast({
        title: "Procesamiento completado",
        description: "Tu declaración ha sido analizada correctamente.",
      })
    }, 1500)
  }

  const resetForm = () => {
    setFile(null)
    setResults(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 text-white p-2 rounded-lg">
            <TrendingUp className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl">MiRenta</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Cómo funciona
          </a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Precios
          </a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            FAQ
          </a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900">
            Contacto
          </a>
        </div>

        <Button variant="outline" size="sm" className="hidden md:flex">
          Iniciar sesión
        </Button>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="px-3 py-1 bg-slate-100 text-slate-800 hover:bg-slate-100 border-none">
              Nuevo: Análisis Inteligente
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
              Optimiza tu declaración fiscal en segundos
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Sube tu declaración fiscal en PDF y nuestro sistema de IA analizará automáticamente tus datos,
              identificando oportunidades de ahorro y posibles devoluciones.
            </p>

          </div>

          <div>
            <Card className="border-none shadow-xl overflow-hidden bg-white">
              <CardContent className="p-0">
                {results ? (
                  /* Results View */
                  <>
                    <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-semibold">Resultados del análisis</h2>
                          <p className="text-slate-300 mt-1">Declaración fiscal {file?.name}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:text-white hover:bg-slate-600"
                          onClick={resetForm}
                        >
                          <ArrowLeftIcon className="h-4 w-4 mr-2" />
                          Volver
                        </Button>
                      </div>
                    </div>

                    <div className="p-8">
                      {/* Main Result - Amount to Return */}
                      <div className="mb-8 text-center">
                        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-50 mb-4">
                          <ArrowDownCircle className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-slate-500 font-medium mb-1">Cantidad a devolver</h3>
                        <div className="text-4xl font-bold text-green-600">€{results.devolver}</div>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-slate-100 my-6"></div>

                      {/* Other Results */}
                      <div className="grid gap-6">
                        {/* Income */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-full">
                              <BanknoteIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-600">Ingresos</span>
                          </div>
                          <span className="text-lg font-medium">€{results.ingresos}</span>
                        </div>

                        {/* Withholdings */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2 rounded-full">
                              <BanknoteIcon className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium text-slate-600">Retenciones</span>
                          </div>
                          <span className="text-lg font-medium">€{results.retenciones}</span>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-slate-100 my-2"></div>

                        {/* Status */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-amber-50 p-2 rounded-full">
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
                            <div className="bg-slate-50 p-2 rounded-full">
                              {results.hijos ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <XCircle className="h-5 w-5 text-slate-500" />
                              )}
                            </div>
                            <span className="text-sm font-medium text-slate-600">Hijos</span>
                          </div>
                          <span className="text-sm font-medium">{results.hijos ? "Sí" : "No"}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-8 grid gap-3">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800">Descargar informe completo</Button>
                        <Button variant="outline" className="w-full" onClick={resetForm}>
                          Analizar otro documento
                        </Button>
                      </div>

                      {/* Recommendation */}
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="font-medium text-blue-800 mb-1">Recomendación</h4>
                        <p className="text-sm text-blue-700">
                          Basado en tu perfil, podrías ahorrar hasta €320 adicionales aplicando la deducción por
                          inversión en vivienda habitual.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Upload View */
                  <>
                    <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 text-white">
                      <h2 className="text-xl font-semibold">Analiza tu declaración</h2>
                      <p className="text-slate-300 mt-1">Obtén resultados en menos de 2 minutos</p>
                    </div>

                    <div className="p-6">
                      <div
                        className={`border-2 border-dashed rounded-xl p-8 transition-all ${
                          isDragging ? "border-slate-500 bg-slate-50" : "border-slate-200"
                        } ${file ? "bg-slate-50" : ""}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <div className="flex flex-col items-center justify-center gap-4 text-center">
                          {file ? (
                            <>
                              <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center">
                                <FileIcon className="h-8 w-8 text-green-600" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{file.name}</p>
                                <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                              <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                <CheckCircle className="mr-1 h-3 w-3" /> Archivo listo
                              </Badge>
                            </>
                          ) : (
                            <>
                              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center">
                                <UploadCloudIcon className="h-8 w-8 text-slate-500" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">Arrastra y suelta tu declaración fiscal</p>
                                <p className="text-sm text-slate-500">Formato PDF (máx. 10MB)</p>
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
                        <Button
                          onClick={processFile}
                          className="w-full mt-6 bg-slate-900 hover:bg-slate-800"
                          disabled={isProcessing}
                          size="lg"
                        >
                          {isProcessing ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                              Analizando documento...
                            </>
                          ) : (
                            "Analizar documento"
                          )}
                        </Button>
                      )}

                      <div className="mt-6 pt-6 border-t border-slate-100">
                        <p className="text-xs text-slate-500 text-center">
                          Todos los archivos se procesan de forma segura, no nos guardamos tus archivos, y se usa inteligencia artificial para procesar y extraer la información.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">¿Por qué elegir MiRenta?</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Nuestra plataforma utiliza tecnología avanzada para analizar tu declaración fiscal y encontrar oportunidades
            de ahorro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Análisis Inteligente</h3>
            <p className="mt-2 text-slate-600">
              La inteligencia artificial analiza cada detalle de tu declaración para maximizar tu devolución.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">Resultados Inmediatos</h3>
            <p className="mt-2 text-slate-600">
              Obtén un análisis detallado en menos de 2 minutos, sin esperas ni complicaciones.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">100% Seguro</h3>
            <p className="mt-2 text-slate-600">
              Enviamos tu archivo de forma segura a una inteligencia artificial que lo analiza y es capaz de extraer la información. No nos guardamos tus archivos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

