import { HelperForCreateErrors } from "../../../../Helpers/HelperForCreateErrors";


export class updateAlergiaDto {

    private constructor(
        public id_Alergia:number,
        public id_nombre_alergia: number,
        public descripcion: string,
        public id_paciente: number,
        public id_tratamiento: number
    ){}
    public static toObject(_createAlergiaDto: updateAlergiaDto):{[key:string]:any} {
        return {
            id_nombre_alergia: _createAlergiaDto.id_nombre_alergia,
            descripcion: _createAlergiaDto.descripcion,
            id_paciente: _createAlergiaDto.id_paciente,
            id_tratamiento: _createAlergiaDto.id_tratamiento
        }
    }
    public static create(object: {[key:string]:any}): [string?,updateAlergiaDto?]{

        try {
            if(!object.id_Alergia) return ["Se requiere id_Alergia"]
            if(!object.id_nombre_alergia) return ["id_nombre_alergia is missing"]
            if(!object.descripcion) return ["Se requiere una descripcion"]
            if(!object.id_paciente) return ["Se requiere el id_paciente"]
            if(!object.id_tratamiento) return ["Se requiere el id_tratamiento"]
            return[undefined,new updateAlergiaDto(
                Number(object.id_Alergia),
                Number(object.id_nombre_alergia),
                object.descripcion,
                Number(object.id_paciente),
                Number(object.id_tratamiento)
            )]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("create","createAlergiaDto","28",error as string)
            return [error, undefined]
        }

    }

}