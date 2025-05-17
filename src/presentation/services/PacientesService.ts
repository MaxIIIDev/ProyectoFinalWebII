import { log } from "console";
import { Pacientes } from "../../data/models/pacientes";
import { CreatePacienteDto } from "../../domain/Dtos/pacientes/createPacienteDto";
import { UpdatePacienteDto } from "../../domain/Dtos/pacientes/updatePacienteDto";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { SeguroMedicoService } from "./SeguroMedicoService";
import { GetPacienteDto } from "../../domain/Dtos/pacientes/getPacienteDto";


export class PacienteServices{

    static  buscarPacienteExistente= async(dni:number,modo:number):Promise<[boolean?,Pacientes?]> =>{
        try{
            const pacienteBuscado =  await Pacientes.findOne({where:{dni: dni}})
            if(pacienteBuscado && modo === 0){//retorna booleano
                console.log("Paciente encontrado Con exito");
                
                return [true, undefined];
            }
            if(pacienteBuscado && modo === 1){ //retorna el objeto
                console.log("Paciente encontrado Con exito");
                pacienteBuscado.dataValues.fecha_nac = pacienteBuscado.dataValues.fecha_nac.toISOString().split("T")[0];
                
                return [true ,pacienteBuscado]

            }
            
            
        }catch(Error){
            console.log(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarUsuarioExistente","PacienteService", "Line 23", Error as string));           
            return [false, undefined]
        }
        console.log("Paciente no encontrado");
        
        return [false, undefined]
    }
    

    static crearPaciente = async(_createPacienteDto: CreatePacienteDto):Promise<[string?,Pacientes?]> => {

        try{
            const pacienteEncontrado = await this.buscarPacienteExistente(_createPacienteDto.dni,0);
            if(pacienteEncontrado[0]) return ["El paciente ya existe"]
            const object= CreatePacienteDto.toObject(_createPacienteDto);
            console.log(object);
            
            const crearPaciente = await Pacientes.create(
                object
            )
            console.log("Paciente creado: " + crearPaciente.toJSON())
            return [undefined,crearPaciente]
        }catch(Error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearPaciente","PacienteService", "Line 44", Error as string);
           // console.log(Error);
            
            return ["Error al crear el paciente"]

            
        }
    }
    static actualizarPaciente = async(_updatePacienteDto: UpdatePacienteDto):Promise<[string?,boolean?]> => {

        try {
            const pacienteEncontrado = await this.buscarPacienteExistente(_updatePacienteDto.dni!,1);
            if(!pacienteEncontrado[0]){
                throw Error("no se encontro al paciente");
            }
            const object = UpdatePacienteDto.toObject(_updatePacienteDto);
            const [filasActualizadas] = await Pacientes.update(object,{where:{
                dni: pacienteEncontrado[1]!.dni
            }})
            if(filasActualizadas === 0){
                return ["No se actualizo ningun registro", false]
            }
        } catch (error) {
            
            console.log(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("actualizar Paciente","PacienteService","68", error as string));
            
        }
        return [undefined, true]
    }
    static asignarSeguroMedico = async(numeroSeguroMedico:number,dniPaciente:number):Promise<[string?,boolean?]> => {

        try {
            const pacienteEncontrado = await this.buscarPacienteExistente(dniPaciente,1);
            const instanciaPacienteEncontrada = pacienteEncontrado[1];
            if(!pacienteEncontrado[0]){
                throw Error("no se encontro al paciente");
            }
            const seguroMedicoEncontrado = await SeguroMedicoService.buscarSeguroMedicoExistente(numeroSeguroMedico,1);
            if(!seguroMedicoEncontrado[0]){
                throw Error("no se encontro al seguro médico");
            }
            const validado = await SeguroMedicoService.validarQueElSeguroMedicoNoEsteAsignado(numeroSeguroMedico);
            if(validado[0]){
                throw Error(validado[0]);
            }
            console.log(            instanciaPacienteEncontrada
            );

            instanciaPacienteEncontrada!.id_seguro_medico = seguroMedicoEncontrado[1]!.dataValues.id_seguro_medico; 

            let ver = await instanciaPacienteEncontrada!.save()
            
                        
          //console.log("Paciente actualizado: " + pacienteEncontrado[1]!)
            
            
            return [undefined,true]
        } catch (error) {
            console.log(HelperForCreateErrors.errorInMethodXClassXLineXErrorX("asignarSeguroMedico","PacienteService", "Line 93", error as string));
            
            return [error as string, false]    
        }         
    }
}