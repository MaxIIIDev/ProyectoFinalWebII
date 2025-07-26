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
# 5.1 - RUTAS DE ADMISION
    .RUTA:"/admision/" 
    ..METHOD:GET 
    ...DESCRIPCION -> Dicha ruta renderiza la vista principal de admisiones.
    
    .RUTA: "/admision/logout" 
    ..METHOD:GET 
    ...DESCRIPCION -> Dicha ruta cierra la sesion del usuario y redirecciona a la ruta "/auth/login".

    .RUTA: "/admision/emergencia" 
    ..METHOD:GET 
    ...Descripcion: Dicha ruta renderiza la vista de admisiones de emergencia.
    
    .RUTA : "/admision/emergencia/habitacion 
    ..METHOD: POST 
    ...DESCRIPCION -> Dicha ruta recibe por body el genero,   id_motivo_de_Internacion,id_cama y se encarga crear un paciente "NN", lo registra como paciente en base de datos, y luego genera la admision en    base de datos del mismo y al finalizar renderiza la vista "habitacion. pug" para mostrar los datos del registro.
    

    .RUTA: "/admision/principal/paciente"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta  se encarga de renderizar la vista principal del panel de pacientes "principal.pug", donde la misma valida que exista un req.session del paciente para el ingreso.

    .RUTA: "/admision/camas"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de camas tanto disponibles como no disponibles filtrando por ala.

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

    .RUTA: "/admision/view/admitir/por/turno
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para admitir un paciente por turno.

    .RUTA: "/admision/admitir/por/turno
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos necesarios para poder realizar el registro de una admision en base de datos. Luego de un proceso de validaciones el controlador realiza el registro en base de datos y una vez finalizado el proceso redirecciona a la ruta "/admision/principal/paciente".

    .RUTA: "/admision/get/turnos
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para listar todos los turnos.

    .RUTA: "/admision/get/turnos/paciente
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para listar todos los turnos del paciente.

    .RUTA: "/admision/create/turno/paciente
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para crear un turno para el paciente.

    .RUTA: "/admision/update/turno/paciente
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para actualizar un turno para el paciente.

    .RUTA: "/admision/get/all/turnos/by/date
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta retorna una lista de turnos filtrados por fecha mediante formato json.

    .RUTA: "/admision/crear/turno
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos necesarios para poder realizar el registro de un turno en base de datos. Luego de un proceso de validaciones el controlador realiza el registro en base de datos y una vez finalizado el proceso redirecciona a la ruta "/admision/get/turnos/paciente".
    
    .RUTA: "/admision/actualizar/turno
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos necesarios para poder realizar la actualizacion de un turno en base de datos. Luego de un proceso de validaciones el controlador realiza la actualizacion en base de datos y una vez finalizado el proceso redirecciona a la ruta "/admision/get/turnos/paciente".
    
    .RUTA: "/admision/delete/turno
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_turno y lo utiliza para eliminar un turno en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/admision/get/turnos/paciente".

    .RUTA: "/admision/marcar/disponible
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Cama y lo utiliza para marcar una cama como disponible en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/admision/camas" enviando un mensaje de confirmacion.

