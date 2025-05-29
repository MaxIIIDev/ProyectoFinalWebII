"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSeguroMedicoDto = void 0;
class UpdateSeguroMedicoDto {
    constructor(id_mutual, numero, estado, id_categoria_seguro) {
        this.id_mutual = id_mutual;
        this.numero = numero;
        this.estado = estado;
        this.id_categoria_seguro = id_categoria_seguro;
    }
    // Método para crear una instancia validando los campos
    static create(object) {
        try {
            if (!object) {
                return ["Se requiere: id_mutual , numero, estado(opcional), id_categoria_seguro(opcional)"];
            }
            const { id_mutual, numero, estado, id_categoria_seguro } = object;
            let estadoModificado;
            if (!numero)
                return ["Se requiere el número del seguro médico"];
            if (estado) {
                if (estado == "true")
                    estadoModificado = true;
                if (estado == "false")
                    estadoModificado = false;
            }
            return [undefined, new UpdateSeguroMedicoDto(id_mutual, numero, estadoModificado, id_categoria_seguro)];
        }
        catch (error) {
            return [error];
        }
    }
}
exports.UpdateSeguroMedicoDto = UpdateSeguroMedicoDto;
// Método para convertir la instancia a un objeto plano
UpdateSeguroMedicoDto.toObject = (updateSeguroMedicoDto) => {
    return {
        id_mutual: updateSeguroMedicoDto.id_mutual,
        numero: updateSeguroMedicoDto.numero,
        estado: updateSeguroMedicoDto.estado,
        id_categoria_seguro: updateSeguroMedicoDto.id_categoria_seguro
    };
};
