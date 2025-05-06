

export class UpdatePacienteDto{
    
        private constructor(
            public id_paciente: number,
            public nombre?: string,
            public apellido?: string,
            public dni?: number,
            public fecha_nac?: Date,
            public genero?: string,
            public direccion?: string,       
            public edad?: number,
            public peso?: number,
            public telefono?: number,
            public telefono_De_Emergencia?: number,
            public tipo_sanguineo?: string
        ){}
    
        static toObject= (updatePacienteDto:UpdatePacienteDto):{ [key:string]: any }=> {
            return {
                id_paciente: updatePacienteDto.id_paciente,
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
                tipo_sanguineo: updatePacienteDto.tipo_sanguineo
                
            }
        }
    
        static create(object:{ [ key:string]: any } ):[string?, UpdatePacienteDto? ] {
    
            const { id_paciente, nombre, apellido, dni, fecha_nac, edad , peso , genero, telefono, telefono_De_Emergencia, direccion, tipo_sanguineo } = object;
    
            if(!id_paciente) return ["Se requiere el id del paciente"]
    
            return [undefined, new UpdatePacienteDto(
                id_paciente,
                nombre,
                apellido,
                dni,
                fecha_nac,
                genero,
                telefono,
                direccion,
                edad,
                peso,
                telefono_De_Emergencia,
                tipo_sanguineo
                
            )]
        }
}