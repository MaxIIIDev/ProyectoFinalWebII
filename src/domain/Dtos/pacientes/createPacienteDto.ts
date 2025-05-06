

export class CreatePacienteDto{


    private constructor(

        public nombre:string,
        public apellido: string,
        public dni: number,
        public fecha_nac: Date,
        public genero: string,
        public direccion:string,       
        public edad: number,
        public peso?: number,
        public telefono?: number,
        public telefono_De_Emergencia?: number,
        public tipo_sanguineo?: string


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
            tipo_sanguineo: createPacienteDto.tipo_sanguineo
            
        }

    }

    static create(object:{ [ key:string]: any } ):[string?, CreatePacienteDto? ] {

        const { nombre, apellido, dni, fecha_nac, edad , peso , genero, telefono, telefono_De_Emergencia, direccion, tipo_sanguineo } = object;

        if(!nombre) return ["Se requiere el nombre"]
        if( !apellido) return ["Se requiere el apellido"]
        if(!dni) return ["Se requiere el dni"]
        if(!fecha_nac) ["Se requiere la fecha de nacimiento"]
        if(!edad) return ["Se requiere la edad"]
        if(!peso) return ["Se requiere el peso"]
        if(!genero) return ["Se requiere el genero"]
        if(!direccion) return ["Se requiere la direccion"]

        return [undefined, new CreatePacienteDto(
            nombre,
            apellido,
            dni,
            fecha_nac,
            genero,
            direccion,
            edad,
            peso,
            telefono,
            telefono_De_Emergencia,
            tipo_sanguineo
         )]
        
    }
    

}
