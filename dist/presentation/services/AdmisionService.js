"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmisionService = void 0;
const Admision_1 = require("../../data/models/Admision");
const Hospital_camas_1 = require("../../data/models/Hospital_camas");
const motivo_De_Internacion_1 = require("../../data/models/motivo_De_Internacion");
const Pacientes_1 = require("../../data/models/Pacientes");
const Prioridad_De_Atencion_1 = require("../../data/models/Prioridad_De_Atencion");
const tipo_De_Admision_1 = require("../../data/models/tipo_De_Admision");
const ActualizarAdmisionDTO_1 = require("../../domain/Dtos/admision/ActualizarAdmisionDTO");
const CrearAdmisionDTO_1 = require("../../domain/Dtos/admision/CrearAdmisionDTO");
const HelperForCreateErrors_1 = require("../../Helpers/HelperForCreateErrors");
const CamaService_1 = require("./Hospital/CamaService");
class AdmisionService {
    static async buscarTodasLasAdmisiones(modo) {
        try {
            if (modo === 1) { //*modo 1 trae todas las admisiones
                const admisiones = await Admision_1.Admision.findAll({
                    include: [
                        {
                            model: Pacientes_1.Pacientes,
                            as: "pacientes"
                        },
                        {
                            model: Hospital_camas_1.Hospital_camas,
                            as: "camas"
                        },
                        {
                            model: motivo_De_Internacion_1.motivo_De_Internacion,
                            as: "motivo_de_internacion"
                        },
                        {
                            model: Prioridad_De_Atencion_1.Prioridad_De_Atencion,
                            as: "prioridad_de_atencion"
                        },
                        {
                            model: tipo_De_Admision_1.tipo_De_Admision,
                            as: "tipo_de_admision"
                        }
                    ],
                });
                return [undefined, admisiones];
            }
            const admisiones = await Admision_1.Admision.findAll({
                include: [
                    {
                        model: Pacientes_1.Pacientes,
                        as: "pacientes"
                    },
                    {
                        model: Hospital_camas_1.Hospital_camas,
                        as: "camas"
                    },
                    {
                        model: motivo_De_Internacion_1.motivo_De_Internacion,
                        as: "motivo_de_internacion"
                    },
                    {
                        model: Prioridad_De_Atencion_1.Prioridad_De_Atencion,
                        as: "prioridad_de_atencion"
                    },
                    {
                        model: tipo_De_Admision_1.tipo_De_Admision,
                        as: "tipo_de_admision"
                    }
                ],
                where: { estado: "Activo" }
            });
            if (admisiones.length === 0) {
                return ["No hay admisiones activas", undefined];
            }
            return [undefined, admisiones];
        }
        catch (error) {
            console.error("Error al buscar todas las admisiones:", error);
            return ["Error al buscar admisiones", undefined];
        }
    }
}
exports.AdmisionService = AdmisionService;
_a = AdmisionService;
AdmisionService.getTiposDeAdmision = async () => {
    try {
        const tiposDeAdmision = await tipo_De_Admision_1.tipo_De_Admision.findAll();
        if (!tipo_De_Admision_1.tipo_De_Admision)
            return ["No se obtuvo los registros de tiposDeAdmision", undefined];
        return [undefined, tiposDeAdmision];
    }
    catch (error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTiposDeAdmision", "AdmisionService", "22", error);
        return [error];
    }
};
AdmisionService.actualizarAdmision = async (updateAdmisionDto) => {
    try {
        const admisionEncontrada = await _a.buscarAdmisionVigentePorPaciente(updateAdmisionDto.id_Paciente);
        if (admisionEncontrada[0]) {
            return admisionEncontrada[0];
        }
        const [filasActualizadas] = await Admision_1.Admision.update(ActualizarAdmisionDTO_1.ActualizarAdmisionDto.toObject(updateAdmisionDto), { where: {
                id_Paciente: updateAdmisionDto.id_Paciente
            } });
        if (filasActualizadas === 0) {
            return ["No se actualizo la admision", false];
        }
        const confirmacionDeActualizacionDeCama = await CamaService_1.CamaService.marcarCamaComoOcupada(updateAdmisionDto.id_Cama);
        if (!confirmacionDeActualizacionDeCama[1]) {
            HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizar Admision", "Admision Service", "31", confirmacionDeActualizacionDeCama[0]);
        }
        return [undefined, true];
    }
    catch (error) {
        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizar Admision", "Admision Service", "31", error);
        return [undefined];
    }
};
AdmisionService.crearAdmision = async (crearAdmisionDto) => {
    try {
        const [, admisionVigente] = await _a.buscarAdmisionVigentePorPaciente(crearAdmisionDto.id_Paciente);
        if (admisionVigente) {
            HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearAdmision", "AdmisionService", "16", "Ya hay una admision para dicho paciente activa");
            return ["Ya hay una admision para dicho paciente activa"];
        }
        const admisionCreada = await Admision_1.Admision.create(CrearAdmisionDTO_1.CrearAdmisionDto.toObject(crearAdmisionDto));
        if (!admisionCreada)
            return ["No se creo la admision"];
        if (admisionCreada) {
            CamaService_1.CamaService.marcarCamaComoOcupada(admisionCreada.dataValues.id_Cama); //todo: revisar
        }
        console.log("Se creo la admision" + admisionCreada.toJSON());
        return [undefined, true, admisionCreada];
    }
    catch (error) {
        return [error, false];
    }
};
AdmisionService.buscarAdmisionVigentePorPaciente = async (id_Paciente) => {
    try {
        const admisionEncontrada = await Admision_1.Admision.findOne({
            where: {
                estado: "Activo",
                id_Paciente: id_Paciente
            }
        });
        if (!admisionEncontrada)
            return ["No hay admiciones activas para dicho paciente"];
        return [undefined, admisionEncontrada];
    }
    catch (error) {
        return [error];
    }
};
AdmisionService.bajaLogicaAdmision = async (id_Admision) => {
    try {
        const admisionEncontrada = await Admision_1.Admision.findOne({ where: {
                id_Admision: id_Admision
            } });
        if (!admisionEncontrada)
            return ["No se encontro la admision"];
        const admisionBaja = await Admision_1.Admision.update({ estado: "Inactivo" }, { where: { id_Admision: id_Admision } });
        if (!admisionBaja)
            return ["No se pudo dar de baja la admision"];
        const seDioBajaLogica = await CamaService_1.CamaService.marcarCamaComoLibre(admisionEncontrada.dataValues.id_Cama);
        if (!seDioBajaLogica[1])
            return ["No se pudo marcar libre la cama", seDioBajaLogica[1]];
        return [undefined, true];
    }
    catch (error) {
        return [error];
    }
};
AdmisionService.altaLogicaAdmision = async (id_Admision) => {
    try {
        const admisionEncontrada = await Admision_1.Admision.findOne({ where: {
                id_Admision: id_Admision
            } });
        if (!admisionEncontrada)
            return ["No se encontro la admision"];
        const admisionBaja = await Admision_1.Admision.update({ estado: "Activo" }, { where: { id_Admision: id_Admision } });
        if (!admisionBaja)
            return ["No se pudo dar de alta la admision"];
        const seDioBajaLogica = await CamaService_1.CamaService.marcarCamaComoOcupada(admisionEncontrada.dataValues.id_Cama);
        if (!seDioBajaLogica[1])
            return ["No se pudo marcar ocupada la cama", seDioBajaLogica[1]];
        return [undefined, true];
    }
    catch (error) {
        return [error];
    }
};
//# sourceMappingURL=AdmisionService.js.map