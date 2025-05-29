"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmisionController = void 0;
const createPacienteDto_1 = require("../../domain/Dtos/pacientes/createPacienteDto");
const PacientesService_1 = require("../services/PacientesService");
const HelperForCreateErrors_1 = require("../../Helpers/HelperForCreateErrors");
const updatePacienteDto_1 = require("../../domain/Dtos/pacientes/updatePacienteDto");
const createSeguroMedicoDto_1 = require("../../domain/Dtos/SeguroMedico/createSeguroMedicoDto");
const SeguroMedicoService_1 = require("../services/SeguroMedicoService");
const updateSeguroMedicoDto_1 = require("../../domain/Dtos/SeguroMedico/updateSeguroMedicoDto");
const AlaService_1 = require("../services/Hospital/AlaService");
const HabitacionService_1 = require("../services/Hospital/HabitacionService");
const getPacienteDto_1 = require("../../domain/Dtos/pacientes/getPacienteDto");
const getSeguroMedico_1 = require("../../domain/Dtos/SeguroMedico/getSeguroMedico");
const AdmisionService_1 = require("../services/AdmisionService");
const GetAdmisionPorPacienteDTO_1 = require("../../domain/Dtos/admision/GetAdmisionPorPacienteDTO");
const CrearAdmisionDTO_1 = require("../../domain/Dtos/admision/CrearAdmisionDTO");
const PacienteAnonimo_1 = require("../../Helpers/PacienteAnonimo");
const createPacienteNNDto_1 = require("../../domain/Dtos/pacientes/createPacienteNNDto");
const MotivosDeInternacionService_1 = require("../services/MotivosDeInternacionService");
const CamaService_1 = require("../services/Hospital/CamaService");
const PrioridadDeAtencionService_1 = require("../services/PrioridadDeAtencionService");
const ActualizarAdmisionDTO_1 = require("../../domain/Dtos/admision/ActualizarAdmisionDTO");
class AdmisionController {
    constructor(conexionbd) {
        ////////////////////////////////////////////////////
        ////////////////////!VISTAS////////////////////////
        ////////////////////////////////////////////////////
        this.vistaPrincipal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const error = req.query.error || undefined;
            try {
                if (error) {
                    res.render("AdmisionViews/principal.pug", {
                        error: `${error}`
                    });
                    return;
                }
                res.render("AdmisionViews/principal.pug");
            }
            catch (error) {
                res.render("AdmisionViews/principal.pug", {
                    error: `${error}`,
                });
                return;
            }
        });
        this.vistaEmergencia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const error = req.query.error;
            try {
                const alas = yield AlaService_1.AlaService.getAlaFromDb();
                const motivosDeInternacion = yield MotivosDeInternacionService_1.MotivosDeInternacionService.buscarMotivosDeInternacion();
                if (error) {
                    res.render("AdmisionViews/emergencia.pug", {
                        error: `${error}`,
                        alas: alas,
                        motivoDeInternacion: motivosDeInternacion[1]
                    });
                    return;
                }
                res.render("AdmisionViews/emergencia.pug", {
                    //error: "errorPersonalizado",
                    //success: "funciono bien",
                    //info: "habia un caracol rojo",
                    //warning: "fijate bien loco",
                    alas: alas,
                    motivoDeInternacion: motivosDeInternacion[1]
                });
            }
            catch (error) {
                res.render("AdmisionViews/principal.pug", {
                    error: `${error}`,
                });
            }
        });
        this.vistaBuscarPorDni = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("AdmisionViews/buscarPaciente.pug");
                return;
            }
            catch (error) {
                res.render("AdmisionViews/principal.pug", {
                    error: `${error}`,
                });
                return;
            }
        });
        this.vistaBuscarPacienteDesconocido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const warning = req.query.warning || undefined;
            try {
                if (warning) {
                    res.render("AdmisionViews/buscarPacienteDesconocido.pug", {
                        warning: warning
                    });
                    return;
                }
                res.render("AdmisionViews/buscarPacienteDesconocido.pug");
                return;
            }
            catch (error) {
                res.render("AdmisionViews/buscarPacienteDesconocido.pug", {
                    error: error
                });
                return;
            }
        });
        this.vistaCrearPaciente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.render("AdmisionViews/CrearPaciente.pug", {
                    warning: "El paciente no se encontró registrado. Va a proceder a crear una cuenta"
                });
                return;
            }
            catch (error) {
                res.render("AdmisionViews/principal.pug", {
                    error: `${error}`,
                });
                return;
            }
        });
        this.vistaPrincipalPaciente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const error = req.query.error;
            const confirmacion = req.query.confirmacion;
            try {
                const paciente = req.session.paciente;
                if (!paciente) {
                    res.render("AdmisionViews/buscarPaciente.pug", {
                        warning: "Se cerró la sesión del paciente"
                    });
                    return;
                }
                if (error) {
                    res.render("AdmisionViews/vistaPaciente.pug", {
                        paciente: paciente,
                        error: `${error}`
                    });
                    return;
                }
                if (confirmacion) {
                    res.render("AdmisionViews/vistaPaciente.pug", {
                        paciente: paciente,
                        success: `${confirmacion}`
                    });
                    return;
                }
                res.render("AdmisionViews/vistaPaciente.pug", { paciente: paciente });
            }
            catch (error) {
                res.render("AdmisionViews/principal.pug", {
                    error: `${error}`,
                });
                return;
            }
        });
        this.redireccionarAVistaDeSeguros = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!req.session.paciente) {
                    res.render("AdmisionViews/principal.pug", {
                        warning: "Se ha cerrado la session"
                    });
                    return;
                }
                const validado = yield PacientesService_1.PacienteServices.saberSiElPacienteTieneSeguroMedico((_a = req.session.paciente) === null || _a === void 0 ? void 0 : _a.dni);
                if (!validado[1]) {
                    res.redirect("/admision/crear/seguro/medico");
                    return;
                }
                res.redirect("/admision/actualizar/seguro/medico");
                return;
            }
            catch (error) {
                res.render("AdmisionViews/vistaPaciente.pug", {
                    paciente: req.session.paciente,
                    error: `${error}`
                });
                return;
            }
        });
        this.vistaActualizarPaciente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.session.paciente) {
                    res.render("AdmisionViews/principal.pug", {
                        warning: "Se cerró la sesión del paciente"
                    });
                    return;
                }
                console.log("VISTA ACTUALIZAR PACIENTE");
                console.log(req.session.paciente);
                res.render("AdmisionViews/ActualizarPaciente.pug", { paciente: req.session.paciente });
                return;
            }
            catch (error) {
                res.render("AdmisionViews/principal.pug", {
                    error: `${error}`
                });
                return;
            }
        });
        this.vistaCrearSeguroMedico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const mutuales = yield SeguroMedicoService_1.SeguroMedicoService.getMutualesFromDb();
                const categorias = yield SeguroMedicoService_1.SeguroMedicoService.getCategoriasFromDb();
                if (!req.session.paciente) {
                    res.render("AdmisionViews/principal.pug", {
                        warning: "Se cerró la sesión del paciente"
                    });
                    return;
                }
                res.render("AdmisionViews/CrearSeguroMedico.pug", {
                    paciente: req.session.paciente,
                    mutuales: mutuales[1],
                    categorias: categorias[1]
                });
                return;
            }
            catch (error) {
                res.render("AdmisionViews/principal.pug", {
                    error: `${error}`
                });
                return;
            }
        });
        this.vistaActualizarSeguroMedico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const error = req.query.error;
            const confirmacion = req.query.confirmacion;
            try {
                if (!req.session.paciente) {
                    res.render("AdmisionViews/principal.pug", {
                        warning: "Se cerro la sesion"
                    });
                    return;
                }
                const mutuales = yield SeguroMedicoService_1.SeguroMedicoService.getMutualesFromDb();
                const categorias = yield SeguroMedicoService_1.SeguroMedicoService.getCategoriasFromDb();
                const seguroMedico = yield SeguroMedicoService_1.SeguroMedicoService.buscarSeguroMedico((_a = req.session.paciente) === null || _a === void 0 ? void 0 : _a.id_seguro_medico);
                console.log(seguroMedico[1].dataValues.categoria_seguro.dataValues);
                if (error) {
                    res.render("AdmisionViews/actualizarSeguroMedico", {
                        paciente: req.session.paciente,
                        mutuales: mutuales[1],
                        categorias: categorias[1],
                        seguroMedico: seguroMedico[1].dataValues,
                        error: `${error}`
                    });
                    return;
                }
                if (confirmacion) {
                    res.render("AdmisionViews/actualizarSeguroMedico", {
                        paciente: req.session.paciente,
                        mutuales: mutuales[1],
                        categorias: categorias[1],
                        seguroMedico: seguroMedico[1].dataValues,
                        success: `${confirmacion}`
                    });
                    return;
                }
                res.render("AdmisionViews/actualizarSeguroMedico", {
                    paciente: req.session.paciente,
                    mutuales: mutuales[1],
                    categorias: categorias[1],
                    seguroMedico: seguroMedico[1].dataValues
                });
                return;
            }
            catch (error) {
                res.render("AdmisionViews/principal.pug", {
                    error: `${error}`
                });
                return;
            }
        });
        this.redireccionadorDeVistasDeAdmision = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                if (!req.session.paciente) {
                    res.redirect(`/admision/?error=${encodeURI("Se cerro la sesion del paciente")}`);
                }
                const admisionEncontrada = yield AdmisionService_1.AdmisionService.buscarAdmisionVigentePorPaciente((_a = req.session.paciente) === null || _a === void 0 ? void 0 : _a.id_Paciente);
                if (!admisionEncontrada[1]) {
                    res.redirect(`/admision/crear/admision`);
                }
                req.session.admision = (_b = admisionEncontrada[1]) === null || _b === void 0 ? void 0 : _b.dataValues;
                const alaOcupada = yield CamaService_1.CamaService.buscarCama(req.session.admision.id_Cama);
                req.session.restosAdmision = (_c = alaOcupada[1]) === null || _c === void 0 ? void 0 : _c.dataValues.habitacion.dataValues.ala.dataValues.nombre;
                res.redirect("/admision/actualizar/admision");
            }
            catch (error) {
                res.redirect(`/admision/?error=${encodeURI(error)}`);
                return;
            }
        });
        this.vistaCrearAdmision = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const error = req.query.error;
            const confirmacion = req.query.confirmacion;
            try {
                const motivosDeInternacion = yield MotivosDeInternacionService_1.MotivosDeInternacionService.buscarMotivosDeInternacion();
                const prioridadesDeAtencion = yield PrioridadDeAtencionService_1.PrioridadDeAtencionService.buscarLasPrioridadesDeAtencionEnDB();
                const tiposDeAdmision = yield AdmisionService_1.AdmisionService.getTiposDeAdmision();
                const alas = yield AlaService_1.AlaService.getAlaFromDb();
                if (!req.session.paciente) {
                    res.redirect(`/admision/?error=${encodeURIComponent("Se cerró la sesion del paciente")}`);
                    return;
                }
                if (error) {
                    res.render("AdmisionViews/vistaCrearAdmision.pug", {
                        motivosDeInternacion: motivosDeInternacion[1],
                        prioridadesDeAtencion: prioridadesDeAtencion[1],
                        tiposDeAdmision: tiposDeAdmision[1],
                        alas: alas,
                        paciente: req.session.paciente,
                        error: `${error}`
                    });
                    return;
                }
                if (confirmacion) {
                    res.render("AdmisionViews/vistaCrearAdmision.pug", {
                        motivosDeInternacion: motivosDeInternacion[1],
                        prioridadesDeAtencion: prioridadesDeAtencion[1],
                        tiposDeAdmision: tiposDeAdmision[1],
                        alas: alas,
                        paciente: req.session.paciente,
                        success: `${confirmacion}`
                    });
                    return;
                }
                res.render("AdmisionViews/vistaCrearAdmision.pug", {
                    motivosDeInternacion: motivosDeInternacion[1],
                    prioridadesDeAtencion: prioridadesDeAtencion[1],
                    tiposDeAdmision: tiposDeAdmision[1],
                    alas: alas,
                    paciente: req.session.paciente
                });
                return;
            }
            catch (error) {
                res.redirect(`/admision/?error=${encodeURIComponent("Se cerró la sesion del paciente")}`);
                return;
            }
        });
        this.vistaActualizarAdmision = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const error = req.query.error || undefined;
            const confirmacion = req.query.confirmacion || undefined;
            try {
                if (!req.session.paciente) {
                    res.redirect(`/admision/?error=${encodeURI("Se ha cerrado la sesion del paciente")}`);
                }
                if (!req.session.admision) {
                    res.redirect(`/admision/principal/paciente?error=${encodeURI("Error en el redireccionamiento de admision")}`);
                }
                const motivosDeInternacion = yield MotivosDeInternacionService_1.MotivosDeInternacionService.buscarMotivosDeInternacion();
                const prioridadesDeAtencion = yield PrioridadDeAtencionService_1.PrioridadDeAtencionService.buscarLasPrioridadesDeAtencionEnDB();
                const tiposDeAdmision = yield AdmisionService_1.AdmisionService.getTiposDeAdmision();
                const alas = yield AlaService_1.AlaService.getAlaFromDb();
                console.log("PROBANDOO: " + req.session.restosAdmision);
                if (error) {
                    res.render("AdmisionViews/vistaActualizarAdmision.pug", {
                        error: error,
                        motivosDeInternacion: motivosDeInternacion[1],
                        prioridadesDeAtencion: prioridadesDeAtencion[1],
                        tiposDeAdmision: tiposDeAdmision[1],
                        alas: alas,
                        paciente: req.session.paciente,
                        admision: req.session.admision,
                        restosAdmision: req.session.restosAdmision
                    });
                    return;
                }
                if (confirmacion) {
                    res.render("AdmisionViews/vistaActualizarAdmision.pug", {
                        motivosDeInternacion: motivosDeInternacion[1],
                        prioridadesDeAtencion: prioridadesDeAtencion[1],
                        tiposDeAdmision: tiposDeAdmision[1],
                        alas: alas,
                        paciente: req.session.paciente,
                        success: confirmacion,
                        admision: req.session.admision,
                        restosAdmision: req.session.restosAdmision
                    });
                    return;
                }
                res.render("AdmisionViews/vistaActualizarAdmision.pug", {
                    motivosDeInternacion: motivosDeInternacion[1],
                    prioridadesDeAtencion: prioridadesDeAtencion[1],
                    tiposDeAdmision: tiposDeAdmision[1],
                    alas: alas,
                    paciente: req.session.paciente,
                    admision: req.session.admision,
                    restosAdmision: req.session.restosAdmision
                });
            }
            catch (error) {
                res.redirect(`/admision/?error=${encodeURI(error)}`);
            }
        });
        ////////////////////////////////////////////////////
        ////////////////////!PACIENTES//////////////////////
        ////////////////////////////////////////////////////
        this.registrarPaciente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, createPacienteDto] = createPacienteDto_1.CreatePacienteDto.create(req.body);
                if (error) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente", "AdmisionController", "Line 24", error);
                    throw new Error();
                }
                const [errorCrearPaciente, pacienteCreado] = yield PacientesService_1.PacienteServices.crearPaciente(createPacienteDto);
                if (errorCrearPaciente) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente", "AdmisionController", "Line 31", errorCrearPaciente);
                    throw new Error(errorCrearPaciente);
                }
                if (!pacienteCreado) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarPaciente", "AdmisionController", "34", "La bd no pudo crear el paciente");
                    res.render("AdmisionViews/principal.pug", {
                        error: "El paciente no se ha creado"
                    });
                    return;
                }
                const fechaNueva = new Date(pacienteCreado === null || pacienteCreado === void 0 ? void 0 : pacienteCreado.dataValues.fecha_nac);
                pacienteCreado.dataValues.fecha_nac = fechaNueva.toISOString().split("T")[0];
                req.session.paciente = pacienteCreado === null || pacienteCreado === void 0 ? void 0 : pacienteCreado.dataValues;
                console.log("METODO REGISTRAR PACIENTE");
                console.log(req.session.paciente);
                res.redirect("/admision/principal/paciente");
                return;
            }
            catch (error) {
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente", "AdmisionController", "Line 30", error);
                res.render("AdmisionViews/CrearPaciente.pug", {
                    error: `${error}`,
                    warning: "El paciente no se encontró registrado. Va a proceder a crear una cuenta"
                });
                return;
            }
        });
        this.buscarPacientePorDni = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dniRecibido = req.query.dni;
                if (!dniRecibido) {
                    res.status(500).render("AdmisionViews/buscarPaciente.pug", {
                        error: "Se requiere el dni"
                    });
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni", "AdmisionController", "217", "Se requiere el dni");
                    return;
                }
                const dni = dniRecibido ? parseInt(dniRecibido) : NaN;
                const [errorDto, getPacienteDto] = getPacienteDto_1.GetPacienteDto.create(dni);
                if (errorDto) {
                    res.status(500).render("AdmisionViews/buscarPaciente.pug", {
                        error: `${errorDto}`
                    });
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni", "AdmisionController", "208", errorDto);
                    return;
                }
                const [errorBusqueda, pacienteEncontrado] = yield PacientesService_1.PacienteServices.buscarPacienteExistente(getPacienteDto.dni, 1);
                if (!errorBusqueda) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni", "AdmisionController", "208", "ERROR: No se encontro el paciente");
                    res.redirect("/admision/crear/paciente");
                    return;
                }
                req.session.paciente = pacienteEncontrado === null || pacienteEncontrado === void 0 ? void 0 : pacienteEncontrado.dataValues;
                res.redirect("/admision/principal/paciente");
                return;
            }
            catch (error) {
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarPacientePorDni", "AdmisionController", "208", error);
                res.status(500).json(error);
                res.status(500).render("AdmisionViews/buscarPaciente.pug", {
                    error: `${error}`
                });
                return;
            }
        });
        this.buscarPacienteDesconocido = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.query.id_Paciente);
                const idEnviado = req.query.id_Paciente;
                if (!idEnviado) {
                    res.redirect(`/admision/find/desconocido?error=${encodeURIComponent("Se requiere el id_Paciente")}`);
                    return;
                }
                const id_Paciente = (idEnviado) ? parseInt(idEnviado) : NaN;
                const [errorMetodo, pacienteEncontrado] = yield PacientesService_1.PacienteServices.buscarPacienteDesconocido(id_Paciente);
                if (!errorMetodo) {
                    res.redirect(`/admision/find/desconocido?warning=${encodeURIComponent("No se encontro al paciente desconocido")}`);
                    return;
                }
                req.session.paciente = pacienteEncontrado === null || pacienteEncontrado === void 0 ? void 0 : pacienteEncontrado.dataValues;
                res.redirect("/admision/principal/paciente");
                return;
            }
            catch (error) {
                res.redirect(`/admision/find/desconocido?error=${encodeURIComponent(error)}`);
                return;
            }
        });
        this.buscarTodaLaInformacionDelPaciente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dniRecibido = req.params.dni;
                const [errorDto, getPacienteDto] = getPacienteDto_1.GetPacienteDto.create(parseInt(dniRecibido));
                if (errorDto) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaLaInformacionDelPaciente", "AdmisionController", "141", errorDto);
                    res.status(403).json(errorDto);
                    return;
                }
                const [errorBusqueda, pacienteEncontrado] = yield PacientesService_1.PacienteServices.buscarPacienteExistente(getPacienteDto.dni, 1);
                if (!errorBusqueda) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaLaInformacionDelPaciente", "AdmisionController", "149", "ERROR:No se encontro el paciente");
                    res.status(404).json("ERROR: No se encontro el paciente");
                    return;
                }
                if (!(pacienteEncontrado === null || pacienteEncontrado === void 0 ? void 0 : pacienteEncontrado.id_seguro_medico)) {
                    res.status(404).json("ERROR: El paciente no tiene asignado un seguro medico");
                    return;
                }
                const [errorSeguroMedico, seguroMedicoEncontrado] = yield SeguroMedicoService_1.SeguroMedicoService.buscarSeguroMedico(pacienteEncontrado === null || pacienteEncontrado === void 0 ? void 0 : pacienteEncontrado.id_seguro_medico);
                if (errorSeguroMedico) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarTodaLaInformacionDelPaciente", "AdmisionController", "160", "Hubo un error al buscar el seguro medico");
                    res.status(404).json("Hubo un error al buscar el seguro medico");
                    return;
                }
                const resultado = {
                    pacienteEncontrado: pacienteEncontrado,
                    seguroMedico: seguroMedicoEncontrado
                };
                res.json(resultado);
                return;
            }
            catch (error) {
                res.status(500).json(error);
                return;
            }
        });
        this.actualizarPaciente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (!req.session.paciente) {
                    res.render("AdmisionViews/principal.pug", {
                        warning: "Se cerró la sesión del paciente"
                    });
                    return;
                }
                req.body.id_Paciente = req.session.paciente.id_Paciente;
                if (!req.body.nombre && req.session.paciente.nombre) {
                    res.render("AdmisionViews/ActualizarPaciente.pug", { error: "No se puede dejar el nombre vacio", paciente: req.session.paciente });
                    return;
                }
                if (!req.body.apellido && req.session.paciente.apellido) {
                    res.render("AdmisionViews/ActualizarPaciente.pug", { error: "No se puede dejar el apellido vacio", paciente: req.session.paciente });
                    return;
                }
                if (!req.body.direccion && req.session.paciente.direccion) {
                    res.render("AdmisionViews/ActualizarPaciente.pug", { error: "No se puede dejar la direccion vacia", paciente: req.session.paciente });
                    return;
                }
                if (!req.body.telefono && req.session.paciente.telefono) {
                    res.render("AdmisionViews/ActualizarPaciente.pug", { error: "No se puede dejar el telefono vacio", paciente: req.session.paciente });
                    return;
                }
                const [error, updatePacienteDto] = updatePacienteDto_1.UpdatePacienteDto.create(req.body, req.session.paciente);
                if (error) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarPaciente", "AdmisionController", "Line 53", error);
                    throw new Error(error);
                }
                let modo = 1;
                if ((String(updatePacienteDto === null || updatePacienteDto === void 0 ? void 0 : updatePacienteDto.dni) != String((_a = req.session.paciente) === null || _a === void 0 ? void 0 : _a.dni)) && req.session.paciente.dni != null) {
                    res.render("AdmisionViews/ActualizarPaciente.pug", {
                        error: "No se puede cambiar el dni del paciente, notifique al administrador",
                        paciente: req.session.paciente
                    });
                    return;
                }
                if (req.session.paciente.dni == null)
                    modo = 2;
                const [errorInService, confirmacion] = yield PacientesService_1.PacienteServices.actualizarPaciente(updatePacienteDto, modo);
                if (errorInService) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("ActualizarPaciente", "AdmisionController", "57", errorInService);
                    res.render("AdmisionViews/ActualizarPaciente.pug", {
                        error: `${errorInService}`,
                        paciente: req.session.paciente
                    });
                    return;
                }
                if (confirmacion) {
                    const pacienteEncontrado = yield PacientesService_1.PacienteServices.buscarPacienteExistente(updatePacienteDto.dni, 1);
                    if (pacienteEncontrado[0])
                        req.session.paciente = (_b = pacienteEncontrado[1]) === null || _b === void 0 ? void 0 : _b.dataValues;
                    res.render("AdmisionViews/ActualizarPaciente.pug", {
                        success: "Paciente actualizado",
                        paciente: req.session.paciente
                    });
                    return;
                }
            }
            catch (error) {
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarPaciente", "AdmisionController", "Line 40", error);
                res.render("AdmisionViews/ActualizarPaciente.pug", {
                    error: `${error}`,
                    paciente: req.session.paciente
                });
                return;
            }
        });
        ///////////////////////////////////////////////////
        ////////////////////!SEGURO MEDICO/////////////////
        ///////////////////////////////////////////////////
        this.getSeguroMedico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [errorDto, numeroDeSeguroMedico] = getSeguroMedico_1.getSeguroMedicoDTO.create(req.params.numero);
                if (errorDto) {
                    res.status(400).json(errorDto);
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getSeguroMedico", "AdmisionController", "205", errorDto);
                    return;
                }
                const [errorBusqueda, seguroMedicoBuscado] = yield SeguroMedicoService_1.SeguroMedicoService.buscarSeguroMedicoExistente(getSeguroMedico_1.getSeguroMedicoDTO.toObject(numeroDeSeguroMedico).numero, 1);
                if (!errorBusqueda) {
                    res.status(404).json("No se encontro el seguro medico");
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getSeguroMedico", "AdmisionController", "210", "No se encontro el seguro medico");
                    return;
                }
                res.status(200).json(seguroMedicoBuscado);
                return;
            }
            catch (error) {
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getSeguroMedico", "AdmisionController", "213", error);
                res.status(500).json(error);
                return;
            }
        });
        this.registrarYAsignarSeguroMedico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!req.session.paciente) {
                    res.render("AdmisionViews/principal.pug", {
                        warning: "Se cerró la sesión del paciente"
                    });
                    return;
                }
                if (!req.body) {
                    res.redirect("/admision/crear/seguro/medico");
                    return;
                }
                const objetoParaCrearSeguroMedico = {
                    id_mutual: req.body.id_mutual,
                    numero: req.body.numero,
                    id_categoria_seguro: req.body.id_categoria_seguro,
                    dni_Paciente: (_a = req.session.paciente) === null || _a === void 0 ? void 0 : _a.dni
                };
                const [error, createSeguroMedicoDto] = createSeguroMedicoDto_1.CreateSeguroMedicoDto.create(objetoParaCrearSeguroMedico);
                if (error) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico", "AdmisionController", "Line 85", error);
                    res.render("AdmisionViews/CrearSeguroMedico.pug", {
                        error: `${error}`
                    });
                    return;
                }
                const [errorCrearSeguroMedico, confirmacion] = yield SeguroMedicoService_1.SeguroMedicoService.createSeguroMedico(createSeguroMedicoDto);
                if (errorCrearSeguroMedico && !confirmacion) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico", "AdmisionController", "Line 87", errorCrearSeguroMedico);
                    const mutuales = yield SeguroMedicoService_1.SeguroMedicoService.getMutualesFromDb();
                    const categorias = yield SeguroMedicoService_1.SeguroMedicoService.getCategoriasFromDb();
                    res.render("AdmisionViews/CrearSeguroMedico.pug", {
                        paciente: req.session.paciente,
                        error: `${errorCrearSeguroMedico}`,
                        mutuales: mutuales[1],
                        categorias: categorias[1]
                    });
                    return;
                }
                if (confirmacion) {
                    const [errorAsignarSeguroMedico, confirmacionAsignar] = yield PacientesService_1.PacienteServices.asignarSeguroMedico(createSeguroMedicoDto.numero, createSeguroMedicoDto.dni_Paciente);
                    if (errorAsignarSeguroMedico && !confirmacionAsignar) {
                        HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico", "AdmisionController", "Line 98", errorAsignarSeguroMedico);
                        res.render("AdmisionViews/CrearSeguroMedico.pug", {
                            error: `${errorAsignarSeguroMedico}`
                        });
                        return;
                    }
                }
                req.session.paciente.id_seguro_medico = confirmacion === null || confirmacion === void 0 ? void 0 : confirmacion.dataValues.id_seguro_medico;
                res.redirect(`/admision/principal/paciente?confirmacion=${encodeURIComponent("Se creo y asigno el seguro al paciente")}`);
                console.log("Se creo el seguro y se le asigno al paciente");
                return;
            }
            catch (error) {
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("registrarYAsignarSeguroMedico", "AdmisionController", "Line 105", error);
                res.render("AdmisionViews/CrearSeguroMedico.pug", {
                    error: `${error}`
                });
                return;
            }
        });
        this.actualizarSeguroMedico = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [error, updateSeguroMedicoDto] = updateSeguroMedicoDto_1.UpdateSeguroMedicoDto.create(req.body);
                if (error) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico", "AdmisionController", "Line 117", error);
                    return res.redirect(`/admision/actualizar/seguro/medico?error=${encodeURIComponent(error)}`);
                }
                const [errorInService, confirmacion] = yield SeguroMedicoService_1.SeguroMedicoService.updateSeguroMedico(updateSeguroMedicoDto, req.session.paciente.id_seguro_medico, req.session.paciente.id_Paciente);
                if (errorInService && !confirmacion) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico", "AdmisionController", "Line 123", errorInService);
                    return res.redirect(`/admision/actualizar/seguro/medico?error=${encodeURIComponent(errorInService)}`);
                }
                console.log("Seguro médico actualizado: ");
                res.redirect(`/admision/actualizar/seguro/medico?confirmacion=${encodeURIComponent("Seguro medico actualizado")}`);
                return;
            }
            catch (error) {
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizarSeguroMedico", "AdmisionController", "Line 130", error);
                res.redirect(`/admision/actualizar/seguro/medico?error=${encodeURIComponent(error)}`);
                return;
            }
        });
        ////////////////////////////////////////////////
        //////////////!ADMISIONES///////////////////////
        ////////////////////////////////////////////////
        this.crearAdmision = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.session.paciente) {
                    res.redirect(`/admision/?error=${encodeURIComponent("Se ha cerrado la sesion")}`);
                    return;
                }
                const [error, crearAdmisionDto] = CrearAdmisionDTO_1.CrearAdmisionDto.create({
                    id_motivo_de_Internacion: req.body.id_motivo_de_Internacion,
                    id_prioridad_de_atencion: req.body.id_prioridad_de_atencion,
                    id_tipo_de_admision: req.body.id_tipo_de_admision,
                    id_Paciente: req.session.paciente.id_Paciente,
                    id_Cama: req.body.id_Cama
                });
                if (error) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearAdmision", "AdmisionController", "Line 140", error);
                    res.redirect(`/admision/crear/admision?error=${encodeURIComponent(error)}`);
                    return;
                }
                const [errorCrearAdmision, admisionCreada] = yield AdmisionService_1.AdmisionService.crearAdmision(crearAdmisionDto);
                if (errorCrearAdmision) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearAdmision", "AdmisionController", "Line 145", errorCrearAdmision);
                    res.redirect(`/admision/crear/admision?error=${encodeURIComponent(errorCrearAdmision)}`);
                    return;
                }
                res.redirect(`/admision/principal/paciente?confirmacion=${encodeURIComponent("Se ha creado la admision")}`);
                return;
            }
            catch (error) {
                res.status(500).json(error);
                return;
            }
        });
        // public actualizarAdmision = async(req:Request,res:Response) => {//!Pensar que si es necesario
        //     try {
        //     } catch (error) {
        //     }
        // }
        this.getTodasLasAdmisiones = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [errorDeBusqueda, admisiones] = yield AdmisionService_1.AdmisionService.buscarTodasLasAdmisiones(1);
                if (errorDeBusqueda) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTodasLasAdmisiones", "AdmisionController", "690", errorDeBusqueda);
                    res.status(404).json(`${errorDeBusqueda}`);
                    return;
                }
                res.status(200).json(admisiones);
                return;
            }
            catch (error) {
                res.status(500).json(error);
                return;
            }
        });
        this.getTodasLasAdmisionesActivas = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [errorDeBusqueda, admisionesActivas] = yield AdmisionService_1.AdmisionService.buscarTodasLasAdmisiones(0);
                if (errorDeBusqueda) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getTodasLasAdmisiones", "AdmisionController", "299", errorDeBusqueda);
                    res.status(404).json(`${errorDeBusqueda}`);
                    return;
                }
                res.status(200).json(admisionesActivas);
                return;
            }
            catch (error) {
                res.status(500).json(error);
                return;
            }
        });
        this.buscarAdmisionPorPaciente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const [errorDto, getAdmisionPacienteDto] = GetAdmisionPorPacienteDTO_1.GetAdmisionPorPacienteDTO.create(parseInt(req.params.dni));
                if (errorDto) {
                    res.status(404).json(`${errorDto}`);
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarAdmisionPorPaciente", "AdmisionController", "301", errorDto);
                    return;
                }
                const [errorBusquedaDePaciente, pacienteEncontrado] = yield PacientesService_1.PacienteServices.buscarPacienteExistente(getAdmisionPacienteDto === null || getAdmisionPacienteDto === void 0 ? void 0 : getAdmisionPacienteDto.dni, 1);
                if (!errorBusquedaDePaciente) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("BuscarAdmisionPorPaciente", "AdmisionController", "305", "No se encontro el paciente");
                    res.status(404).json(`No se encontro el paciente`);
                    return;
                }
                console.log(pacienteEncontrado);
                const [errorBusquedaDeAdmisionIndividual, admisionEncontrada] = yield AdmisionService_1.AdmisionService.buscarAdmisionVigentePorPaciente(pacienteEncontrado === null || pacienteEncontrado === void 0 ? void 0 : pacienteEncontrado.dataValues.id_Paciente);
                if (errorBusquedaDeAdmisionIndividual) {
                    res.status(404).json(`${errorBusquedaDeAdmisionIndividual}`);
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("BuscarAdmisionPorPaciente", "AdmisionController", "311", errorBusquedaDeAdmisionIndividual);
                    return;
                }
                res.status(200).json(admisionEncontrada);
                return;
            }
            catch (error) {
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarAdmisionPorPaciente", "AdmisionController", "310", error);
                res.status(500).json(`${error}`);
                return;
            }
        });
        this.updateAdmision = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (!req.session.paciente) {
                    res.redirect(`/admision/?error=${encodeURI("Se ha cerrado la sesion")}`);
                    return;
                }
                if (!req.session.admision) {
                    res.redirect(`/admision/principal/paciente?error=${encodeURI("No hay una admision activa")}`);
                    return;
                }
                const [errorDto, dtoAdmision] = ActualizarAdmisionDTO_1.ActualizarAdmisionDto.create({
                    estado: req.body.estado,
                    id_motivo_de_Internacion: req.body.id_motivo_de_Internacion,
                    id_prioridad_de_atencion: req.body.id_prioridad_de_atencion,
                    id_tipo_de_admision: req.body.id_tipo_de_admision,
                    id_Paciente: (_a = req.session.paciente) === null || _a === void 0 ? void 0 : _a.id_Paciente,
                    id_Cama: req.body.id_Cama
                });
                if (errorDto) {
                    res.redirect(`/admision/principal/paciente?error=${encodeURI(errorDto)}`);
                    return;
                }
                const [errorAdmision, admision] = yield AdmisionService_1.AdmisionService.actualizarAdmision(dtoAdmision);
                if (errorAdmision) {
                    res.redirect(`/admision/principal/paciente?error=${encodeURIComponent("No hay admisiones activas")}`);
                    return;
                }
                if ((req.body.id_Cama != null && req.body.id_Cama != req.session.admision.id_Cama) || req.body.estado == "Baja") {
                    CamaService_1.CamaService.marcarCamaComoLibre(req.session.admision.id_Cama);
                    if (req.body.estado == "Baja") {
                        res.redirect(`/admision/principal/paciente?confirmacion=${encodeURIComponent("Se ha dado de baja la admision")}`);
                        req.session.admision = undefined;
                        req.session.restosAdmision = undefined;
                        return;
                    }
                }
                const [error, admisionActualizada] = yield AdmisionService_1.AdmisionService.buscarAdmisionVigentePorPaciente(req.session.paciente.id_Paciente);
                if (error) {
                    res.redirect(`/admision/actualizar/admision?error=${encodeURIComponent(error)}`);
                    return;
                }
                req.session.admision = admisionActualizada;
                const alaOcupada = yield CamaService_1.CamaService.buscarCama(req.session.admision.id_Cama);
                req.session.restosAdmision = (_b = alaOcupada[1]) === null || _b === void 0 ? void 0 : _b.dataValues.habitacion.dataValues.ala.dataValues.nombre;
                res.redirect(`/admision/principal/paciente?confirmacion=${encodeURIComponent("Se ha actualizado el registro")}`);
                return;
            }
            catch (error) {
                res.redirect(`/admision/?error=${encodeURI(error)}`);
                return;
            }
        });
        this.admitirPacienteDeEmergencia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { ala, unidad, genero, id_motivo_de_Internacion, id_Cama } = req.body;
                //const habitaciones = await HabitacionService.getHabitacionesDisponibles(genero, ala);
                let pacienteAnonimo;
                // if (habitaciones[0]) {
                //     HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia","AdmisionController","56","No hay habitaciones disponibles")
                //     const alas = await AlaService.getAlaFromDb();
                //     const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
                //     res.render("AdmisionViews/emergencia.pug", {
                //         error: `${habitaciones[0]}`,
                //         alas: alas,
                //         motivoDeInternacion: motivosDeInternacion[1]
                //     });
                //     return;
                // }
                if (genero == "Masculino") {
                    pacienteAnonimo = PacienteAnonimo_1.PacienteAnonimo.getPacienteMasculina();
                }
                else {
                    pacienteAnonimo = PacienteAnonimo_1.PacienteAnonimo.getPacienteFemenina();
                }
                const [error, pacienteListoDto] = yield createPacienteNNDto_1.CreatePacienteNNDto.create(pacienteAnonimo);
                if (error) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia", "AdmisionController", "439", error);
                    const alas = yield AlaService_1.AlaService.getAlaFromDb();
                    const motivosDeInternacion = yield MotivosDeInternacionService_1.MotivosDeInternacionService.buscarMotivosDeInternacion();
                    res.status(500).render("AdmisionViews/emergencia.pug", {
                        error: `${error}`,
                        alas: alas,
                        motivoDeInternacion: motivosDeInternacion[1]
                    });
                    return;
                }
                const [errorAlCrear, pacienteCreado] = yield PacientesService_1.PacienteServices.crearPacienteNN(pacienteListoDto);
                if (errorAlCrear) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("AdmitirPacienteDeEmergencia", "AdmisionController", "72", errorAlCrear);
                    const alas = yield AlaService_1.AlaService.getAlaFromDb();
                    const motivosDeInternacion = yield MotivosDeInternacionService_1.MotivosDeInternacionService.buscarMotivosDeInternacion();
                    res.status(500).render("AdmisionViews/emergencia.pug", {
                        error: `${errorAlCrear}`,
                        alas: alas,
                        motivoDeInternacion: motivosDeInternacion[1]
                    });
                    return;
                }
                const [errorDto, crearAdmisionDTO] = CrearAdmisionDTO_1.CrearAdmisionDto.create({
                    id_motivo_de_Internacion: id_motivo_de_Internacion,
                    id_tipo_de_admision: 3,
                    id_prioridad_de_atencion: 1,
                    id_Paciente: pacienteCreado === null || pacienteCreado === void 0 ? void 0 : pacienteCreado.dataValues.id_Paciente,
                    id_Cama: id_Cama
                });
                if (errorDto) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia", "AdmisionController", "468", errorDto);
                    const alas = yield AlaService_1.AlaService.getAlaFromDb();
                    const motivosDeInternacion = yield MotivosDeInternacionService_1.MotivosDeInternacionService.buscarMotivosDeInternacion();
                    res.render("AdmisionViews/emergencia.pug", {
                        error: `${errorDto}`,
                        alas: alas,
                        motivoDeInternacion: motivosDeInternacion[1]
                    });
                    return;
                }
                const [errorAlCrearAdmision, confirmacion, admisionCreada] = yield AdmisionService_1.AdmisionService.crearAdmision(CrearAdmisionDTO_1.CrearAdmisionDto.toObject(crearAdmisionDTO));
                if (!confirmacion) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia", "AdmisionController", "479", errorAlCrearAdmision);
                    const alas = yield AlaService_1.AlaService.getAlaFromDb();
                    const motivosDeInternacion = yield MotivosDeInternacionService_1.MotivosDeInternacionService.buscarMotivosDeInternacion();
                    res.render("AdmisionViews/emergencia.pug", {
                        error: `${errorAlCrearAdmision}`,
                        alas: alas,
                        motivoDeInternacion: motivosDeInternacion[1]
                    });
                    return;
                }
                const [errorCama, cama] = yield CamaService_1.CamaService.buscarCama(id_Cama);
                if (errorCama)
                    throw Error(errorCama);
                console.log(cama.dataValues.habitacion.dataValues.ala.dataValues.nombre);
                console.log(cama.dataValues.habitacion.dataValues.nro_Habitacion);
                res.render("AdmisionViews/habitacion.pug", {
                    success: "Paciente Admitido",
                    nombre_ala: cama.dataValues.habitacion.dataValues.ala.dataValues.nombre,
                    nro_habitacion: cama.dataValues.habitacion.dataValues.nro_Habitacion,
                    id_Paciente: pacienteCreado === null || pacienteCreado === void 0 ? void 0 : pacienteCreado.dataValues.id_Paciente
                });
                return;
            }
            catch (error) {
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("admitirPacienteDeEmergencia", "AdmisionController", "107", error);
                const alas = yield AlaService_1.AlaService.getAlaFromDb();
                const motivosDeInternacion = yield MotivosDeInternacionService_1.MotivosDeInternacionService.buscarMotivosDeInternacion();
                res.status(500).render("AdmisionViews/emergencia.pug", {
                    error: error instanceof Error ? error.message : "Error desconocido",
                    alas: alas,
                    motivoDeInternacion: motivosDeInternacion[1]
                });
                return;
            }
        });
        // public getHabitacionesByGender = async(req:Request,res:Response) => {
        //     try{
        //         const {ala,unidad,genero,motivo} = req.body;
        //     }catch(error){
        //         console.log(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitaciones","AdmisionController","Line 142",error as string));
        //         //res.status(500).render("error",{message: "Error al obtener las habitaciones"})//Enviar con render
        //     }
        // }
        this.bajaLogicaAdmision = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.id_Admision) {
                    res.status(400).json("Se requiere el id de la admision");
                    return;
                }
                const [error, confirmacion] = yield AdmisionService_1.AdmisionService.bajaLogicaAdmision(req.body.id_Admision);
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(confirmacion);
            }
            catch (error) {
                res.status(500).json(error);
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("bajaLogicaAdmision", "AdmisionController", "Line 584", error);
                return;
            }
        });
        this.altaLogicaAdmision = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.id_Admision) {
                    res.status(400).json("Se requiere el id de la admision");
                    return;
                }
                const [error, confirmacion] = yield AdmisionService_1.AdmisionService.altaLogicaAdmision(req.body.id_Admision);
                if (error) {
                    res.status(500).json(error);
                    return;
                }
                res.status(200).json(confirmacion);
                return;
            }
            catch (error) {
                res.status(500).json(error);
                HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("altaLogicaAdmision", "AdmisionController", "Line 584", error);
                return;
            }
        });
        ///////////////////////////////////////////////
        ////////////////!TURNOS///////////////////////
        ///////////////////////////////////////////////
        this.crearTurno = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (error) {
            }
        });
        /////////////////////////////////////////////////
        ////////////!Habitaciones/////////////////////////
        ////////////////////////////////////////////////
        this.getHabitacionesDisponiblesPorGenero = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.query.ala || !req.query.genero) {
                    res.redirect(`/admision/emergencia?error=${encodeURIComponent("Se requiere el genero y ala")}`);
                    return;
                }
                const habitacionesDisponibles = yield HabitacionService_1.HabitacionService.getHabitacionesDisponibles(req.query.genero, req.query.ala);
                if (habitacionesDisponibles[0]) {
                    //res.redirect(`/admision/emergencia?error=${encodeURIComponent(`${habitacionesDisponibles[0]}`)}`)
                    res.status(404).json({ error: habitacionesDisponibles[0].toString() });
                    console.log(habitacionesDisponibles[1]);
                    return;
                }
                const habitacionesParseadas = [];
                for (let a of habitacionesDisponibles[1]) {
                    if (a.camas) {
                        const objectoCreado = {
                            nro_habitacion: a.nro_habitacion,
                            id_cama: a.camas.id_cama_1
                        };
                        habitacionesParseadas.push(objectoCreado);
                        if (a.camas.id_cama_2) {
                            const objectoCreado = {
                                nro_habitacion: a.nro_habitacion,
                                id_cama: a.camas.id_cama_2
                            };
                            habitacionesParseadas.push(objectoCreado);
                        }
                    }
                }
                res.status(200).json({ camas: habitacionesParseadas });
                return;
            }
            catch (error) {
                res.status(500).json({ error: error });
                return;
            }
        });
        ////////////////////////////////////
        ////////////////!Camas//////////////
        this.getHabitacionByCamaId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.session.admision) {
                    res.status(400).json("No hay una admision activa");
                    return;
                }
                const [error, camaActual] = yield CamaService_1.CamaService.buscarCama(req.session.admision.id_Cama);
                if (error) {
                    HelperForCreateErrors_1.HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getHabitacionByCamaId", "AdmisionController", "Line 660", error);
                    res.status(404).json(error);
                    return;
                }
                console.log(camaActual === null || camaActual === void 0 ? void 0 : camaActual.dataValues);
                res.status(200).json({
                    id_Cama: camaActual === null || camaActual === void 0 ? void 0 : camaActual.dataValues.id_Cama,
                    nro_Habitacion: camaActual === null || camaActual === void 0 ? void 0 : camaActual.dataValues.habitacion.dataValues.nro_Habitacion,
                });
            }
            catch (error) {
                res.status(500).json(error);
            }
        });
        this.test = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                // const motivosDeInternacion = await MotivosDeInternacionService.buscarMotivosDeInternacion();
                // const prioridadesDeAtencion = await PrioridadDeAtencionService.buscarLasPrioridadesDeAtencionEnDB();
                // const tiposDeAdmision = await AdmisionService.getTiposDeAdmision();
                // // const alas = await AlaService.getAlaFromDb();
                // const admision = await AdmisionService.buscarAdmisionVigentePorPaciente(2);
                // req.session.admision = admision[1]?.dataValues;
                // const ddd = await CamaService.buscarCama(3);
                // const nombreALA = ddd[1]?.dataValues.habitacion.dataValues.ala.dataValues.nombre
                // const alas = await AlaService.getAlaFromDb();
                // const [ error, camaActual] = await CamaService.buscarCama(9);
                // //console.log(camaActual?.dataValues.habitacion.dataValues);
                // res.json(camaActual)
                const [error, paciente] = yield PacientesService_1.PacienteServices.buscarPacienteDesconocido(7);
                console.log(paciente === null || paciente === void 0 ? void 0 : paciente.dataValues);
                req.session.paciente = paciente === null || paciente === void 0 ? void 0 : paciente.dataValues;
                res.json(req.session.paciente);
                // for(let a of alas!){
                //     console.log(a);
                // }
                // res.json(admision[1])   
                return;
            }
            catch (error) {
                res.json(error);
                return;
            }
        });
        this.conexionBd = conexionbd;
    }
}
exports.AdmisionController = AdmisionController;
//# sourceMappingURL=AdmisionController.js.map