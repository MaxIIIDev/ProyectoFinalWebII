export class CreateSeguroMedicoDto {
    constructor(
        public id_mutual: number,
        public numero: number,     
        public estado?: boolean,
        public id_categoria_seguro?: number
        
    ) {}

    // Método para convertir la instancia a un objeto plano
    static toObject = (createSeguroMedicoDto: CreateSeguroMedicoDto): { [key: string]: any } => {
        return {
            id_mutual: createSeguroMedicoDto.id_mutual,
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
                    " id_mutual: "+
                    " numero:" +
                    " estado:"+
                    " id_categoria_seguro:")
            }
            const {  id_mutual ,numero, estado, id_categoria_seguro } = object;
            if(!id_mutual) return ["Se requiere el id de la mutual"];
            if(!id_categoria_seguro) return ["Se requiere el id de la categoria del seguro"];
            if (!numero) return ["Se requiere el número del seguro médico"];
            
            return [undefined, new CreateSeguroMedicoDto(id_mutual,numero ,estado, id_categoria_seguro)];
        }catch(error){
            return [error as string, undefined]
        }
    }
}