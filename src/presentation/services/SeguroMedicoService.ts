import { Paciente_seguro_medico } from "../../data/models/paciente_seguro_medico";
import { Pacientes } from "../../data/models/pacientes";
import { CreateSeguroMedicoDto } from "../../domain/Dtos/SeguroMedico/createSeguroMedicoDto";
import { UpdateSeguroMedicoDto } from "../../domain/Dtos/SeguroMedico/updateSeguroMedicoDto";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";


export class SeguroMedicoService{

    static buscarSeguroMedicoExistente = async(numero:number,modo:number):Promise<[boolean?,any?]> =>{

        try{
            const seguroMedicoBuscado =  await Paciente_seguro_medico.findOne({where:{numero: numero}})
            if(seguroMedicoBuscado && modo === 0){//retorna booleano
                return [true, undefined];
            }
            if(seguroMedicoBuscado && modo === 1){ //retorna el objeto
                return [true ,seguroMedicoBuscado]
            }
            
            
        }catch(Error){
            console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("buscarSeguroMedicoExistente", "Line 10", Error as string));           
            
        }
        return [false, undefined]


    }

    static createSeguroMedico = async(createSeguroMedicoDto:CreateSeguroMedicoDto):Promise<[(string | undefined)?, (boolean | undefined)?]> =>{

        try{
            const seguroMedicoEncontrado = await this.buscarSeguroMedicoExistente(createSeguroMedicoDto.numero,0);
            if(seguroMedicoEncontrado[0]) return ["El seguro médico ya existe",false]
            const object= CreateSeguroMedicoDto.toObject(createSeguroMedicoDto);
            console.log(object);
            
            const crearSeguroMedico = await Paciente_seguro_medico.create(
                object
            )
            console.log("Seguro médico creado: " + crearSeguroMedico.toJSON())
            return [undefined,true]
        }catch(Error){
            HelperForCreateErrors.errorInMethodXLineXErrorX("createSeguroMedico", "Line 31", Error as string);
                       
            return ["Error al crear el seguro médico",false]

            
        }



    } 

    static updateSeguroMedico = async(updateSeguroMedicoDto:UpdateSeguroMedicoDto):Promise<[string?, boolean?]> =>{

        try {   
            const seguroMedicoEncontrado = await this.buscarSeguroMedicoExistente(updateSeguroMedicoDto.numero!,1);
            if(!seguroMedicoEncontrado[0]){
                throw Error("no se encontro al seguro médico");
            }
            const object = UpdateSeguroMedicoDto.toObject(updateSeguroMedicoDto);
            const [filasActualizadas] = await Paciente_seguro_medico.update(object,{where:{
                numero: seguroMedicoEncontrado[1]!.numero
            }})
          
            if(filasActualizadas === 0){
                throw Error("no se actualizo el seguro médico")
            }
            console.log("Seguro médico actualizado: " + object)
            return [undefined,true]

        } catch (error) {
            console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("updateSeguroMedico", "Line 56", error as string));
            return ["Error al actualizar el seguro médico", false]
        }
    }
    static validarQueElSeguroMedicoNoEsteAsignado = async(numeroSeguroMedico:number):Promise<[string?, boolean?]> =>{

        try{

            const seguroMedicoBuscado= await this.buscarSeguroMedicoExistente(numeroSeguroMedico,1);
            if(!seguroMedicoBuscado[0]){
                throw Error("No se encontro el seguro medico")
            }
            const validarSiEstaAsignado = await Pacientes.findOne({where:{id_seguro_medico: seguroMedicoBuscado[1]!.id}})
            if(validarSiEstaAsignado){
                console.log("El seguro médico ya está asignado a otro usuario")
                throw Error("El seguro médico ya está asignado a otro usuario")
            }

        }catch(Error){
            console.log(HelperForCreateErrors.errorInMethodXLineXErrorX("validarQueElSeguroMedicoNoEsteAsignado", "Line 79", Error as string)); 
            return [Error as string, false];
        }
        return [undefined, true]

    }
}
