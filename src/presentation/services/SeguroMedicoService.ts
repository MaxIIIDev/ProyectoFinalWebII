import model from "sequelize/types/model";
import { Paciente_seguro_medico } from "../../data/models/paciente_seguro_medico";
import { Pacientes } from "../../data/models/pacientes";
import { CreateSeguroMedicoDto } from "../../domain/Dtos/SeguroMedico/createSeguroMedicoDto";
import { UpdateSeguroMedicoDto } from "../../domain/Dtos/SeguroMedico/updateSeguroMedicoDto";
import { HelperForCreateErrors } from "../../Helpers/HelperForCreateErrors";
import { Mutual } from "../../data/models/mutual";
import { CategoriaSeguro } from "../../data/models/categoriaSeguro";


export class SeguroMedicoService{

    static getMutualesFromDb = async():Promise<[boolean?,Mutual[]?]> =>{
        try{
            const mutuales = await Mutual.findAll();
            if(mutuales.length === 0){
                console.log("No se encontraron mutuales");
                return [false, undefined]
            }
            
            return [true, mutuales]
        }catch(Error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getMutuales","SeguroMedicoService", "Line 15", Error as string);           
            return [false, undefined]
        }
    }
    static getCategoriasFromDb = async():Promise<[boolean?,CategoriaSeguro[]?]> =>{

        try{
            const categorias = await CategoriaSeguro.findAll();
            if(categorias.length === 0){
                console.log("No se encontraron categorias");
                return [false, undefined]
            }
            
            return [true, categorias]
        }catch(Error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getCategorias","SeguroMedicoService", "Line 15", Error as string);           
            return [false, undefined]
        }

    }
    static buscarSeguroMedicoExistente = async(numero:number,modo:number):Promise<[boolean?,any?]> =>{

        try{
            const seguroMedicoBuscado =  await Paciente_seguro_medico.findOne({
                include:[
                    {
                        model: Pacientes,
                        as: "paciente",

                    },
                    {
                        model: Mutual,
                        as: "mutual",
                    },
                    {
                        model: CategoriaSeguro,
                        as: "categoria_seguro",
                    }
                    
                ],    
                where:{numero: numero}
            })
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
            console.log("No se encontro el seguro medico");
            return [false, undefined]
        }
        return [false, undefined]   
    }
    static buscarSeguroMedico = async(id:number):Promise<[boolean?,any?]> =>{

        try{
            const seguroMedicoBuscado =  await Paciente_seguro_medico.findOne({
                include:[
                    {
                    model: Pacientes,
                    as: "paciente"
                    },
                    {
                        model: Mutual,
                        as: "mutual"
                    },
                    {
                        model: CategoriaSeguro,
                        as: "categoria_seguro"
                    }
                ],
                where:{id_seguro_medico: id}})
            if(seguroMedicoBuscado ){ //retorna el objeto
                console.log("Seguro medico encontrado con exito devuelto por modo 1");

                return [true,seguroMedicoBuscado]
            }
        }catch(Error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarSeguroMedicoExistente","SeguroMedicoService", "Line 25", Error as string);           
            return [false, undefined]
        }
        console.log("No se encontro el seguro medico");
        return [false, undefined]
    }

    static createSeguroMedico = async(createSeguroMedicoDto:CreateSeguroMedicoDto):Promise<[(string | undefined)?, Paciente_seguro_medico?]> =>{

        try{
            const seguroMedicoEncontrado = await this.buscarSeguroMedicoExistente(createSeguroMedicoDto.numero,0);
            if(seguroMedicoEncontrado[0]) return ["El seguro médico ya existe",undefined]
            const object= CreateSeguroMedicoDto.toObject(createSeguroMedicoDto);
            const seguroMedicoCreado = await Paciente_seguro_medico.create(
                object
            )
            if(seguroMedicoCreado) console.log("Seguro médico creado: " )
            
            return [undefined,seguroMedicoCreado]
        }catch(Error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("createSeguroMedico","SeguroMedicoService", "Line 99", Error as string);
            return ["Error al crear el seguro médico",undefined]
        }
    } 

    static updateSeguroMedico = async(updateSeguroMedicoDto:UpdateSeguroMedicoDto,id_seguro_medico:number, id_Paciente:number ):Promise<[string?, boolean?]> =>{

        try {   
            const seguroMedicoEncontrado = await this.buscarSeguroMedico(id_seguro_medico);
            if(!seguroMedicoEncontrado[0]){
               return ["No se encontro al seguro médico"];
            }
            const [error, confirmacion] = await this.validarQueElSeguroMedicoNoEsteAsignadoComparando(updateSeguroMedicoDto.numero!,id_Paciente);
            if(!confirmacion){
                return [error];
            }
            const updateSeguroMedicoToObject = UpdateSeguroMedicoDto.toObject(updateSeguroMedicoDto);
            const [filasActualizadas] = await Paciente_seguro_medico.update(updateSeguroMedicoToObject,{where:{
                numero: seguroMedicoEncontrado[1]!.dataValues.numero
            }})
          
            if(filasActualizadas === 0){
                throw Error("no se actualizo el seguro médico")
            }
            console.log("Seguro médico actualizado: " + updateSeguroMedicoToObject)
            return [undefined,true]

        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("updateSeguroMedico","SeguroMedicoService", "Line 78", error as string);
            return ["Error al actualizar el seguro médico", false]
        }
    }
    static validarQueElSeguroMedicoNoEsteAsignado = async(numeroSeguroMedico:number):Promise<[string?, boolean?]> =>{ //*Deberia funcionar

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
    static validarQueElSeguroMedicoNoEsteAsignadoComparando = async(numeroSeguroMedico:number, id_Paciente:number):Promise<[string?, boolean?]> =>{ //*Deberia funcionar

        try{

            const seguroMedicoBuscado= await this.buscarSeguroMedicoExistente(numeroSeguroMedico,1);
            if(!seguroMedicoBuscado[1]){
                return[undefined,true]
            }
                        
            const validarSiEstaAsignado = await Pacientes.findOne({where:{id_seguro_medico: seguroMedicoBuscado[1].dataValues.id_seguro_medico}})
            console.log("Numero de paciente buscado: "+validarSiEstaAsignado?.dataValues.id_Paciente + "\nNumero de paciente Enviado: " + id_Paciente);
            
            if(validarSiEstaAsignado?.dataValues.id_Paciente != id_Paciente){
                console.log("El seguro médico ya está asignado a otro usuario")
                return [undefined, false]
            }
            console.log("El seguro medico es valido y no esta asignado");
            return [undefined, true]
        }catch(Error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("validarQueElSeguroMedicoNoEsteAsignado","SeguroMedicoService", "Line 99", Error as string); 
            return [Error as string, false];
        }
    }
}
