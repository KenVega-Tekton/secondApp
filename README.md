## App comidas : Aplicación para restaurantes

* Requerimientos funcionales:
  * Logueo con correo de la empresa. (validar que el correo contenga la palabra tekton. Ej. postulante@tektontest.com).
  * Administrar información de empleados (3 tipos: admin, cajero y chef).
* Roles:
  * Cajero
    "Registrar ordenes (lista de platos que se ordenan por cliente)"
  * Chef
    "Marcar ordenes como listos"
  * Admin
    * Flujo de Caja
    * Ver ordenes y sus estados
    * Reporte de Ordenes
* Características de las Ordenes
  * Estado ( Comanda, En proceso, Terminado )
  * Deben tener el nombre del cliente
  * Fecha y Hora de creación de la orden
  * Tipo de Pago de la orden (Tarjeta o Efectivo)
  * Monto total de la orden
  * Detalle de orden ( lista de platos, cada uno con su precio)
* Consideraciones:
  * Backend de la aplicación en NodeJS y front en ReactJS.
  * Usar PostgreSQL / MySQL / MongoDB
  * Es libre de usar algún framework para CSS ( Bootstrap, Bulma, Foundation ).
  * Testing básico Jest / Mocha / Sinon.
  * El criterio del postulante será el punto más importante a evaluar.
