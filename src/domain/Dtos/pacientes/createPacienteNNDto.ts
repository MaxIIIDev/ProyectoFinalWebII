import { calcularEdad } from "../../../Helpers/CalcularEdadPorFecha";



export class CreatePacienteNNDto {

    private constructor(
        public nombre: string,
        public apellido: string,
        public dni?: number,
        public fecha_nac?: Date,
        public edad?: number,
        public genero?: string,
        public direccion?: string,
    ) { }

    static toObject = (createPacienteDto: CreatePacienteNNDto): { [key: string]: any } => {

        return {
            nombre: createPacienteDto.nombre,
            apellido: createPacienteDto.apellido,
            dni: createPacienteDto.dni,
            fecha_nac: createPacienteDto.fecha_nac,
            edad: createPacienteDto.edad,
            genero: createPacienteDto.genero,           
            direccion: createPacienteDto.direccion,
        }
    }
    static create(object: { [key: string]: any }): [string?, CreatePacienteNNDto?] {

        const { nombre, apellido, dni,fecha_nac, edad, genero,direccion } = object;
        if (!genero) return ["Se requiere el genero"]
        return [undefined, new CreatePacienteNNDto(
            nombre,
            apellido,
            dni,
            fecha_nac,
            edad,            
            genero,
            direccion,
        )]
    }

}