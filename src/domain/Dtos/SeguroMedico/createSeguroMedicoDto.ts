export class CreateSeguroMedicoDto {
    constructor(
        public numero: number,
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
        const { numero, estado, categoria } = object;

        if (!numero) return ["Se requiere el número del seguro médico"];

        return [undefined, new CreateSeguroMedicoDto(numero, estado, categoria)];
    }
}