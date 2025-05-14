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
                console.log("Seguro medico encontrado con exito y no devuelto por modo 0");
                
                return [true, undefined];
            }
            if(seguroMedicoBuscado && modo === 1){ //retorna el objeto
                console.log("Seguro medico encontrado con exito devuelto por modo 1");

                return [true ,seguroMedicoBuscado]
            }
            
            
        }catch(Error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarSeguroMedicoExistente","SeguroMedicoService", "Line 25", Error as string);           
            
        }
        console.log("No se encontro el seguro medico");
        
        return [false, undefined]


    }
    static buscarSeguroMedico = async(id:number):Promise<[boolean?,any?]> =>{

        try{
            const seguroMedicoBuscado =  await Paciente_seguro_medico.findOne({where:{id_seguro_medico: id}})
            if(seguroMedicoBuscado ){ //retorna el objeto
                console.log("Seguro medico encontrado con exito devuelto por modo 1");

                return [false,seguroMedicoBuscado]
            }
        }catch(Error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarSeguroMedicoExistente","SeguroMedicoService", "Line 25", Error as string);           
            
        }
        console.log("No se encontro el seguro medico");
        
        return [false, undefined]


    }

    static createSeguroMedico = async(createSeguroMedicoDto:CreateSeguroMedicoDto):Promise<[(string | undefined)?, (boolean | undefined)?]> =>{

        try{
            const seguroMedicoEncontrado = await this.buscarSeguroMedicoExistente(createSeguroMedicoDto.numero,0);
            if(seguroMedicoEncontrado[0]) return ["El seguro médico ya existe",false]
            const object= CreateSeguroMedicoDto.toObject(createSeguroMedicoDto);
            
            
            const crearSeguroMedico = await Paciente_seguro_medico.create(
                object
            )
            if(crearSeguroMedico) console.log("Seguro médico creado: " )
            
            return [undefined,true]
        }catch(Error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("createSeguroMedico","SeguroMedicoService", "Line 48", Error as string);
                       
            return ["Error al crear el seguro médico",false]

            
        }



    } 

    static updateSeguroMedico = async(updateSeguroMedicoDto:UpdateSeguroMedicoDto):Promise<[string?, boolean?]> =>{

        try {   
            const seguroMedicoEncontrado = await this.buscarSeguroMedicoExistente(updateSeguroMedicoDto.numero!,1);
            if(!seguroMedicoEncontrado[0]){
               return ["No se encontro al seguro médico"];
            }
            const object = UpdateSeguroMedicoDto.toObject(updateSeguroMedicoDto);
            const [filasActualizadas] = await Paciente_seguro_medico.update(object,{where:{
                numero: seguroMedicoEncontrado[1]!.dataValues.numero
            }})
          
            if(filasActualizadas === 0){
                throw Error("no se actualizo el seguro médico")
            }
            console.log("Seguro médico actualizado: " + object)
            return [undefined,true]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("updateSeguroMedico","SeguroMedicoService", "Line 78", error as string);
            return ["Error al actualizar el seguro médico", false]
        }
    }
    static validarQueElSeguroMedicoNoEsteAsignado = async(numeroSeguroMedico:number):Promise<[string?, boolean?]> =>{

        try{

            const seguroMedicoBuscado= await this.buscarSeguroMedicoExistente(numeroSeguroMedico,1);
            if(!seguroMedicoBuscado[0]){
                throw Error("No se encontro el seguro medico")
            }
                        
            const validarSiEstaAsignado = await Pacientes.findOne({where:{id_seguro_medico: seguroMedicoBuscado[1].dataValues.id_seguro_medico}})
            if(validarSiEstaAsignado){
                console.log("El seguro médico ya está asignado a otro usuario")
                throw Error("El seguro médico ya está asignado a otro usuario")
            }
            console.log("El seguro medico es valido y no esta asignado");
            
        }catch(Error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarQueElSeguroMedicoNoEsteAsignado","SeguroMedicoService", "Line 99", Error as string); 
            return [Error as string, false];
        }
        return [undefined, true]

    }
}
