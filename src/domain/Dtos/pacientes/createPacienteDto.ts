import { calcularEdad } from "../../../Helpers/CalcularEdadPorFecha";


export class CreatePacienteDto{


    private constructor(

        public nombre:string,
        public apellido: string,
        public dni?: number,
        public fecha_nac?: Date,
        public genero?: string,
        public direccion?:string,       
        public edad?: number,
        public peso?: number,
        public telefono?: bigint,
        public telefono_De_Emergencia?: bigint,
        public id_tipo_sanguineo?: number,
        public id_seguro_medico?: number

    ){}

    static toObject= (createPacienteDto:CreatePacienteDto):{ [key:string]: any }=> {

        return {
            nombre: createPacienteDto.nombre,
            apellido: createPacienteDto.apellido,
            dni: createPacienteDto.dni,
            fecha_nac: createPacienteDto.fecha_nac,
            edad: createPacienteDto.edad,
            peso: createPacienteDto.peso,
            genero: createPacienteDto.genero,
            telefono: createPacienteDto.telefono,
            telefono_De_Emergencia: createPacienteDto.telefono_De_Emergencia,
            direccion: createPacienteDto.direccion,
            id_tipo_sanguineo: createPacienteDto.id_tipo_sanguineo,
            id_seguro_medico: createPacienteDto.id_seguro_medico
            
        }

    }

    static create(object:{ [ key:string]: any } ):[string?, CreatePacienteDto? ] {
        
        
        const { nombre, apellido, dni, fecha_nac, edad , peso , genero, telefono, telefono_De_Emergencia, direccion, id_tipo_sanguineo, id_seguro_medico } = object;

        if(!nombre) return ["Se requiere el nombre"]
        if( !apellido) return ["Se requiere el apellido"]
        if(!dni) return ["Se requiere el dni"]
        if(!fecha_nac) ["Se requiere la fecha de nacimiento"]       
        if(!genero) return ["Se requiere el genero"]
        if(!direccion) return ["Se requiere la direccion"]
        let edadCalculada;
        if(new Date(fecha_nac) > new Date()) return ["La fecha de nacimiento no puede ser mayor a la fecha actual"]
        if(fecha_nac){
            edadCalculada = calcularEdad(fecha_nac)
        }
        let fechaNacimientoModificada = fecha_nac.split("T")[0]
        let id_tipo_sanguineoCambio ;
        const telefono_De_EmergenciaParse = (object.telefono_De_Emergencia == "")?null: object.telefono_De_Emergencia;
        if(id_tipo_sanguineo == 0){
            id_tipo_sanguineoCambio = undefined
        }else{
            id_tipo_sanguineoCambio = id_tipo_sanguineo
        }
        const id_tipo_sanguineoParse = parseInt(id_tipo_sanguineo)
        return [undefined, new CreatePacienteDto(
            nombre,
            apellido,
            dni,
            fechaNacimientoModificada,
            genero,
            direccion,
            edadCalculada!,
            peso,
            telefono,
            telefono_De_EmergenciaParse,
            id_tipo_sanguineoParse,
            id_seguro_medico
         )]
        
    }
    

}
