import type { Sequelize } from "sequelize";
import { admision as _admision } from "./admision";
import type { admisionAttributes, admisionCreationAttributes } from "./admision";
import { enfermeros as _enfermeros } from "./enfermeros";
import type { enfermerosAttributes, enfermerosCreationAttributes } from "./enfermeros";
import { hospital_alas as _hospital_alas } from "./hospital_alas";
import type { hospital_alasAttributes, hospital_alasCreationAttributes } from "./hospital_alas";
import { hospital_camas as _hospital_camas } from "./hospital_camas";
import type { hospital_camasAttributes, hospital_camasCreationAttributes } from "./hospital_camas";
import { hospital_habitaciones as _hospital_habitaciones } from "./hospital_habitaciones";
import type { hospital_habitacionesAttributes, hospital_habitacionesCreationAttributes } from "./hospital_habitaciones";
import { medicamentos as _medicamentos } from "./medicamentos";
import type { medicamentosAttributes, medicamentosCreationAttributes } from "./medicamentos";
import { medicos as _medicos } from "./medicos";
import type { medicosAttributes, medicosCreationAttributes } from "./medicos";
import { paciente_alergias as _paciente_alergias } from "./paciente_alergias";
import type { paciente_alergiasAttributes, paciente_alergiasCreationAttributes } from "./paciente_alergias";
import { paciente_antecedentes_familiares as _paciente_antecedentes_familiares } from "./paciente_antecedentes_familiares";
import type { paciente_antecedentes_familiaresAttributes, paciente_antecedentes_familiaresCreationAttributes } from "./paciente_antecedentes_familiares";
import { paciente_cirugias as _paciente_cirugias } from "./paciente_cirugias";
import type { paciente_cirugiasAttributes, paciente_cirugiasCreationAttributes } from "./paciente_cirugias";
import { paciente_diagnosticos as _paciente_diagnosticos } from "./paciente_diagnosticos";
import type { paciente_diagnosticosAttributes, paciente_diagnosticosCreationAttributes } from "./paciente_diagnosticos";
import { paciente_evaluacionfisica as _paciente_evaluacionfisica } from "./paciente_evaluacionfisica";
import type { paciente_evaluacionfisicaAttributes, paciente_evaluacionfisicaCreationAttributes } from "./paciente_evaluacionfisica";
import { paciente_pruebas_diagnosticas as _paciente_pruebas_diagnosticas } from "./paciente_pruebas_diagnosticas";
import type { paciente_pruebas_diagnosticasAttributes, paciente_pruebas_diagnosticasCreationAttributes } from "./paciente_pruebas_diagnosticas";
import { paciente_recetas as _paciente_recetas } from "./paciente_recetas";
import type { paciente_recetasAttributes, paciente_recetasCreationAttributes } from "./paciente_recetas";
import { paciente_seguromedico as _paciente_seguromedico } from "./paciente_seguromedico";
import type { paciente_seguromedicoAttributes, paciente_seguromedicoCreationAttributes } from "./paciente_seguromedico";
import { paciente_terapia_fisica as _paciente_terapia_fisica } from "./paciente_terapia_fisica";
import type { paciente_terapia_fisicaAttributes, paciente_terapia_fisicaCreationAttributes } from "./paciente_terapia_fisica";
import { paciente_tratamientos as _paciente_tratamientos } from "./paciente_tratamientos";
import type { paciente_tratamientosAttributes, paciente_tratamientosCreationAttributes } from "./paciente_tratamientos";
import { pacientes as _pacientes } from "./pacientes";
import type { pacientesAttributes, pacientesCreationAttributes } from "./pacientes";
import { personal_de_admision as _personal_de_admision } from "./personal_de_admision";
import type { personal_de_admisionAttributes, personal_de_admisionCreationAttributes } from "./personal_de_admision";
import { roles as _roles } from "./roles";
import type { rolesAttributes, rolesCreationAttributes } from "./roles";
import { turnos as _turnos } from "./turnos";
import type { turnosAttributes, turnosCreationAttributes } from "./turnos";
import { usuarios as _usuarios } from "./usuarios";
import type { usuariosAttributes, usuariosCreationAttributes } from "./usuarios";

