import { Admision } from "./Admision";
import { CategoriaSeguro } from "./CategoriaSeguro";
import { Enfermero } from "./Enfermero";
import { Especialidades } from "./Especialidades";
import { Horarios_Turnos } from "./Horarios_Turnos";
import { Hospital_alas } from "./Hospital_alas";
import { Hospital_camas } from "./Hospital_camas";
import { Hospital_habitaciones } from "./Hospital_habitaciones";
import { Lazo_Familiar } from "./Lazo_familiar";
import { Medicamentos } from "./Medicamentos";
import { Medicos } from "./Medicos";
import { motivo_De_Internacion } from "./Motivo_De_Internacion";
import { Mutuales } from "./Mutuales";
import { nombre_Alergia } from "./Nombre_Alergia";
import { nombre_Cirugia } from "./Nombre_Cirugia";
import { nombre_Prueba_Diagnostica } from "./Nombre_Prueba_Diagnostica";
import { Paciente_Alergias } from "./Paciente_Alergias";
import { Paciente_antecedentes_familiares } from "./Paciente_antecedentes_familiares";
import { Paciente_Cirugias } from "./Paciente_Cirugias";
import { Paciente_Diagnosticos } from "./Paciente_Diagnosticos";
import { Paciente_Evaluacion_Fisica } from "./Paciente_Evaluacion_Fisica";

import { Paciente_pruebas_diagnosticas } from "./Paciente_pruebas_diagnosticas";
import { Paciente_recetas } from "./Paciente_recetas";
import { Paciente_seguro_medico } from "./Paciente_seguro_medico";

import { paciente_tratamientos } from "./paciente_tratamientos";
import { Pacientes } from "./Pacientes";
import { Personal_de_admision } from "./Personal_de_admision";
import { Prioridad_De_Atencion } from "./Prioridad_De_Atencion";

import { Roles } from "./Roles";
import { Sintomas } from "./Sintomas";
import { tipo_De_Admision } from "./tipo_de_Admision";
import { Tipo_De_Medicamento } from "./Tipo_De_Medicamento";
import { Tipo_De_Diagnostico } from "./Tipo_De_Diagnostico";
import { Tipo_De_tratamiento } from "./Tipo_De_tratamiento";
import { Tipo_Sanguineo } from "./Tipo_Sanguineo";
import { Turnos } from "./Turnos";
import { Usuarios } from "./Usuarios";
import { Paciente_Medicacion_Actual } from "./Paciente_Medicacion_Actual";
import { Nombre_Sintoma } from "./nombre_sintoma";
import { RecetasMedicamentos } from "./RecetaMedicamentos";

export const importaciones = [
    Horarios_Turnos,
    Mutuales,
    nombre_Alergia,
    nombre_Prueba_Diagnostica,
    Tipo_De_Diagnostico,
    CategoriaSeguro,Especialidades,
    Lazo_Familiar,
    Prioridad_De_Atencion,
    motivo_De_Internacion,
    Sintomas,
    tipo_De_Admision,
    Tipo_De_Medicamento,
    Tipo_De_tratamiento,
    Tipo_Sanguineo,Admision,
    Enfermero,
    Hospital_alas,
    Hospital_camas,
    Hospital_habitaciones,
    Medicamentos,
    Nombre_Sintoma,
    RecetasMedicamentos,
    Medicos,
    Paciente_Alergias,
    Paciente_antecedentes_familiares,
    Paciente_Cirugias,Paciente_Diagnosticos,
    Paciente_pruebas_diagnosticas,
    Paciente_recetas,
    Paciente_Evaluacion_Fisica,
    Paciente_seguro_medico,
    paciente_tratamientos,
    Paciente_Medicacion_Actual,
    Pacientes,
    Personal_de_admision,
    Roles,
    Turnos,
    Usuarios,
    nombre_Cirugia];
