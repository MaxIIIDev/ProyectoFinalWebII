# ProyectoFinalWebII

# Pasos para Ejecutar el Proyecto.

# 1- Configurar ENVS: Apartir del ejemplo de env proporcionado. Explicare que debe colocar en cada lugar.
    - PORT= "Debe proporcionar el puerto de su maquina (Recomendacion: Puerto 3000)"
    - DB_USER="Debe proporcionar el usuario de acceso de su base de datos"
    - DB_PASSWORD="Debe proporcionar la contraseña de acceso a su base de datos"
    - DB_NAME="Debe proporcionar el nombre de su base de datos"(Debe tener creada una base de datos)
    - DB_HOST="Debe proporcionar el host de su base de datos(Si la ejecucion es local: 'localhost')
    - DB_PORT="Debe proporcionar el puerto de la base de datos, si es en produccion, debe colocar el puerto proporcionado por su host.
    Si es local debe colocar el puerto que usted quiere asignarle(Recomendado: 3306)
# 2- Ejecutar el comando npm install para instalar dependencias.
# 3- Ir a la carpeta "Src->data->conexion.ts" dentro de este archivo si quiere cargar los modelos de la base de datos debe descomentar la linea 98 ("await this.sync()") para cargar los modelos por primera vez en la base de datos.
# 4- Ejecutar el comando npm run dev.
    4.1- Este comando ejecutara el programa y comenzara la sincronizacion de modelos con la base de datos.
    4.2 - En consola le aparecera un mensaje ("Server on:") esto significa que el sistema ya esta funcionando.
    4.3 - En consola le aparecera un mensaje ("Conexion exitosa con la bd"). Esto significa que el sistema se pudo conectar exitosamente con la base de datos.
    4.5 - Si usted ya cargo los modelos de la base de datos, se recomienda comentar la linea 98  de la ruta antes mencionada que hace referencia al archivo conexion.ts. Para evitar que vuelva a sincronizar modelos innecesariamente cuando se ejecute la aplicacion.

