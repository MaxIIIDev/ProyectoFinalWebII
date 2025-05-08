


export class HelperForCreateErrors{


    static errorInMethodXLineX(metodo:string, linea: string):string{
        return `Error en ${metodo}\nLinea: ${linea}`
    }
    static errorInMethodXClassXLineXErrorX(metodo:string,clase:string ,linea: string, error:string):string{
        const message:string = `\n===============================\n==Error en ${metodo}\n==Nombre de la clase: ${clase}\n==Linea: ${linea}\n==Error: ${error}\n==========================\n`
        console.log(message);
        return message;
         
    }
}