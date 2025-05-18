import { calcularEdad } from "../../../Helpers/CalcularEdadPorFecha";


export class UpdatePacienteDto{
    
        private constructor(
            public id_Paciente: number,
            public nombre?: string,
            public apellido?: string,
            public dni?: number,
            public fecha_nac?: Date,
            public genero?: string,
            public direccion?: string,       
            public edad?: number,
            public peso?: number,
            public telefono?: bigint,
            public telefono_De_Emergencia?: bigint,
            public id_tipo_sanguineo?: string
        ){}
    
        static toObject= (updatePacienteDto:UpdatePacienteDto):{ [key:string]: any }=> {
            return {
                id_Paciente: updatePacienteDto.id_Paciente,
                nombre: updatePacienteDto.nombre,
                apellido: updatePacienteDto.apellido,
                dni: updatePacienteDto.dni,
                fecha_nac: updatePacienteDto.fecha_nac,
                edad: updatePacienteDto.edad,
                peso: updatePacienteDto.peso,
                genero: updatePacienteDto.genero,
                telefono: updatePacienteDto.telefono,
                telefono_De_Emergencia: updatePacienteDto.telefono_De_Emergencia,
                direccion: updatePacienteDto.direccion,
                id_tipo_sanguineo: updatePacienteDto.id_tipo_sanguineo
                
            }
        }
    
        static create(object:{ [ key:string]: any } , actual : { [ key:string]: any }):[string?, UpdatePacienteDto? ] {
    
            const { id_Paciente, nombre, apellido, dni, fecha_nac, edad , peso , genero, telefono, telefono_De_Emergencia, direccion, id_tipo_sanguineo } = object;
    
            if(!id_Paciente) return ["Se requiere el id del paciente"]
            const dniParseada = parseInt(dni)
            let edadCalculada = edad
            console.log(fecha_nac);
            
            if(fecha_nac){
                edadCalculada = calcularEdad(fecha_nac)
            }
            let fechaNacimientoModificada = new Date(fecha_nac)
            const fechaActual = new Date()
            if(fechaNacimientoModificada > fechaActual) return ["La fecha de nacimiento no puede ser mayor a la fecha actual"]
            return [undefined, new UpdatePacienteDto(
                id_Paciente,
                nombre,
                apellido,
                dniParseada,
                fecha_nac,
                genero,
                direccion,
                edadCalculada,
                peso,
                telefono,               
                telefono_De_Emergencia,
                id_tipo_sanguineo
                
            )]
        }
}