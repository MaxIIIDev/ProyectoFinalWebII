import { Hospital_alas } from "../../../data/models/hospital_alas"
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";



export class AlaService{


    static getAlaFromDb = async() => {
        
        try {
            
            
            const alas = await Hospital_alas.findAll();
            let objetosLimpios: Array<{[key: string]: any}> = [];
            for(let ala of alas){
                let validado: boolean = true;
                
                if(objetosLimpios.length == 0){
                    objetosLimpios.push(ala.dataValues)
                  
                    
                }
                if(objetosLimpios.length != 0){
                    
                    for(let element of objetosLimpios){
                        if(element.nombre == ala.dataValues.nombre){
                            validado = false
                        }
                    }
                    if(validado){
                        objetosLimpios.push(ala.dataValues)
                    }
                    
                }
               
            }
            
   
           return objetosLimpios;
        
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("getAlaFromDb","AlaService","9", error as string)
        }

    }

}
