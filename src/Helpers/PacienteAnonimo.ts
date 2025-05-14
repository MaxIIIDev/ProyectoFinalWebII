

export class PacienteAnonimo{
    static dni = 1
    static getPacienteMasculina(){
        this.dni++
        return {
            nombre: "Jhon",
            apellido: "doe",
            dni: this.dni,
            fecha_nac: Date.now(),
            edad: 30,
            genero: "Masculino",
            direccion: "av SiempreViva",
        }
    }
    static getPacienteFemenina(){
        this.dni++
        return {
            nombre: "Jane",
            apellido: "doe",
            dni: this.dni,
            fecha_nac: Date.now(),
            edad: 30,
            genero: "Femenino",
            direccion: "av SiempreViva",
        }
    }

}