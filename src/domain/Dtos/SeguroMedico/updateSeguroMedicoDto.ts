

export class UpdateSeguroMedicoDto {


    constructor(
        public numero: number,
        public estado?: boolean,
        public categoria?: string
    ) {}

    // Método para convertir la instancia a un objeto plano
    static toObject = (updateSeguroMedicoDto: UpdateSeguroMedicoDto): { [key: string]: any } => {
        return {
            numero: updateSeguroMedicoDto.numero,
            estado: updateSeguroMedicoDto.estado,
            categoria: updateSeguroMedicoDto.categoria
        };
    };

    // Método para crear una instancia validando los campos
    static create(object: { [key: string]: any }): [string?, UpdateSeguroMedicoDto?] {
        try{
            if(!object){
                return ["Se requiere: numero, estado(opcional), categoria(opcional)"]
            }
            const { numero, estado, categoria } = object;

            if (!numero) return ["Se requiere el número del seguro médico"];
    
            return [undefined, new UpdateSeguroMedicoDto(numero, estado, categoria)];
        }catch(error){
            return[ error as string]
        }
       
    }

}
