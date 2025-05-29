# ProyectoFinalWebII

# Pasos para Ejecutar el Proyecto.

1- Configurar ENVS: Apartir del ejenplo de env proporcionado. Explicare que debe colocar en cada lugar.
    - PORT= "Debe proporcionar el puerto de su maquina (Recomendacion: Puerto 3000)"
    - DB_USER="Debe proporcionar el usuario de acceso de su base de datos"
    - DB_PASSWORD="Debe proporcionar la contraseña de acceso a su base de datos"
    - DB_NAME="Debe proporcionar el nombre de su base de datos"
    - DB_HOST="Debe proporcionar el host de su base de datos(Si la ejecucion es local: 'localhost')
    - DB_PORT="Debe proporcionar el puerto de la base de datos, si es en produccion, debe colocar el puerto proporcionado por su host.
    Si es local debe colocar el puerto que usted quiere asignarle(Recomendado: 3306)
2- Ejecutar npm install
3- Ir a la carpeta "Src->data->conexion.ts" dentro de este archivo si quiere cargar los modelos de la base de datos debe descomentar la linea 98 ("await this.sync()").
4- Ejecutar el comando npm run dev.
    4.1- Este comando ejecutara el programa y comenzara la sincronizacion de modelos con la base de datos.
    4.2 - En consola le aparecera un mensaje ("Server on:") esto significa que el sistema ya esta funcionando.
    4.3 - En consola le aparecera un mensaje ("Conexion exitosa con la bd"). Esto significa que el sistema se pudo conectar exitosamente con la base de datos.
    4.5 - Si usted ya cargo los modelos de la base de datos, se recomienda comentar la linea 98  de la ruta antes mencionada que hace referencia al archivo conexion.ts. Para evitar que vuelva a sincronizar modelos innecesariamente cuando se ejecute la aplicacion.
5- 