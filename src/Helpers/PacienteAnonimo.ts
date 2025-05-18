

export class PacienteAnonimo{
    
    static getPacienteMasculina(){
        
        return {
            nombre: "John",
            apellido: "doe",
            dni: null,
            fecha_nac: Date.now(),
            edad: 30,
            genero: "Masculino",
            direccion: "av SiempreViva",
        }
    }
    static getPacienteFemenina(){
        
        return {
            nombre: "Jane",
            apellido: "doe",
            dni: null,
            fecha_nac: Date.now(),
            edad: 30,
            genero: "Femenino",
            direccion: "av SiempreViva",
        }
    }

}