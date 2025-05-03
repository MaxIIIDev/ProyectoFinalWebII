import { Sequelize } from "sequelize-typescript";
import { admision } from "./admision";
import { enfermeros } from "./enfermeros";
import { hospital_alas } from "./hospital_alas";
import { hospital_camas } from "./hospital_camas";
import { hospital_habitaciones } from "./hospital_habitaciones";
import { medicamentos } from "./medicamentos";
import { medicos } from "./medicos";
import { paciente_alergias } from "./paciente_alergias";
import { paciente_antecedentes_familiares } from "./paciente_antecedentes_familiares";
import { pacienteCirugias } from "./paciente_cirugias";
import { pacienteDiagnosticos } from "./paciente_diagnosticos";
import { pacienteEvaluacionFisica } from "./paciente_evaluacionfisica";
import { pacientePruebasDiagnosticas } from "./paciente_pruebas_diagnosticas";
import { pacienteRecetas } from "./paciente_recetas";
import { pacienteSeguroMedico } from "./paciente_seguromedico";
import { pacienteTerapiaFisica } from "./paciente_terapia_fisica";
import { pacienteTratamientos } from "./paciente_tratamientos";
import { pacientes } from "./pacientes";
import { personalDeAdmision } from "./personal_de_admision";
import { roles } from "./roles";
import { turnos } from "./turnos";
import { usuarios } from "./usuarios";

export function initModels(sequelize: Sequelize) {
  try {
    // const modelos= [
    //   admision,
    //   enfermeros,
    //   hospital_alas,
    //   hospital_camas,
    //   hospital_habitaciones,
    //   medicamentos,
    //   medicos,
    //   paciente_alergias,
    //   paciente_antecedentes_familiares,
    //   pacienteCirugias,
    //   pacienteDiagnosticos,
    //   pacienteEvaluacionFisica,
    //   pacientePruebasDiagnosticas,
    //   pacienteRecetas,
    //   pacienteSeguroMedico,
    //   pacienteTerapiaFisica,
    //   pacienteTratamientos,
    //   pacientes,
    //   personalDeAdmision,
    //   roles,
    //   turnos,
    //   usuarios,
    // ];
    // const validModels = modelos.filter( model => {
    //   if(!model){
    //     console.error("Modelo no definido correctamente");
    //     return false;
    //   }
    //   return true
    // })
    // if(validModels.length ===0){
    //   throw new Error("No hay modelos que registrar");
    // }
    // sequelize.addModels(validModels);
    sequelize.addModels([pacientes]);
    return {
      //admision,
      // enfermeros,
      // hospital_alas,
      // hospital_camas,
      // hospital_habitaciones,
      // medicamentos,
      // medicos,
      // paciente_alergias,
      // paciente_antecedentes_familiares,
      // pacienteCirugias,
      // pacienteDiagnosticos,
      // pacienteEvaluacionFisica,
      // pacientePruebasDiagnosticas,
      // pacienteRecetas,
      // pacienteSeguroMedico,
      // pacienteTerapiaFisica,
      // pacienteTratamientos,
       pacientes,
      // personalDeAdmision,
      // roles,
      // turnos,
      // usuarios,
    };
  } catch (error) {
    console.error("Error en initModels: ", error)
    throw error
  }
  
}
