


export class HelperForCreateErrors{


    static errorInMethodXLineX(metodo:string, linea: string):string{
        return `Error en ${metodo}\nLinea: ${linea}`
    }
    static errorInMethodXClassXLineXErrorX(metodo:string,clase:string ,linea: string, error:string):string{
        const message:string = `===============================\n==Error en ${metodo}\n==Nombre de la clase: ${clase}\n==Linea: ${linea}\n==Error: ${error}\n==========================`
        console.log(message);
        return message;
         
    }
}