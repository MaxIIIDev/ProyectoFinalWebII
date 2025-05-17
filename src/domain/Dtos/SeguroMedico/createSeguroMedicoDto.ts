export class CreateSeguroMedicoDto {
    constructor(
        public numero: number,
        public dni_Paciente: number,
        public estado?: boolean,
        public id_categoria_seguro?: number
        
    ) {}

    // Método para convertir la instancia a un objeto plano
    static toObject = (createSeguroMedicoDto: CreateSeguroMedicoDto): { [key: string]: any } => {
        return {
            numero: createSeguroMedicoDto.numero,
            estado: createSeguroMedicoDto.estado,
            id_categoria_seguro: createSeguroMedicoDto.id_categoria_seguro
        };
    };

    // Método para crear una instancia validando los campos
    static create(object: { [key: string]: any }): [string?, CreateSeguroMedicoDto?] {
        try{
            if(!object){
                throw Error("Se requiere= "+
                    " dni_Paciente: "+
                    " numero:" +
                    " estado:"+
                    " id_categoria_seguro:")
            }
            const { numero, dni_Paciente , estado, id_categoria_seguro } = object;

            if (!numero) return ["Se requiere el número del seguro médico"];
            if(!dni_Paciente) return ["Se requiere el dni del paciente"];
            return [undefined, new CreateSeguroMedicoDto(numero,dni_Paciente ,estado, id_categoria_seguro)];
        }catch(error){
            return [error as string, undefined]
        }
        
    }
}