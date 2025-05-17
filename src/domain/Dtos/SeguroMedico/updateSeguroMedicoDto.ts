

export class UpdateSeguroMedicoDto {


    constructor(
        public numero: number,
        public estado?: boolean,
        public id_categoria_seguro?: string
    ) {}

    // Método para convertir la instancia a un objeto plano
    static toObject = (updateSeguroMedicoDto: UpdateSeguroMedicoDto): { [key: string]: any } => {
        return {
            numero: updateSeguroMedicoDto.numero,
            estado: updateSeguroMedicoDto.estado,
            id_categoria_seguro: updateSeguroMedicoDto.id_categoria_seguro
        };
    };

    // Método para crear una instancia validando los campos
    static create(object: { [key: string]: any }): [string?, UpdateSeguroMedicoDto?] {
        try{
            if(!object){
                return ["Se requiere: numero, estado(opcional), id_categoria_seguro(opcional)"]
            }
            const { numero, estado, id_categoria_seguro } = object;

            if (!numero) return ["Se requiere el número del seguro médico"];
    
            return [undefined, new UpdateSeguroMedicoDto(numero, estado, id_categoria_seguro)];
        }catch(error){
            return[ error as string]
        }
       
    }

}
