export class CreateSeguroMedicoDto {
    constructor(
        public numero: number,
        public dni_Paciente: number,
        public estado?: boolean,
        public categoria?: string
        
    ) {}

    // Método para convertir la instancia a un objeto plano
    static toObject = (createSeguroMedicoDto: CreateSeguroMedicoDto): { [key: string]: any } => {
        return {
            numero: createSeguroMedicoDto.numero,
            estado: createSeguroMedicoDto.estado,
            categoria: createSeguroMedicoDto.categoria
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
                    " categoria:")
            }
            const { numero, dni_Paciente , estado, categoria } = object;

            if (!numero) return ["Se requiere el número del seguro médico"];
            if(!dni_Paciente) return ["Se requiere el dni del paciente"];
            return [undefined, new CreateSeguroMedicoDto(numero,dni_Paciente ,estado, categoria)];
        }catch(error){
            return [error as string, undefined]
        }
        
    }
}