# FUNCIONALIDADES DE LA APLIACION: 
# 5- RUTAS QUE PUEDE ACCEDER Y SU FUNCION.
    .RUTA:"/admision/" 
    ..METHOD:GET 
    ...DESCRIPCION -> Dicha ruta renderiza la vista principal de admisiones.
    
    .RUTA: "/admision/emergencia" 
    ..METHOD:GET 
    ...Descripcion: Dicha ruta renderiza la vista de admisiones de emergencia.
    .RUTA : "/admision/emergencia/habitacion 
    ..METHOD: POST 
    ...DESCRIPCION -> Dicha ruta recibe por body el genero,   id_motivo_de_Internacion,id_cama y se encarga crear un paciente "NN", lo registra como paciente en base de datos, y luego genera la admision en    base de datos del mismo y al finalizar renderiza la vista "habitacion. pug" para mostrar los datos del registro.
    
    .RUTA: "/admision/principal/paciente"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta  se encarga de renderizar la vista principal del panel de pacientes "principal.pug", donde la misma valida que exista un req.session del paciente para el ingreso.

    .RUTA: "/admision/find"
    ..METHOD: GET,
    ...DESCRIPCION: Dicha ruta se encarga de renderizar la vista de busqueda de paciente mediante DNI.

    .RUTA: "/admision/find/desconocido"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta se encarga de renderizar la vista de busqueda de paciente NN mediante ID, el ID a proveer es el que el sistema le proporcionó  al usuario mediante el procesos de la ruta "/admision/emergencia"

    .RUTA: "/admision/crear/paciente"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta se encarga de renderizar la vista para registrar un paciente.

    .RUTA: "/admision/find/paciente"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por body un parametro "dni" para luego buscar en la base de datos al paciente por dicho atributo. Cuando lo encuentra lo almacena en el req.session.paciente para hacer uso de el en proximas vistas. Al finalizar el proceso se redirecciona a la ruta "/admision/principal/paciente".

    .RUTA: "/admision/find/paciente/desconocido"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query el parametro "id_Paciente", para luego buscar en la base de datos un paciente condicionado a que su atributo "DNI" sea null. Luego almacena dicho paciente en el req.session.paciente para ser utilizado por proximas vistas y redirecciona a la ruta ("/admision/principal/paciente")

    .RUTA: "/admision/crear/seguro/medico
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para crear el seguro medico renderizando el archivo "CrearSeguroMedico.pug
    
    .RUTA: "/admision/actualizar/seguro/medico
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para actualizar el seguro medico renderizando el archivo "actualizarSeguroMedico.pug
    
    .RUTA: "/admision/redireccion/admision
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta es un redireccionador de vistas, donde evalua si el paciente almacenado en la session tiene alguna admision activa, en el caso que el paciente tenga una admision activa el controlador realizara un redirect a la ruta ("admision/actualizar/admision").
    En el caso que no haya una admision activa vinculada a dicho paciente se hara un redirect a la ruta ("admision/crear/admision")
    
    .RUTA: "/admision/crear/admision
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para crear admisiones, renderizando el archivo "vistaCrearAdmision.pug".
    
    .RUTA: "/admision/actualizar/admision
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para actualizar admisiones, renderizando el archivo "vistaActualizarAdmision.pug".
    
    .RUTA: "/admision/paciente
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para actualizar al paciente, renderizando el archivo "ActualizarPaciente.pug".
    
    .RUTA: "/admision/get/info/paciente/:dni
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por parametro un atributo DNI, al mismo lo utiliza para consultar toda la informacion vinculada a un paciente en la base de datos, retornando un archivo .JSON con la informacion encontrada. 
    
    .RUTA: "/admision/register/paciente
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por el body los atributos necesarios para registrar un paciente en la base de datos, posteriormente son validados y el paciente es registrado en la base de datos.Finalizado el proceso el paciente se guarda en la sesion y el controlador redirecciona a la ruta "/admision/principal/paciente"

    .RUTA: "/admision/update/paciente
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar del paciente solicitado, posteriormente son validados y si no hay errores son actualizados los datos del paciente en la base de datos. Finalizado el proceso el paciente actualizado es guardado en la session y el controlador renderiza la vista ("ActualizarPaciente.pug").


    .RUTA: "/admision/redirect/seguro
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta es un redireccionador de rutas donde valida si el paciente tiene un seguro medico, en el caso que lo tenga el controlador redirecciona a la ruta "/admision/actualizar/seguro/medico". En caso que no tenga un seguro medico el controlador redirecciona a la ruta ("/admision/crear/seguro/medico").


    .RUTA: "/admision/get/seguro/medico/:numero
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe un numero de seguro medico por parametros y lo busca en la base de datos, si lo encuentra retorna un archivo JSON con los resultados.


    .RUTA: "/admision/actualizar/seguro/medico
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar de un seguro medico donde en cuyo flujo se realizan validaciones de campos y conversiones, para posteriormente realizar los cambios requeridos en la base de datos de dicho seguro medico. Al finalizar el proceso el controlador redirecciona a la ruta "/admision/actualizar/seguro/medico"

    .RUTA: "/admision/registrar/seguro/medico
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos y valores necesarios para registrar un seguro medico, luego realiza proceso de validaciones y posteriormente si es todo correcto realiza el registro en la base de datos y luego ejecuta otro proceso algoritmico para realizar la asignacion de dicho seguro medico al paciente almacenado en la sesion. Finalizado el proceso el controlador realiza un redirect a la ruta "/admision/principal/paciente"

    .RUTA: "/admision/get/todas/las/admisiones
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta realiza una consulta a la base de datos para obtener todas las admisiones activas y retorna dichos resultados en un archivo JSON


    .RUTA: "/admision/get/admision/de/paciente/:dni
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por parametros un atributo dni que sirve para posteriormente realizar una consulta a la base de datos, solicitando resultados de admisiones registradas al paciente con el dni enviado.

    .RUTA: "/admision/get/habitacion
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe un atributo genero y otro ala por query que sirve para posteriormente realizar una consulta a la base de datos solicitando resultados de camas disponibles en dicha ala. Dicho controlador realiza un proceso algoritmico filtra entre habitaciones con 2 camas, añadiendo solamente las camas que tengan el mismo genero de la cama ocupada, y tambien añade las camas que estan disponibles y en habitaciones individuales. Retornando un archivo JSON con los resultados.

    .RUTA: "/admision/get/habitacion/ocupada
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta se solventa mediante los datos obtenidos de la session donde realiza una consulta a la base de datos buscando la cama vinculada a la admision del paciente en session para luego retornar los resultados en un archivo JSON.

    .RUTA: "/admision/create/admision
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos necesarios para poder realizar el registro de una admision en base de datos. Luego de un proceso de validaciones el controlador realiza el registro en base de datos y una vez finalizado el proceso redirecciona a la ruta "/admision/principal/paciente".

    .RUTA: "/admision/update/admision
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body atributos necesarios para ser actualizados de un registro en base de datos, luego de un proceso de validaciones el controlador realiza la actualizacion de datos en la base de datos del registro especificado. Una vez finalizado el preoceso el sistema redirecciona a la ruta "/admision/principal/paciente"

    .RUTA: "/admision/baja
    ..METHOD: POST
    ...DESCRIPCION: La ruta recibe por body un atributo id_Admision donde el mismo es utilizado para dar de baja un registro en la base de datos. Una vez concluido dicho procesos el controlador envia una confirmacion mediante un archivo JSON
    
    .RUTA: "/admision/alta
    ..METHOD: POST
    ...DESCRIPCION: La ruta recibe por body un atributo id_Admision donde el mismo es utilizado para dar de ALTA un registro en la base de datos. Una vez concluido dicho procesos el controlador envia una confirmacion mediante un archivo JSON.



# Descripcion de dependencias
    .bootstrap: Se utiliza para dar estilos a la pagina web.
    .bootstrap-icons: Es una biblioteca de iconos para bootstrap, se utiliza para colocar iconos en las vistas pug.
    .Morgan: Es un middleware de registros de solicitudes HTTP para Nodejs, permite mostrar en el log las peticiones entrantes y salientes por metodo, ruta y status.
    .reflect-metadata: Le permite a typescript trabajar con decoradores.
    


    