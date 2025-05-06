


export class HelperForCreateErrors{


    static errorInMethodXLineX(metodo:string, linea: string):string{
        return `Error en ${metodo}\nLinea: ${linea}`
    }
    static errorInMethodXLineXErrorX(metodo:string, linea: string, error:string):string{
        return `Error en ${metodo}\nLinea: ${linea}\nError: ${error}`
    }
}