# 5.2 - RUTAS DE ENFERMERIA
    .RUTA: "/enfermeria/"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista principal de enfermeria.

    .RUTA: "/enfermeria/logout"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta cierra la sesion del usuario y redirecciona a la ruta "/auth/login".

    .RUTA: "/enfermeria/view/lista/admisiones"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de lista de admisiones activas.

    .RUTA: "/enfermeria/view/paciente"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de paciente seleccionado.

    .RUTA: "/enfermeria/view/actualizar/paciente"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar paciente seleccionado.

    .RUTA: "/enfermeria/view/historial/paciente"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial medico del paciente seleccionado.

    .RUTA: "/enfermeria/view/alergias/paciente"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de alergias del paciente seleccionado.

    .RUTA: "/enfermeria/view/crear/alergia"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de crear alergia del paciente seleccionado.

    .RUTA: "/enfermeria/view/actualizar/alergia"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar alergia del paciente seleccionado.

    .RUTA: "/enfermeria/view/crear/tratamiento/alergia"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de crear tratamiento alergia del paciente seleccionado.

    .RUTA: "/enfermeria/view/actualizar/tratamiento/alergia"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar tratamiento alergia del paciente seleccionado.

    .RUTA: "/enfermeria/view/medicacion/actual"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de medicacion actual del paciente seleccionado.

    .RUTA: "/enfermeria/view/crear/medicacion/actual"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de crear medicacion actual del paciente seleccionado.

    .RUTA: "/enfermeria/view/editar/medicacion/actual"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de editar medicacion actual del paciente seleccionado.

    .RUTA: "/enfermeria/view/antecedentes/familiares"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de antecedentes familiares del paciente seleccionado.

    .RUTA: "/enfermeria/view/crear/antecedentes/familiares"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de crear antecedentes familiares del paciente seleccionado.

    .RUTA: "/enfermeria/view/actualizar/antecedentes/familiares"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar antecedentes familiares del paciente seleccionado.

    .RUTA: "/enfermeria/eliminar/antecedentes/familiares"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Antecedente_Familiar y lo utiliza para eliminar un antecedente familiar en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/enfermeria/view/antecedentes/familiares" enviando un mensaje de confirmacion.

    .RUTA: "/enfermeria/view/cirugias"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de cirugias del paciente seleccionado.

    .RUTA: "/enfermeria/view/crear/cirugia"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de crear cirugia del paciente seleccionado.

    .RUTA: "/enfermeria/view/actualizar/cirugia"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar cirugia del paciente seleccionado.

    .RUTA: "/enfermeria/eliminar/cirugia"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Cirugia y lo utiliza para eliminar una cirugia en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/enfermeria/view/cirugias" enviando un mensaje de confirmacion.

    .RUTA: "/enfermeria/view/diagnosticos"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de diagnosticos del paciente seleccionado.

    .RUTA: "/enfermeria/view/tratamientos/diagnostico"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de tratamientos diagnostico del paciente seleccionado.

    .RUTA: "/enfermeria/view/evaluaciones/fisicas"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de evaluaciones fisicas del paciente seleccionado.

    .RUTA: "/enfermeria/view/lista/all/evaluacion/fisica"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de lista de todas las evaluaciones fisicas del paciente seleccionado.

    .RUTA: "/enfermeria/view/crear/evaluacion/fisica"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de crear evaluacion fisica del paciente seleccionado.

    .RUTA: "/enfermeria/view/actualizar/evaluacion/fisica"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar evaluacion fisica del paciente seleccionado.

    .RUTA: "/enfermeria/eliminar/evaluacion/fisica"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Evaluacion_Fisica y lo utiliza para eliminar una evaluacion fisica en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/enfermeria/view/evaluaciones/fisicas" enviando un mensaje de confirmacion.

    .RUTA: "/enfermeria/view/internacion"
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de internacion del paciente seleccionado.

    .RUTA: "/enfermeria/sintomas/paciente
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de sintomas del paciente seleccionado.

    .RUTA: "/enfermeria/view/historial/sintomas/paciente
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de sintomas del paciente seleccionado.

    .RUTA: "/enfermeria/view/crear/sintoma
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de crear sintoma del paciente seleccionado.

    .RUTA: "/enfermeria/view/actualizar/sintoma
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar sintoma del paciente seleccionado.

    .RUTA: "/enfermeria/eliminar/sintoma
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Sintoma y lo utiliza para eliminar un sintoma en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/enfermeria/sintomas/paciente" enviando un mensaje de confirmacion.

    .RUTA: "/enfermeria/view/establecer/prioridad
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para establecer prioridad del paciente seleccionado.

    .RUTA: "/enfermeria/view/plan/premilinar
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista para establecer plan preliminar del paciente seleccionado.

    .RUTA: "/enfermeria/view/tratamientos/prescritos
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de tratamientos prescritos del paciente seleccionado.

    .RUTA: "/enfermeria/view/tratamientos/prescritos/historial
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de tratamientos prescritos del paciente seleccionado.

    .RUTA: "/enfermeria/view/crear/tratamiento/prescrito
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de crear tratamiento prescrito del paciente seleccionado.

    .RUTA: "/enfermeria/view/actualizar/tratamiento/prescrito
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar tratamiento prescrito del paciente seleccionado.

    .RUTA: "/enfermeria/eliminar/tratamiento/prescrito
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Tratamiento_Prescrito y lo utiliza para eliminar un tratamiento prescrito en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/enfermeria/view/tratamientos/prescritos" enviando un mensaje de confirmacion.

    .RUTA: "/enfermeria/actualizar/paciente
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar del paciente solicitado, posteriormente son validados y si no hay errores son actualizados los datos del paciente en la base de datos. Finalizado el proceso el paciente actualizado es guardado en la session.

    .RUTA: "/enfermeria/crearAlergia
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear del alergia solicitada, posteriormente son validados y si no hay errores son creados los datos del alergia en la base de datos. Finalizado el proceso el alergia creado es guardado en la session.

    .RUTA: "/enfermeria/actualizarAlergia
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar del alergia solicitada, posteriormente son validados y si no hay errores son actualizados los datos del alergia en la base de datos. Finalizado el proceso el alergia actualizado es guardado en la session.

    .RUTA: "/enfermeria/eliminarAlergia
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Alergia y lo utiliza para eliminar un alergia en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/enfermeria/view/alergias/paciente" enviando un mensaje de confirmacion.

    .RUTA: "/enfermeria/crear/Tratamiento/Para/Alergia
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear del tratamiento para alergia solicitada, posteriormente son validados y si no hay errores son creados los datos del tratamiento para alergia en la base de datos. 

    .RUTA: "/enfermeria/actualizar/Tratamiento/Para/Alergia
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar del tratamiento para alergia solicitada, posteriormente son validados y si no hay errores son actualizados los datos del tratamiento para alergia en la base de datos. 

    .RUTA: "/enfermeria/eliminar/tratamiento/alergia
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Tratamiento_Para_Alergia y lo utiliza para eliminar un tratamiento para alergia en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/enfermeria/view/alergias/paciente" enviando un mensaje de confirmacion.

    .RUTA: "/enfermeria/crear/medicacion/actual
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear de la medicacion actual solicitada, posteriormente son validados y si no hay errores son creados los datos de la medicacion actual en la base de datos.

    .RUTA: "/enfermeria/actualizar/medicacion/actual
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar de la medicacion actual solicitada, posteriormente son validados y si no hay errores son actualizados los datos de la medicacion actual en la base de datos.

    .RUTA: "/enfermeria/eliminar/medicacion/actual
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Medicacion_Actual y lo utiliza para eliminar una medicacion actual en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/enfermeria/view/medicacion/actual" enviando un mensaje de confirmacion.

    .RUTA: "/enfermeria/crear/antecedentes/familiares
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear de los antecedentes familiares solicitada, posteriormente son validados y si no hay errores son creados los datos de los antecedentes familiares en la base de datos.

    .RUTA: "/enfermeria/actualizar/antecedentes/familiares
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar de los antecedentes familiares solicitada, posteriormente son validados y si no hay errores son actualizados los datos de los antecedentes familiares en la base de datos.

    .RUTA: "/enfermeria/crear/cirugia
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear de la cirugia solicitada, posteriormente son validados y si no hay errores son creados los datos de la cirugia en la base de datos.

    .RUTA: "/enfermeria/actualizar/cirugia
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar de la cirugia solicitada, posteriormente son validados y si no hay errores son actualizados los datos de la cirugia en la base de datos.

    .RUTA: "/enfermeria/crear/evaluacion/fisica
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear de la evaluacion fisica solicitada, posteriormente son validados y si no hay errores son creados los datos de la evaluacion fisica en la base de datos.

    .RUTA: "/enfermeria/actualizar/evaluacion/fisica
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar de la evaluacion fisica solicitada, posteriormente son validados y si no hay errores son actualizados los datos de la evaluacion fisica en la base de datos.

    .RUTA: "/enfermeria/crear/sintoma
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear del sintoma solicitado, posteriormente son validados y si no hay errores son creados los datos del sintoma en la base de datos.

    .RUTA: "/enfermeria/actualizar/sintoma
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar del sintoma solicitado, posteriormente son validados y si no hay errores son actualizados los datos del sintoma en la base de datos.

   
    .RUTA: "/enfermeria/establecer/prioridad
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a establecer la prioridad solicitada, posteriormente son validados y si no hay errores se establece la prioridad en la base de datos.

    .RUTA: "/enfermeria/crear/tratamiento/prescritos
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear del tratamiento prescrito solicitado, posteriormente son validados y si no hay errores son creados los datos del tratamiento prescrito en la base de datos.

    .RUTA: "/enfermeria/actualizar/tratamiento/prescritos
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar del tratamiento prescrito solicitado, posteriormente son validados y si no hay errores son actualizados los datos del tratamiento prescrito en la base de datos.

