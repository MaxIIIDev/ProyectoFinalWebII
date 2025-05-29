"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacienteServices = void 0;
const Pacientes_1 = require("../../data/models/Pacientes");
const createPacienteDto_1 = require("../../domain/Dtos/pacientes/createPacienteDto");
const updatePacienteDto_1 = require("../../domain/Dtos/pacientes/updatePacienteDto");
const HelperForCreateErrors_1 = require("../../Helpers/HelperForCreateErrors");
const SeguroMedicoService_1 = require("./SeguroMedicoService");
const createPacienteNNDto_1 = require("../../domain/Dtos/pacientes/createPacienteNNDto");
class PacienteServices {
}
exports.PacienteServices = PacienteServices;
_a = PacienteServices;
PacienteServices.buscarPacienteExistente = async (dni, modo) => {
    try {
        const pacienteBuscado = await Pacientes_1.Pacientes.findOne({ where: { dni: dni } });
        if (pacienteBuscado && modo === 0) { //retorna booleano
            console.log("Paciente encontrado Con exito");
            return [true, undefined];
        }
        if (pacienteBuscado && modo === 1) { //retorna el objeto
            console.log("Paciente encontrado Con exito");
            pacienteBuscado.dataValues.fecha_nac = pacienteBuscado.dataValues.fecha_nac.toISOString().split("T")[0];
            return [true, pacienteBuscado];
        }
    }
    catch (Error) {
        console.log(HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarUsuarioExistente", "PacienteService", "Line 23", Error));
        return [false, undefined];
    }
    console.log("Paciente no encontrado");
    return [false, undefined];
};
PacienteServices.buscarPacienteDesconocido = async (id_Paciente) => {
    try {
        const pacienteDesconocidoBuscado = await Pacientes_1.Pacientes.findOne({
            where: {
                id_Paciente: id_Paciente,
                dni: null
            }
        });
        if (!pacienteDesconocidoBuscado) {
            return [false];
        }
        return [true, pacienteDesconocidoBuscado];
    }
    catch (error) {
        return [false];
    }
};
PacienteServices.saberSiElPacienteTieneSeguroMedico = async (dni) => {
    try {
        const paciente = await _a.buscarPacienteExistente(dni, 1);
        if (paciente[1]?.dataValues.id_seguro_medico) {
            return [undefined, true];
        }
    }
    catch (error) {
        return [error];
    }
    return [undefined, false];
};
PacienteServices.crearPaciente = async (_createPacienteDto) => {
    try {
        const pacienteEncontrado = await _a.buscarPacienteExistente(_createPacienteDto.dni, 0);
        if (pacienteEncontrado[0])
            return ["El paciente ya existe"];
        const object = createPacienteDto_1.CreatePacienteDto.toObject(_createPacienteDto);
        const crearPaciente = await Pacientes_1.Pacientes.create(object);
        console.log("Paciente creado: " + crearPaciente.toJSON());
        return [undefined, crearPaciente];
    }
    catch (Error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente", "PacienteService", "Line 44", Error);
        // console.log(Error);
        return ["Error al crear el paciente"];
    }
};
PacienteServices.crearPacienteNN = async (_createPacienteNNDto) => {
    try {
        const object = createPacienteNNDto_1.CreatePacienteNNDto.toObject(_createPacienteNNDto);
        const crearPaciente = await Pacientes_1.Pacientes.create(object);
        console.log("Paciente NN creado: " + crearPaciente.toJSON());
        return [undefined, crearPaciente];
    }
    catch (error) {
        console.log(HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPacienteNN", "PacienteService", "Line 53", error));
        return ["Error al crear el paciente NN"];
    }
};
PacienteServices.actualizarPaciente = async (_updatePacienteDto, modo) => {
    try {
        let pacienteEncontrado;
        if (modo == 1) { //BUSCAR PACIENTE NORMAL
            pacienteEncontrado = await _a.buscarPacienteExistente(_updatePacienteDto.dni, 1);
            if (!pacienteEncontrado[0]) {
                throw Error("no se encontro al paciente");
            }
            const object = updatePacienteDto_1.UpdatePacienteDto.toObject(_updatePacienteDto);
            const [filasActualizadas] = await Pacientes_1.Pacientes.update(object, { where: {
                    dni: pacienteEncontrado[1].dni
                } });
            if (filasActualizadas === 0) {
                return ["No se actualizo ningun registro", false];
            }
        }
        else { //ACTUALIZAR PACIENTE ANONIMO
            pacienteEncontrado = await _a.buscarPacienteDesconocido(_updatePacienteDto.id_Paciente);
            if (!pacienteEncontrado[0]) {
                throw Error("no se encontro al paciente");
            }
            const object = updatePacienteDto_1.UpdatePacienteDto.toObject(_updatePacienteDto);
            const [confirmacion] = await _a.buscarPacienteExistente(_updatePacienteDto.dni, 0);
            if (confirmacion)
                return ["Ya existe un dni asociado a otro paciente"];
            const [filasActualizadas] = await Pacientes_1.Pacientes.update(object, { where: {
                    id_Paciente: pacienteEncontrado[1].id_Paciente
                } });
            if (filasActualizadas === 0) {
                return ["No se actualizo ningun registro", false];
            }
        }
    }
    catch (error) {
        console.log(HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizar Paciente", "PacienteService", "68", error));
        return ["no se actualizo el paciente", false];
    }
    return [undefined, true];
};
PacienteServices.asignarSeguroMedico = async (numeroSeguroMedico, dniPaciente) => {
    try {
        const pacienteEncontrado = await _a.buscarPacienteExistente(dniPaciente, 1);
        const instanciaPacienteEncontrada = pacienteEncontrado[1];
        if (!pacienteEncontrado[0]) {
            throw Error("no se encontro al paciente");
        }
        const seguroMedicoEncontrado = await SeguroMedicoService_1.SeguroMedicoService.buscarSeguroMedicoExistente(numeroSeguroMedico, 1);
        if (!seguroMedicoEncontrado[0]) {
            throw Error("no se encontro al seguro médico");
        }
        const validado = await SeguroMedicoService_1.SeguroMedicoService.validarQueElSeguroMedicoNoEsteAsignado(numeroSeguroMedico);
        if (validado[0]) {
            throw Error(validado[0]);
        }
        console.log(instanciaPacienteEncontrada);
        instanciaPacienteEncontrada.id_seguro_medico = seguroMedicoEncontrado[1].dataValues.id_seguro_medico;
        let ver = await instanciaPacienteEncontrada.save();
        //console.log("Paciente actualizado: " + pacienteEncontrado[1]!)
        return [undefined, true];
    }
    catch (error) {
        console.log(HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("asignarSeguroMedico", "PacienteService", "Line 93", error));
        return [error, false];
    }
};
//# sourceMappingURL=PacientesService.js.map