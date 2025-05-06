import { Pacientes } from "../../data/models/pacientes";
import { CreatePacienteDto } from "../../domain/Dtos/pacientes/createPacienteDto";
import { UpdatePacienteDto } from "../../domain/Dtos/pacientes/updatePacienteDto";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";


export class PacienteServices{

    static  buscarUsuarioExistente= async(dni:number,modo:number):Promise<[boolean?,Pacientes?]> =>{
        try{
            const pacienteBuscado =  await Pacientes.findOne({where:{dni: dni}})
            if(pacienteBuscado && modo === 0){//retorna booleano
                return [true, undefined];
            }
            if(pacienteBuscado && modo === 1){ //retorna el objeto
                return [true ,pacienteBuscado]
            }
            
            if(!pacienteBuscado){
                throw Error()
            }
        }catch(Error){
            console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("buscarUsuarioExistente", "Line 10", Error as string));           
            return [false, undefined];
        }
        return [false, undefined]
    }
    

    static crearPaciente = async(_createPacienteDto: CreatePacienteDto):Promise<[string?,boolean?]> => {

        try{
            const pacienteEncontrado = await this.buscarUsuarioExistente(_createPacienteDto.dni,1);
            if(pacienteEncontrado[0]) return ["El paciente ya existe",false]
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
    static actualizarPaciente = async(_updatePacienteDto: UpdatePacienteDto):Promise<[string?,boolean?]> => {

        try {
            const pacienteEncontrado = await this.buscarUsuarioExistente(_updatePacienteDto.dni!,1);
            if(!pacienteEncontrado[0]){
                throw Error();
            }
            const object = UpdatePacienteDto.toObject(_updatePacienteDto);
            const [filasActualizadas] = await Pacientes.update(object,{where:{
                dni: pacienteEncontrado[1]!.dni
            }})
            if(filasActualizadas === 0){
                return ["No se actualizo ningun registro", false]
            }
        } catch (error) {
            
            console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("actualizar Paciente","46",error as string));
            
        }
        return [undefined, true]
    }
}