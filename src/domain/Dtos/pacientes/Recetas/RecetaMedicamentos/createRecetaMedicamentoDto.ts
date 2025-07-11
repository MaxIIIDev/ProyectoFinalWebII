import { HelperForCreateErrors } from "../../../../../Helpers/HelperForCreateErrors"



export class createRecetaMedicamentoDto{
 
    private constructor(
        public id_Receta: number,
        public id_Medicamento: number,
        public indicacion:string
    ){}


    public static toObject(_createRecetaMedicamentoDto:createRecetaMedicamentoDto):{
        id_Receta: number,
        id_Medicamento: number,
        indicacion:string
    }{
        return {
            id_Receta: _createRecetaMedicamentoDto.id_Receta,
            id_Medicamento: _createRecetaMedicamentoDto.id_Medicamento,
            indicacion: _createRecetaMedicamentoDto.indicacion
        }
    }
    public static create(object:{[key:string]:any}):[string?,createRecetaMedicamentoDto?]{
        try {
            if(!object.id_Receta || Number(object.id_Receta) < 0) return ["El id_Receta es nulo o menor que 0"]
            if(!object.id_Medicamento || Number(object.id_Medicamento) < 0) return ["El id_Medicamento es nulo o menor que 0"]
            if(!object.indicacion || object.indicacion.length < 10) return ["El indicacion es menor que 10 o es requerido"]
            return [undefined, new createRecetaMedicamentoDto(
                Number(object.id_Receta),
                Number(object.id_Medicamento),
                object.indicacion
            )] 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","createRecetaMedicamentoDto","40",error as string)
            return [error as string, undefined]
        }
    }

}