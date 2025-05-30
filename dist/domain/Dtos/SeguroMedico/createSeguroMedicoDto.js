"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSeguroMedicoDto = void 0;
class CreateSeguroMedicoDto {
    constructor(id_mutual, numero, id_categoria_seguro, dni_Paciente) {
        this.id_mutual = id_mutual;
        this.numero = numero;
        this.id_categoria_seguro = id_categoria_seguro;
        this.dni_Paciente = dni_Paciente;
    }
    // Método para crear una instancia validando los campos
    static create(object) {
        try {
            if (!object) {
                throw Error("Se requiere= " +
                    " id_mutual: " +
                    " numero:" +
                    " estado:" +
                    " id_categoria_seguro:" +
                    " dni_Paciente:");
            }
            const { id_mutual, numero, id_categoria_seguro, dni_Paciente } = object;
            if (!id_mutual)
                return ["Se requiere el id de la mutual"];
            if (!id_categoria_seguro)
                return ["Se requiere el id de la categoria del seguro"];
            if (!numero)
                return ["Se requiere el número del seguro médico"];
            if (!dni_Paciente)
                return ["Se requiere el dni del paciente"];
            return [undefined, new CreateSeguroMedicoDto(id_mutual, numero, id_categoria_seguro, dni_Paciente)];
        }
        catch (error) {
            return [error, undefined];
        }
    }
}
exports.CreateSeguroMedicoDto = CreateSeguroMedicoDto;
// Método para convertir la instancia a un objeto plano
CreateSeguroMedicoDto.toObject = (createSeguroMedicoDto) => {
    return {
        id_mutual: createSeguroMedicoDto.id_mutual,
        numero: createSeguroMedicoDto.numero,
        id_categoria_seguro: createSeguroMedicoDto.id_categoria_seguro,
        dni_Paciente: createSeguroMedicoDto.dni_Paciente
    };
};
