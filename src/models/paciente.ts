

export class Paciente{

    private _idPaciente: number;
    
    private _nombre: string;
    
    private _apellido: string;
   
    private _dni: number;
    private _fecha_nac: Date;
    
    private _edad: number;
    
    private _peso?: number | undefined;
   


    constructor(idPaciente:number , nombre:string ,apellido:string, dni:number, fecha_nac:Date, edad:number,peso:number){
        this._nombre = nombre
        this._idPaciente = idPaciente,
        this._apellido = apellido,
        this._dni = dni,
        this._fecha_nac = fecha_nac,
        this._edad = edad,
        this._peso = peso

    }
    public get idPaciente(): number {
        return this._idPaciente;
    }
    
    public set idPaciente(value: number) {
        this._idPaciente = value;
    }
    public get nombre(): string {
        return this._nombre;
    }
    public set nombre(value: string) {
        this._nombre = value;
    }
    public get apellido(): string {
        return this._apellido;
    }
    public set apellido(value: string) {
        this._apellido = value;
    }
    public get dni(): number {
        return this._dni;
    }
    public set dni(value: number) {
        this._dni = value;
    }
    public get fecha_nac(): Date {
        return this._fecha_nac;
    }
    public set fecha_nac(value: Date) {
        this._fecha_nac = value;
    }
    public get edad(): number {
        return this._edad;
    }
    public set edad(value: number) {
        this._edad = value;
    }
    public get peso(): number | undefined {
        return this._peso;
    }
    public set peso(value: number | undefined) {
        this._peso = value;
    }
}