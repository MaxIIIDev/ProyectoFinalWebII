import { Enfermero } from "../../../data/models/Enfermero";
import { Medicos } from "../../../data/models/Medicos";
import { Personal_de_admision } from "../../../data/models/Personal_de_admision";
import { Roles } from "../../../data/models/Roles";
import { Usuarios } from "../../../data/models/Usuarios";
import { FunctionHelperFor } from "../../../Helpers/FunctionHelperFor";
import { HelperForCreateErrors } from "../../../Helpers/HelperForCreateErrors";
import * as bcrypt from "bcrypt"


export class AuthServices{
    private static  saltRounds = 10;
    static async ChequearEstadoDeCuenta(email:string, modo:boolean):Promise<[string?,boolean?,Usuarios?]>{ //Si el modo es verdadero, devolvera la cuenta
        //*TESTEADO 
        try {
            const validateEmail = FunctionHelperFor.validateEmail(email);
            if(!validateEmail[1]) return [validateEmail[0], undefined]
            const cuenta = await this.buscarCuenta(email);
            if(modo){
                if(cuenta[0]) return [cuenta[0],undefined,undefined];
                if(cuenta[1].dataValues.activo == true) return [undefined, true, cuenta[1]] 
                if(cuenta[1].dataValues.activo == false) return [undefined, false, cuenta[1]] 
            }
            if(cuenta[0]) return [cuenta[0]];
            if(cuenta[1].dataValues.activo == true) return [undefined, true] 
            if(cuenta[1].dataValues.activo == false) return [undefined, false] 
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("ChequearEstadoDeCuenta","AuthService","17", error as string)
            return [error]
        }
    }
    static async buscarCuenta(email: string): Promise<[string?,Usuarios?]>{//*TESTEADO
        try {
            const validateEmail = FunctionHelperFor.validateEmail(email);
            if(!validateEmail[1]) return [validateEmail[0], undefined]
            const usuarioEncontrado = await Usuarios.findOne({
                include: [
                    {
                        model: Roles,
                        as: "rol"
                    },
                    {
                        model: Medicos,
                        as: "medico"
                    },
                    {
                        model: Enfermero,
                        as: "enfermero"
                    },
                    {
                        model: Personal_de_admision,
                        as: "personal_de_admision"
                    }
                ],
                where: {
                    email: email
                }
            })
            if(!usuarioEncontrado){
                return ["No se encontró registrado un usuario con dicho email" , undefined]
            }
            return [undefined, usuarioEncontrado]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("buscarCuenta","AuthService","46",error as string)
            return [error as string]
        }
    }
    static async ChequearYBloquearCuenta(email:string):Promise<[string?, boolean?,boolean?]>{//* El segundo boolean representa que la funcion funciono correctamente, y el tercer boolean representa, si se bloqueó o no la cuenta
        //* TESTEADO
        try {
            const validateEmail = FunctionHelperFor.validateEmail(email)
            if(!validateEmail[1]) return [validateEmail[0], false]
            const cuentaEncontrada = await this.buscarCuenta(email);
            if(cuentaEncontrada[0]) return [cuentaEncontrada[0]]
            if(cuentaEncontrada[1].dataValues.intentos_fallidos >= 5){
                cuentaEncontrada[1].activo = false
                await cuentaEncontrada[1].save(); //todo: Chequear si lo hace
                return [undefined,true,true]
            }
            return [undefined,true, false ]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX(" ChequearYBloquearCuenta","AuthServices","18", error as string)
            return [error as string, false]
        }
    }
    static async sumarIntentosErrados(email: string): Promise<[string?,boolean?,boolean?]> { //*El segundo boolean representa que la funcion funciono correctamente, y el tercer boolean representa, si se bloqueó o no la cuenta
        //*TESTEADO
        try{
            const emailValidated = FunctionHelperFor.validateEmail(email);
            if(!emailValidated[1]){
                return [emailValidated[0], false, false]
            }
            const filasActualizadas : [affectedRows: Usuarios[], affectedCount?: number] = await Usuarios.increment("intentos_fallidos",{
                where: {
                    email:email
                },
                by: 1
            })
        
            if(!(Number(filasActualizadas[0][1]) >= 1)) {
                return ["No se incremento el intento", false, false];
            }
            const revisarBloqueo = await this.ChequearYBloquearCuenta(email);
            if(revisarBloqueo[1] && revisarBloqueo[2]) return [undefined,true,true]
            return [undefined, true,false]
        }catch(error){
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("sumarIntentosErrados","AuthServices","12",error as string)
            return [error, false, false ]
        }

    }
    static async restablecerIntentos(email:string):Promise<[string?,boolean?]> { //*TESTEADO

        try {
            const emailValidated = FunctionHelperFor.validateEmail(email)
            if(!emailValidated[1]){
                return [emailValidated[0], false]
            }
            const cuenta = await this.buscarCuenta(email);
            if(cuenta[0]) return [cuenta[0], false]
            cuenta[1].intentos_fallidos = 0;
            await cuenta[1].save();
            console.log("Se restablecieron los intentos");
            
            return [undefined, true ]
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("RestablecerIntentos","AuthServices","125",error as string)
            return [error as string, false]
        }

    }
    static async login(email: string, password: string):Promise<[string?,Usuarios?]>{ //*TESTEADO

        try {
            const emailValidated = FunctionHelperFor.validateEmail(email)
            if(!emailValidated[1]){
                return [emailValidated[0], undefined]
            }
            const cuentaBuscadaYChequeada = await this.ChequearEstadoDeCuenta(email,true);
            if(cuentaBuscadaYChequeada[0]) return [cuentaBuscadaYChequeada[0], undefined]
            if(!cuentaBuscadaYChequeada[1]) return ["La cuenta esta bloqueada, comuniquese con el administrador", undefined]
            
            if( !await bcrypt.compare(password,cuentaBuscadaYChequeada[2].dataValues.password_hash)){
                const validateIncrement = await this.sumarIntentosErrados(email);
                if(!validateIncrement[1]) return [validateIncrement[0], undefined]
                if(validateIncrement[0] == undefined &&validateIncrement[1]&&validateIncrement[2]) return ["Credenciales incorrectos, cuenta bloqueada", undefined]
                return ["Credenciales incorrectos", undefined]
            }
            await this.restablecerIntentos(email);
            return [ undefined, cuentaBuscadaYChequeada[2]]


        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("login","AuthServices","7" , error as string)
            return [error, undefined]
        }

    }
    //!Crear SingUp basico
    static async crearContraseña(contraseña: string): Promise<[string?, boolean?, string?]>{ //*TESTEADO
        try {
            // Validación de contraseña: mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordRegex.test(contraseña)) {
                return ["La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas, un número y un carácter especial.", false, undefined];
            }
            const salt = bcrypt.genSaltSync(this.saltRounds);
            const hashConstraseña = bcrypt.hashSync(contraseña, salt);
            return [undefined, true, hashConstraseña];
        } catch (error) {
            HelperForCreateErrors.errorInMethodXClassXLineXErrorX("crearContraseña","AuthServices","162",error as string)
            return [error as string, false, undefined];
        }
    }
}