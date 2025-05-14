import { Admision } from "./admision";
import { Enfermero } from "./enfermeros";
import { Hospital_alas } from "./hospital_alas";
import { Hospital_camas } from "./hospital_camas";
import { Hospital_habitaciones } from "./hospital_habitaciones";
import { Medicamentos } from "./medicamentos";
import { Medicos } from "./medicos";
import { Paciente_Alergias } from "./paciente_alergias";
import { Paciente_antecedentes_familiares } from "./paciente_antecedentes_familiares";
import { paciente_cirugias } from "./paciente_cirugias";
import { Paciente_Diagnosticos } from "./paciente_diagnosticos";
import { Paciente_Evaluacion_Fisica } from "./paciente_evaluacion_fisica";

import { Paciente_pruebas_diagnosticas } from "./paciente_pruebas_diagnosticas";
import { Paciente_recetas } from "./paciente_recetas";
import { Paciente_seguro_medico } from "./paciente_seguro_medico";
import { paciente_terapia_fisica } from "./paciente_terapia_fisica";
import { paciente_tratamientos } from "./paciente_tratamientos";
import { Pacientes } from "./pacientes";
import { Personal_de_admision } from "./personal_de_admision";
import { Roles } from "./roles";
import { Turnos } from "./turnos";
import { Usuarios } from "./usuarios";

export const importaciones = [Admision,Enfermero,Hospital_alas,Hospital_camas,Hospital_habitaciones,Medicamentos,Medicos,Paciente_Alergias,Paciente_antecedentes_familiares,paciente_cirugias,Paciente_Diagnosticos,Paciente_pruebas_diagnosticas,Paciente_recetas,Paciente_Evaluacion_Fisica,Paciente_seguro_medico,paciente_tratamientos,Pacientes,Personal_de_admision,Roles,Turnos,Usuarios];