export {
  _admision as admision,
  _enfermeros as enfermeros,
  _hospital_alas as hospital_alas,
  _hospital_camas as hospital_camas,
  _hospital_habitaciones as hospital_habitaciones,
  _medicamentos as medicamentos,
  _medicos as medicos,
  _paciente_alergias as paciente_alergias,
  _paciente_antecedentes_familiares as paciente_antecedentes_familiares,
  _paciente_cirugias as paciente_cirugias,
  _paciente_diagnosticos as paciente_diagnosticos,
  _paciente_evaluacionfisica as paciente_evaluacionfisica,
  _paciente_pruebas_diagnosticas as paciente_pruebas_diagnosticas,
  _paciente_recetas as paciente_recetas,
  _paciente_seguromedico as paciente_seguromedico,
  _paciente_terapia_fisica as paciente_terapia_fisica,
  _paciente_tratamientos as paciente_tratamientos,
  _pacientes as pacientes,
  _personal_de_admision as personal_de_admision,
  _roles as roles,
  _turnos as turnos,
  _usuarios as usuarios,
};

export type {
  admisionAttributes,
  admisionCreationAttributes,
  enfermerosAttributes,
  enfermerosCreationAttributes,
  hospital_alasAttributes,
  hospital_alasCreationAttributes,
  hospital_camasAttributes,
  hospital_camasCreationAttributes,
  hospital_habitacionesAttributes,
  hospital_habitacionesCreationAttributes,
  medicamentosAttributes,
  medicamentosCreationAttributes,
  medicosAttributes,
  medicosCreationAttributes,
  paciente_alergiasAttributes,
  paciente_alergiasCreationAttributes,
  paciente_antecedentes_familiaresAttributes,
  paciente_antecedentes_familiaresCreationAttributes,
  paciente_cirugiasAttributes,
  paciente_cirugiasCreationAttributes,
  paciente_diagnosticosAttributes,
  paciente_diagnosticosCreationAttributes,
  paciente_evaluacionfisicaAttributes,
  paciente_evaluacionfisicaCreationAttributes,
  paciente_pruebas_diagnosticasAttributes,
  paciente_pruebas_diagnosticasCreationAttributes,
  paciente_recetasAttributes,
  paciente_recetasCreationAttributes,
  paciente_seguromedicoAttributes,
  paciente_seguromedicoCreationAttributes,
  paciente_terapia_fisicaAttributes,
  paciente_terapia_fisicaCreationAttributes,
  paciente_tratamientosAttributes,
  paciente_tratamientosCreationAttributes,
  pacientesAttributes,
  pacientesCreationAttributes,
  personal_de_admisionAttributes,
  personal_de_admisionCreationAttributes,
  rolesAttributes,
  rolesCreationAttributes,
  turnosAttributes,
  turnosCreationAttributes,
  usuariosAttributes,
  usuariosCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const admision = _admision.initModel(sequelize);
  const enfermeros = _enfermeros.initModel(sequelize);
  const hospital_alas = _hospital_alas.initModel(sequelize);
  const hospital_camas = _hospital_camas.initModel(sequelize);
  const hospital_habitaciones = _hospital_habitaciones.initModel(sequelize);
  const medicamentos = _medicamentos.initModel(sequelize);
  const medicos = _medicos.initModel(sequelize);
  const paciente_alergias = _paciente_alergias.initModel(sequelize);
  const paciente_antecedentes_familiares = _paciente_antecedentes_familiares.initModel(sequelize);
  const paciente_cirugias = _paciente_cirugias.initModel(sequelize);
  const paciente_diagnosticos = _paciente_diagnosticos.initModel(sequelize);
  const paciente_evaluacionfisica = _paciente_evaluacionfisica.initModel(sequelize);
  const paciente_pruebas_diagnosticas = _paciente_pruebas_diagnosticas.initModel(sequelize);
  const paciente_recetas = _paciente_recetas.initModel(sequelize);
  const paciente_seguromedico = _paciente_seguromedico.initModel(sequelize);
  const paciente_terapia_fisica = _paciente_terapia_fisica.initModel(sequelize);
  const paciente_tratamientos = _paciente_tratamientos.initModel(sequelize);
  const pacientes = _pacientes.initModel(sequelize);
  const personal_de_admision = _personal_de_admision.initModel(sequelize);
  const roles = _roles.initModel(sequelize);
  const turnos = _turnos.initModel(sequelize);
  const usuarios = _usuarios.initModel(sequelize);

  paciente_evaluacionfisica.belongsTo(enfermeros, { as: "idEnfermero_enfermero", foreignKey: "idEnfermero"});
  enfermeros.hasMany(paciente_evaluacionfisica, { as: "paciente_evaluacionfisicas", foreignKey: "idEnfermero"});
  paciente_tratamientos.belongsTo(enfermeros, { as: "idEnfermero_enfermero", foreignKey: "idEnfermero"});
  enfermeros.hasMany(paciente_tratamientos, { as: "paciente_tratamientos", foreignKey: "idEnfermero"});
  hospital_habitaciones.belongsTo(hospital_alas, { as: "idAla_hospital_ala", foreignKey: "idAla"});
  hospital_alas.hasMany(hospital_habitaciones, { as: "hospital_habitaciones", foreignKey: "idAla"});
  admision.belongsTo(hospital_camas, { as: "idCama_hospital_cama", foreignKey: "idCama"});
  hospital_camas.hasMany(admision, { as: "admisions", foreignKey: "idCama"});
  hospital_camas.belongsTo(hospital_habitaciones, { as: "idHabitacion_hospital_habitacione", foreignKey: "idHabitacion"});
  hospital_habitaciones.hasMany(hospital_camas, { as: "hospital_camas", foreignKey: "idHabitacion"});
  paciente_recetas.belongsTo(medicamentos, { as: "idMedicamento_medicamento", foreignKey: "idMedicamento"});
  medicamentos.hasMany(paciente_recetas, { as: "paciente_receta", foreignKey: "idMedicamento"});
  paciente_tratamientos.belongsTo(medicamentos, { as: "idMedicamento_medicamento", foreignKey: "idMedicamento"});
  medicamentos.hasMany(paciente_tratamientos, { as: "paciente_tratamientos", foreignKey: "idMedicamento"});
  paciente_cirugias.belongsTo(medicos, { as: "idMedico_medico", foreignKey: "idMedico"});
  medicos.hasMany(paciente_cirugias, { as: "paciente_cirugia", foreignKey: "idMedico"});
  paciente_diagnosticos.belongsTo(medicos, { as: "idMedico_medico", foreignKey: "idMedico"});
  medicos.hasMany(paciente_diagnosticos, { as: "paciente_diagnosticos", foreignKey: "idMedico"});
  paciente_recetas.belongsTo(medicos, { as: "idMedico_medico", foreignKey: "idMedico"});
  medicos.hasMany(paciente_recetas, { as: "paciente_receta", foreignKey: "idMedico"});
  turnos.belongsTo(medicos, { as: "idMedico_medico", foreignKey: "idMedico"});
  medicos.hasMany(turnos, { as: "turnos", foreignKey: "idMedico"});
  paciente_pruebas_diagnosticas.belongsTo(paciente_diagnosticos, { as: "idDiagnostico_paciente_diagnostico", foreignKey: "idDiagnostico"});
  paciente_diagnosticos.hasMany(paciente_pruebas_diagnosticas, { as: "paciente_pruebas_diagnosticas", foreignKey: "idDiagnostico"});
  pacientes.belongsTo(paciente_seguromedico, { as: "idSeguroMedico_paciente_seguromedico", foreignKey: "idSeguroMedico"});
  paciente_seguromedico.hasMany(pacientes, { as: "pacientes", foreignKey: "idSeguroMedico"});
  paciente_alergias.belongsTo(paciente_tratamientos, { as: "idTratamiento_paciente_tratamiento", foreignKey: "idTratamiento"});
  paciente_tratamientos.hasMany(paciente_alergias, { as: "paciente_alergia", foreignKey: "idTratamiento"});
  paciente_diagnosticos.belongsTo(paciente_tratamientos, { as: "idTratamiento_paciente_tratamiento", foreignKey: "idTratamiento"});
  paciente_tratamientos.hasMany(paciente_diagnosticos, { as: "paciente_diagnosticos", foreignKey: "idTratamiento"});
  paciente_terapia_fisica.belongsTo(paciente_tratamientos, { as: "idTratamiento_paciente_tratamiento", foreignKey: "idTratamiento"});
  paciente_tratamientos.hasMany(paciente_terapia_fisica, { as: "paciente_terapia_fisicas", foreignKey: "idTratamiento"});
  admision.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(admision, { as: "admisions", foreignKey: "idPaciente"});
  paciente_alergias.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(paciente_alergias, { as: "paciente_alergia", foreignKey: "idPaciente"});
  paciente_antecedentes_familiares.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(paciente_antecedentes_familiares, { as: "paciente_antecedentes_familiares", foreignKey: "idPaciente"});
  paciente_cirugias.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(paciente_cirugias, { as: "paciente_cirugia", foreignKey: "idPaciente"});
  paciente_diagnosticos.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(paciente_diagnosticos, { as: "paciente_diagnosticos", foreignKey: "idPaciente"});
  paciente_evaluacionfisica.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(paciente_evaluacionfisica, { as: "paciente_evaluacionfisicas", foreignKey: "idPaciente"});
  paciente_pruebas_diagnosticas.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(paciente_pruebas_diagnosticas, { as: "paciente_pruebas_diagnosticas", foreignKey: "idPaciente"});
  paciente_recetas.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(paciente_recetas, { as: "paciente_receta", foreignKey: "idPaciente"});
  paciente_terapia_fisica.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(paciente_terapia_fisica, { as: "paciente_terapia_fisicas", foreignKey: "idPaciente"});
  paciente_tratamientos.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(paciente_tratamientos, { as: "paciente_tratamientos", foreignKey: "idPaciente"});
  turnos.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(turnos, { as: "turnos", foreignKey: "idPaciente"});
  usuarios.belongsTo(roles, { as: "idRol_role", foreignKey: "idRol"});
  roles.hasMany(usuarios, { as: "usuarios", foreignKey: "idRol"});
  enfermeros.belongsTo(usuarios, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuarios.hasOne(enfermeros, { as: "enfermero", foreignKey: "idUsuario"});
  medicos.belongsTo(usuarios, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuarios.hasOne(medicos, { as: "medico", foreignKey: "idUsuario"});
  personal_de_admision.belongsTo(usuarios, { as: "idUsuario_usuario", foreignKey: "idUsuario"});
  usuarios.hasOne(personal_de_admision, { as: "personal_de_admision", foreignKey: "idUsuario"});

  return {
    admision: admision,
    enfermeros: enfermeros,
    hospital_alas: hospital_alas,
    hospital_camas: hospital_camas,
    hospital_habitaciones: hospital_habitaciones,
    medicamentos: medicamentos,
    medicos: medicos,
    paciente_alergias: paciente_alergias,
    paciente_antecedentes_familiares: paciente_antecedentes_familiares,
    paciente_cirugias: paciente_cirugias,
    paciente_diagnosticos: paciente_diagnosticos,
    paciente_evaluacionfisica: paciente_evaluacionfisica,
    paciente_pruebas_diagnosticas: paciente_pruebas_diagnosticas,
    paciente_recetas: paciente_recetas,
    paciente_seguromedico: paciente_seguromedico,
    paciente_terapia_fisica: paciente_terapia_fisica,
    paciente_tratamientos: paciente_tratamientos,
    pacientes: pacientes,
    personal_de_admision: personal_de_admision,
    roles: roles,
    turnos: turnos,
    usuarios: usuarios,
  };
}
