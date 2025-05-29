"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeguroMedicoService = void 0;
const Paciente_seguro_medico_1 = require("../../data/models/Paciente_seguro_medico");
const Pacientes_1 = require("../../data/models/Pacientes");
const createSeguroMedicoDto_1 = require("../../domain/Dtos/SeguroMedico/createSeguroMedicoDto");
const updateSeguroMedicoDto_1 = require("../../domain/Dtos/SeguroMedico/updateSeguroMedicoDto");
const HelperForCreateErrors_1 = require("../../Helpers/HelperForCreateErrors");
const Mutuales_1 = require("../../data/models/Mutuales");
const CategoriaSeguro_1 = require("../../data/models/CategoriaSeguro");
class SeguroMedicoService {
}
exports.SeguroMedicoService = SeguroMedicoService;
_a = SeguroMedicoService;
SeguroMedicoService.getMutualesFromDb = async () => {
    try {
        const mutualesBuscadas = await Mutuales_1.Mutuales.findAll();
        if (mutualesBuscadas.length === 0) {
            console.log("No se encontraron mutuales");
            return [false, undefined];
        }
        return [true, mutualesBuscadas];
    }
    catch (Error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getMutuales", "SeguroMedicoService", "Line 15", Error);
        return [false, undefined];
    }
};
SeguroMedicoService.getCategoriasFromDb = async () => {
    try {
        const categorias = await CategoriaSeguro_1.CategoriaSeguro.findAll();
        if (categorias.length === 0) {
            console.log("No se encontraron categorias");
            return [false, undefined];
        }
        return [true, categorias];
    }
    catch (Error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getCategorias", "SeguroMedicoService", "Line 15", Error);
        return [false, undefined];
    }
};
SeguroMedicoService.buscarSeguroMedicoExistente = async (numero, modo) => {
    try {
        const seguroMedicoBuscado = await Paciente_seguro_medico_1.Paciente_seguro_medico.findOne({
            include: [
                {
                    model: Pacientes_1.Pacientes,
                    as: "paciente",
                },
                {
                    model: Mutuales_1.Mutuales,
                    as: "mutual",
                },
                {
                    model: CategoriaSeguro_1.CategoriaSeguro,
                    as: "categoria_seguro",
                }
            ],
            where: { numero: numero }
        });
        if (seguroMedicoBuscado && modo === 0) { //retorna booleano
            console.log("Seguro medico encontrado con exito y no devuelto por modo 0");
            return [true, undefined];
        }
        if (seguroMedicoBuscado && modo === 1) { //retorna el objeto
            console.log("Seguro medico encontrado con exito devuelto por modo 1");
            return [true, seguroMedicoBuscado];
        }
    }
    catch (Error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarSeguroMedicoExistente", "SeguroMedicoService", "Line 25", Error);
        console.log("No se encontro el seguro medico");
        return [false, undefined];
    }
    return [false, undefined];
};
SeguroMedicoService.buscarSeguroMedico = async (id) => {
    try {
        const seguroMedicoBuscado = await Paciente_seguro_medico_1.Paciente_seguro_medico.findOne({
            include: [
                {
                    model: Pacientes_1.Pacientes,
                    as: "paciente"
                },
                {
                    model: Mutuales_1.Mutuales,
                    as: "mutual"
                },
                {
                    model: CategoriaSeguro_1.CategoriaSeguro,
                    as: "categoria_seguro"
                }
            ],
            where: { id_seguro_medico: id }
        });
        if (seguroMedicoBuscado) { //retorna el objeto
            console.log("Seguro medico encontrado con exito devuelto por modo 1");
            return [true, seguroMedicoBuscado];
        }
    }
    catch (Error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarSeguroMedicoExistente", "SeguroMedicoService", "Line 25", Error);
        return [false, undefined];
    }
    console.log("No se encontro el seguro medico");
    return [false, undefined];
};
SeguroMedicoService.createSeguroMedico = async (createSeguroMedicoDto) => {
    try {
        const seguroMedicoEncontrado = await _a.buscarSeguroMedicoExistente(createSeguroMedicoDto.numero, 0);
        if (seguroMedicoEncontrado[0])
            return ["El seguro médico ya existe", undefined];
        const object = createSeguroMedicoDto_1.CreateSeguroMedicoDto.toObject(createSeguroMedicoDto);
        const seguroMedicoCreado = await Paciente_seguro_medico_1.Paciente_seguro_medico.create(object);
        if (seguroMedicoCreado)
            console.log("Seguro médico creado: ");
        return [undefined, seguroMedicoCreado];
    }
    catch (Error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("createSeguroMedico", "SeguroMedicoService", "Line 99", Error);
        return ["Error al crear el seguro médico", undefined];
    }
};
SeguroMedicoService.updateSeguroMedico = async (updateSeguroMedicoDto, id_seguro_medico, id_Paciente) => {
    try {
        const seguroMedicoEncontrado = await _a.buscarSeguroMedico(id_seguro_medico);
        if (!seguroMedicoEncontrado[0]) {
            return ["No se encontro al seguro médico"];
        }
        const [error, confirmacion] = await _a.validarQueElSeguroMedicoNoEsteAsignadoComparando(updateSeguroMedicoDto.numero, id_Paciente);
        if (!confirmacion) {
            return [error];
        }
        const updateSeguroMedicoToObject = updateSeguroMedicoDto_1.UpdateSeguroMedicoDto.toObject(updateSeguroMedicoDto);
        const [filasActualizadas] = await Paciente_seguro_medico_1.Paciente_seguro_medico.update(updateSeguroMedicoToObject, { where: {
                numero: seguroMedicoEncontrado[1].dataValues.numero
            } });
        if (filasActualizadas === 0) {
            throw Error("no se actualizo el seguro médico");
        }
        console.log("Seguro médico actualizado: " + updateSeguroMedicoToObject);
        return [undefined, true];
    }
    catch (error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("updateSeguroMedico", "SeguroMedicoService", "Line 78", error);
        return ["Error al actualizar el seguro médico", false];
    }
};
SeguroMedicoService.validarQueElSeguroMedicoNoEsteAsignado = async (numeroSeguroMedico) => {
    try {
        const seguroMedicoBuscado = await _a.buscarSeguroMedicoExistente(numeroSeguroMedico, 1);
        if (!seguroMedicoBuscado[0]) {
            throw Error("No se encontro el seguro medico");
        }
        const validarSiEstaAsignado = await Pacientes_1.Pacientes.findOne({ where: { id_seguro_medico: seguroMedicoBuscado[1].dataValues.id_seguro_medico } });
        if (validarSiEstaAsignado) {
            console.log("El seguro médico ya está asignado a otro usuario");
            throw Error("El seguro médico ya está asignado a otro usuario");
        }
        console.log("El seguro medico es valido y no esta asignado");
    }
    catch (Error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarQueElSeguroMedicoNoEsteAsignado", "SeguroMedicoService", "Line 99", Error);
        return [Error, false];
    }
    return [undefined, true];
};
SeguroMedicoService.validarQueElSeguroMedicoNoEsteAsignadoComparando = async (numeroSeguroMedico, id_Paciente) => {
    try {
        const seguroMedicoBuscado = await _a.buscarSeguroMedicoExistente(numeroSeguroMedico, 1);
        if (!seguroMedicoBuscado[1]) {
            return [undefined, true];
        }
        const validarSiEstaAsignado = await Pacientes_1.Pacientes.findOne({ where: { id_seguro_medico: seguroMedicoBuscado[1].dataValues.id_seguro_medico } });
        console.log("Numero de paciente buscado: " + validarSiEstaAsignado?.dataValues.id_Paciente + "\nNumero de paciente Enviado: " + id_Paciente);
        if (validarSiEstaAsignado?.dataValues.id_Paciente != id_Paciente) {
            console.log("El seguro médico ya está asignado a otro usuario");
            return [undefined, false];
        }
        console.log("El seguro medico es valido y no esta asignado");
        return [undefined, true];
    }
    catch (Error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarQueElSeguroMedicoNoEsteAsignado", "SeguroMedicoService", "Line 99", Error);
        return [Error, false];
    }
};
//# sourceMappingURL=SeguroMedicoService.js.map