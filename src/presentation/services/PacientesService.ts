import { Pacientes } from "../../data/models/pacientes";
import { CreatePacienteDto } from "../../domain/Dtos/pacientes/createPacienteDto";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";


export class PacienteServices{

    static  buscarUsuarioExistente= async(dni:number):Promise<boolean> =>{
        try{
            const pacienteBuscado =  await Pacientes.findOne({where:{dni: dni}})
            if(pacienteBuscado){
                return true
            }
        }catch(Error){
            console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("buscarUsuarioExistente", "Line 10", Error as string));
            return false;            
        }
        

        return false;

    }

    static crearPaciente = async(_createPacienteDto: CreatePacienteDto):Promise<[string?,boolean?]> => {

        try{
            if(await this.buscarUsuarioExistente(_createPacienteDto.dni)) return ["El paciente ya existe",false]
            const object= CreatePacienteDto.toObject(_createPacienteDto);
            const crearPaciente = await Pacientes.create({
                object
            })
            console.log("Paciente creado: " + crearPaciente.toJSON())
            return [undefined,true]
        }catch(Error){
            HelperForCreateErrors.errorInMethodXLineXErrorX("crearPaciente", "Line 20", Error as string);
            return ["Error al crear el paciente",false]
            
        }
    }

}