import { nombre_Prueba_Diagnostica } from "../../../data/models/Nombre_Prueba_Diagnostica"
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors"


export class NombrePruebaDiagnosticaService{
    
    static async buscarNombrePruebaDiagnosticaPorId(id_nombre_prueba_diagnostica:number):Promise<[string?,nombre_Prueba_Diagnostica?]>{
        try {
            if(!id_nombre_prueba_diagnostica || id_nombre_prueba_diagnostica < 0) return ["El id_nombre_prueba_diagnostica es nulo o menor que 0"]
            const nombrePruebaDiagnostica = await nombre_Prueba_Diagnostica.findOne({
                where: {
                    id_nombre_prueba_diagnostica: id_nombre_prueba_diagnostica
                }
            })
            if(!nombrePruebaDiagnostica) return ["No se ha encontrado registrado el nombre de la prueba diagnostica", undefined]
            return [undefined, nombrePruebaDiagnostica]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarNombrePruebaDiagnosticaPorId","NombrePruebaDiagnosticaService","10",error as string)   
            return [error as string, undefined]
        }
    }
    static async buscarTodosLosNombresDePruebasDiagnosticas():Promise<[string?,nombre_Prueba_Diagnostica[]?]>{
        try {
            const nombresDePruebasDiagnosticas = await nombre_Prueba_Diagnostica.findAll()
            if(!nombresDePruebasDiagnosticas) return ["No se ha encontrado registrado ningun nombre de prueba diagnostica", undefined]
            return [undefined, nombresDePruebasDiagnosticas]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodosLosNombresDePruebasDiagnosticas","NombrePruebaDiagnosticaService","20",error as string)   
            return [error as string, undefined]
        }
    }
}