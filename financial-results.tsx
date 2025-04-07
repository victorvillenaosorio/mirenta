"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDownCircle, BanknoteIcon, CheckCircle2, UserIcon, XCircle } from "lucide-react"

export default function FinancialResults() {
  // This would typically come from an API or props
  const results = {
    devolver: "1.176,12",
    ingresos: "30.700",
    retenciones: "5.200",
    estado: "Soltero",
    hijos: false,
  }

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
        </CardContent>
      </Card>
    </div>
  )
}