# 5.3 - RUTAS DE MEDICOS

    .RUTA: "/medicos
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de inicio del medico.

    .RUTA: "/medicos/lista/admisiones
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de lista de admisiones del medico.

    .RUTA: "/medicos/view/paciente/seleccionado
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de paciente seleccionado.

    .RUTA: "/medicos/view/diagnosticos
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de diagnosticos del medico.

    .RUTA: "/medicos/view/diagnostico/registrar
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de registrar diagnostico del medico.

    .RUTA: "/medicos/view/diagnostico/actualizar
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar diagnostico del medico.

    .RUTA: "/medicos/view/pruebas/diagnosticas
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de pruebas diagnosticas del medico.

    .RUTA: "/medicos/view/pruebas/diagnosticas/registrar
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de registrar pruebas diagnosticas del medico.

    .RUTA: "/medicos/view/pruebas/diagnosticas/actualizar
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar pruebas diagnosticas del medico.

    .RUTA: "/medicos/view/tratamientos/diagnostico
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de tratamientos diagnostico del medico.

    .RUTA: "/medicos/view/tratamientos/diagnostico/registrar
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de registrar tratamientos diagnostico del medico.

    .RUTA: "/medicos/view/tratamientos/diagnostico/actualizar
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar tratamientos diagnostico del medico.

    .RUTA: "/medicos/view/historial 
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial del medico.

    .RUTA: "/medicos/view/historial/alergias    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de alergias del medico.

    .RUTA: "/medicos/view/historial/medicamentos/actuales    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de medicamentos actuales del medico.

    .RUTA: "/medicos/view/historial/antecedentes/familiares    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de antecedentes familiares del medico.

    .RUTA: "/medicos/view/historial/cirugias    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de cirugias del paciente.

    .RUTA: "/medicos/view/evaluacion/fisica
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de evaluacion fisica del paciente.

    .RUTA: "/medicos/view/historial/evaluacion/fisica    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de evaluacion fisica del paciente.

    .RUTA: "/medicos/view/tratamientos    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de tratamientos del medico.
    
    .RUTA: "/medicos/view/tratamientos/prescritos/historial    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de tratamientos prescritos del paciente.

    .RUTA: "/medicos/view/crear/tratamiento/prescrito    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de crear tratamiento prescrito del medico.    

    .RUTA: "/medicos/view/actualizar/tratamiento/prescrito    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar tratamiento prescrito del medico.    

    .RUTA: "/medicos/view/eliminar/tratamiento/prescrito    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de eliminar tratamiento prescrito del medico.    

    .RUTA: "/medicos/view/sintomas    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de sintomas del medico.

    .RUTA: "/medicos/view/historial/sintomas    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de sintomas del paciente.

    .RUTA: "/medicos/view/seccion/alta/paciente    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de seccion de alta del paciente.

    .RUTA: "/medicos/view/lista/recetas/medicas    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de lista de recetas medicas del medico.

    .RUTA: "/medicos/view/alta/historial/recetas    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de recetas medicas del paciente.

    .RUTA: "/medicos/view/alta/receta/medicamentos    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de receta medicamentos del medico.

    .RUTA: "/medicos/view/alta/receta/medicamentos/historial    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de receta medicamentos del paciente.

    .RUTA: "/medicos/view/alta/receta/medicamentos/crear    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de crear receta medicamentos del medico.

    .RUTA: "/medicos/view/alta/receta/medicamentos/actualizar    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de actualizar receta medicamentos del medico.

    .RUTA: "/medicos/view/alta/recomendacion/seguimiento    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de recomendacion de seguimiento del medico.

    .RUTA: "/medicos/view/seccion/final/altas    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de seccion final de altas del medico.

    .RUTA: "/medicos/view/historial/altas    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de historial de altas del paciente.

    .RUTA: "/medicos/view/alta/final    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de alta final del medico.

    .RUTA: "/medicos/view/alta/final/datos    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de alta final datos del medico.

    .RUTA: "/medicos/view/imprimir/alta    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de imprimir alta del medico.


    .RUTA: "/medicos/crear/tratamiento/prescrito    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear del tratamiento prescrito solicitado, posteriormente son validados y si no hay errores son creados los datos del tratamiento prescrito en la base de datos.

    .RUTA: "/medicos/actualizar/tratamiento/prescrito    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar del tratamiento prescrito solicitado, posteriormente son validados y si no hay errores son actualizados los datos del tratamiento prescrito en la base de datos.

    .RUTA: "/medicos/crear/diagnostico    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear del diagnostico solicitado, posteriormente son validados y si no hay errores son creados los datos del diagnostico en la base de datos.

    .RUTA: "/medicos/actualizar/diagnostico    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar del diagnostico solicitado, posteriormente son validados y si no hay errores son actualizados los datos del diagnostico en la base de datos.

    .RUTA: "/medicos/eliminar/diagnostico    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Diagnostico y lo utiliza para eliminar un diagnostico en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/medicos/view/diagnosticos" enviando un mensaje de confirmacion.

    .RUTA: "/medicos/crear/prueba/diagnostica    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear de la prueba diagnostica solicitada, posteriormente son validados y si no hay errores son creados los datos de la prueba diagnostica en la base de datos.

    .RUTA: "/medicos/actualizar/prueba/diagnostica    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar de la prueba diagnostica solicitada, posteriormente son validados y si no hay errores son actualizados los datos de la prueba diagnostica en la base de datos.

    .RUTA: "/medicos/eliminar/prueba/diagnostica    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Prueba_Diagnostica y lo utiliza para eliminar una prueba diagnostica en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/medicos/view/pruebas/diagnosticas" enviando un mensaje de confirmacion.

    .RUTA: "/medicos/crear/tratamiento/diagnostico    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear del tratamiento diagnostico solicitado, posteriormente son validados y si no hay errores son creados los datos del tratamiento diagnostico en la base de datos.

    .RUTA: "/medicos/actualizar/tratamiento/diagnostico    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar del tratamiento diagnostico solicitado, posteriormente son validados y si no hay errores son actualizados los datos del tratamiento diagnostico en la base de datos.

    .RUTA: "/medicos/eliminar/tratamiento/diagnostico    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Tratamiento_Diagnostico y lo utiliza para eliminar un tratamiento diagnostico en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/medicos/view/tratamientos/diagnostico" enviando un mensaje de confirmacion.

    .RUTA: "/medicos/registrar/medicamento/en/receta    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear del medicamento en receta solicitado, posteriormente son validados y si no hay errores son creados los datos del medicamento en receta en la base de datos.

    .RUTA: "/medicos/actualizar/medicamento/en/receta    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar del medicamento en receta solicitado, posteriormente son validados y si no hay errores son actualizados los datos del medicamento en receta en la base de datos.

    .RUTA: "/medicos/eliminar/medicamento/en/receta    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Medicamento_En_Receta y lo utiliza para eliminar un medicamento en receta en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/medicos/view/medicamentos/en/receta" enviando un mensaje de confirmacion.

    .RUTA: "/medicos/crear/receta    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a crear de la receta solicitada, posteriormente son validados y si no hay errores son creados los datos de la receta en la base de datos.

    .RUTA: "/medicos/eliminar/receta    
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta recibe por query un atributo id_Receta y lo utiliza para eliminar una receta en base de datos. Una vez finalizado el proceso redirecciona a la ruta "/medicos/view/recetas" enviando un mensaje de confirmacion.

    .RUTA: "/medicos/actualizar/recomendacion/seguimiento    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos a actualizar de la recomendacion de seguimiento solicitada, posteriormente son validados y si no hay errores son actualizados los datos de la recomendacion de seguimiento en la base de datos.

    .RUTA: "/medicos/dar/alta    
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta da de alta a un paciente en base de datos.
    
# 5.4 - RUTAS DE AUTH

    .RUTA: "/login" 
    ..METHOD: GET
    ...DESCRIPCION: Dicha ruta renderiza la vista de login.

    .RUTA: "/login" 
    ..METHOD: POST
    ...DESCRIPCION: Dicha ruta recibe por body los atributos para iniciar sesion, posteriormente son validados y si no hay errores se inicia sesion, guardando los datos del usuario en la sesion.

    
# 6 - DEPENDENCIAS
    .bootstrap: Se utiliza para dar estilos a la pagina web.
    .bootstrap-icons: Es una biblioteca de iconos para bootstrap, se utiliza para colocar iconos en las vistas pug.
    .Morgan: Es un middleware de registros de solicitudes HTTP para Nodejs, permite mostrar en el log las peticiones entrantes y salientes por metodo, ruta y status.
    .reflect-metadata: Le permite a typescript trabajar con decoradores.
    .dotenv: Se utiliza para cargar variables de entorno desde un archivo .env.
    .mysql2: Es una biblioteca de MySQL para Nodejs, se utiliza para conectarse a la base de datos.
    .pdfkit: Es una biblioteca de PDF para Nodejs, se utiliza para generar PDFs.
    


    