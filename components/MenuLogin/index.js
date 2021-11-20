import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import axios from 'axios';
import pBlanca from "../../assets/imagenes/pBlanca.svg"
import menuStyles from "./menuLogin.module.scss"

const MenuLogin = ({cerrarMenu}) => {

    const router = useRouter()

    //====== States
    //Abrir menu login para usuario o negocio -- Registrar usuario
    const [loginNegocio, setLoginNegocio] = useState()
    const [loginUsuario, setLoginUsuario] = useState()
    const [registroUsuario, setRegistroUsuario] = useState()
    //Animar label durante el login
    const [usuarioFocus, setUsuarioFocus] = useState()
    const [contraseñaFocus, setContraseñaFocus] = useState()
    const [nombreFocus, setNombreFocus] = useState()
    const [celularFocus, setCelularFocus] = useState()
    //Controlar que no se dejen campos sin completar
    const [inputUsuarioVacio, setInputUsuarioVacio] = useState()
    const [inputContraseñaVacio, setInputContraseñaVacio] = useState()
    const [inputNombreVacio, setInputNombreVacio] = useState()
    const [inputCelularVacio, setInputCelularVacio] = useState()

    //====== Refs
    const inputUsuario = useRef()
    const inputContraseña = useRef()
    const inputNombre = useRef()
    const inputCelular = useRef()


    const iniciarSesion = () =>{

        let camposVacios = false

        // Verificar que no se hayan dejado campos sin completar
        if( inputUsuario.current.value == ""){
            setInputUsuarioVacio(true)
            camposVacios = true
        }
        if( inputContraseña.current.value == ""){
            setInputContraseñaVacio(true)
            camposVacios = true
        }
        if(registroUsuario){
            if( inputNombre.current.value == ""){
                setInputNombreVacio(true)
                camposVacios = true
            }
            if( inputCelular.current.value == ""){
                setInputCelularVacio(true)
                camposVacios = true
            }
        }

        //Alertar de los campos vacios
        if(camposVacios == true){
            alert("Error - No puede dejar los campos resaltados sin completar")
            return 
        }

        let datosLogin = {
            usuario: inputUsuario.current.value,
            contraseña: inputContraseña.current.value
        }

        //Buscar credenciales del negocio en la base de datos
        const validarDatosNegocio = async () =>{
            const respuestaLogin = await axios.post('http://localhost:1337/restaurantes/login', datosLogin, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            //Confirmar si los datos eran correctos
            if(respuestaLogin.data == false){
                alert("El usuario y la contraseña no coinciden, intentelo de nuevo")
                return
            }else{
                alert("Inicio exitoso")
                //Cargar id del restaurante en el localStorge
                window.localStorage.setItem("idRestaurante", respuestaLogin.data[0].datosRestaurante)

                 //Refrescar la pagina
                router.push("/")
                router.reload(window.location.pathname)
                cerrarMenu(false)
            }
        }
        //Buscar credenciales del cliente en la base de datos
        const validarDatosCliente = async () =>{
            const respuestaLogin = await axios.post('http://localhost:1337/clientes/login', datosLogin, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            if(respuestaLogin.data == false){
                alert("El usuario y la contraseña no coinciden, intentelo de nuevo")
                return
            }else{ 
                // Cargar id del restaurante en el localStorge
                window.localStorage.setItem("idCliente", respuestaLogin.data[0].datosUsuario)
                alert("Inicio exitoso")

                //Refrescar la pagina
                router.reload(window.location.pathname)
            }
        }
        
        //Registrar nuevo usuario
        const registrarUsuario = async () =>{
            const respuestaLogin = await axios.post('http://localhost:1337/clientes', datosLogin, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            //Usuario ya esta registrado
            if(respuestaLogin.data == false){
                alert("El nombre de usuario ya está registrado")
                return
            }else{
                alert("Usuario registrado exitosamente")
                //Refrescar la pagina
                router.reload(window.location.pathname)
            }
        }

        //Validar datos para login negocio
        if(loginNegocio){
            validarDatosNegocio()
        }
        //Validar datos para login cliente
        if(loginUsuario){
            validarDatosCliente()
        }
        //Registrar nuevo usuario
        if(registroUsuario){
            datosLogin.nombre = inputNombre.current.value
            datosLogin.celular = inputCelular.current.value
            registrarUsuario()
        }
    }

    return (
        <div className={menuStyles.menuLogin}>
            {/* Menu elegir tipo de login */}
            <svg onClick={()=>{cerrarMenu(false)}} xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" ><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            <div className={menuStyles.logoContainer}>
                <Image src={pBlanca} alt="P de Pedidos Ya" layout={'responsive'} quality="100"/>
            </div>
            <h1>¡Te damos la bienvenida!</h1>
            <h3>¿Cómo querés continuar?</h3>    
            {/* Botones */}
            <button onClick={()=>{setLoginNegocio(true)}}>Iniciar sesión como negocio</button>
            <button onClick={()=>{setLoginUsuario(true)}}>Iniciar sesión como cliente</button>
            <button onClick={()=>{setRegistroUsuario(true)}}>Registrarse como cliente</button>

            {/* Menu login - ingresar datos */}
            {(loginNegocio || loginUsuario || registroUsuario) ? 
                <div className={menuStyles.loginDatos}>
                    {/* Flecha volver atras y titulo */}
                    <h2>
                        {/* Cerrar el login/registro, cancelar las animaciones de las label y los avisos de campos sin completar */}
                        <svg onClick={()=>{setLoginNegocio(false), setLoginUsuario(false), setRegistroUsuario(false), setContraseñaFocus(false), setUsuarioFocus(false), setNombreFocus(false), setCelularFocus(false), setInputUsuarioVacio(false), setInputContraseñaVacio(false), setInputNombreVacio(false), setInputCelularVacio(false)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2b1a46" viewBox="0 0 16 16"><path d="M28.927-238.385c0 50.863-42.919 92.243-95.679 92.243H-330.75l-119.21 385.144h-29.11l-.934-.292 128.044-413.648h285.208c36.891 0 66.905-28.465 66.905-63.447zm133.068 0c0 59.718-23.822 115.852-67.086 158.042C51.739-38.236-5.631-15.047-66.634-15.047H-236.85L-316.067 239h-30.193l88.197-282.844h191.429c53.435 0 103.648-20.282 141.403-57.103 37.657-36.732 58.4-85.543 58.4-137.44zM95.99-238c.01.247.01.499.01.756 0 42.601-16.96 82.644-47.768 112.731-30.705 30.008-71.51 46.53-114.894 46.53H-284.76L-382.893 239H-413l107.044-345.757h239.294c73.836 0 133.908-58.54 133.908-130.487 0-.257-.005-.509-.01-.756zM6.084 8l4.458 4.458a.625.625 0 01-.884.884l-4.9-4.9a.625.625 0 010-.884l4.9-4.9a.625.625 0 01.884.884L6.084 8z"></path></svg>
                        {(loginNegocio) ?  "Iniciá sesión como negocio" : ""}
                        {(loginUsuario) ?  "Iniciá sesión como cliente" : ""}
                        {(registroUsuario) ?  "Registro de un nuevo cliente" : ""}
                    </h2>
                    {/* Formulario */}
                    <form action="">
                        {/* Titulo formulario */}
                        <h3>Ingresá tus datos</h3>
                        {/* Usuario */}
                        <label className={(usuarioFocus) ? menuStyles.inputActivo : ""}>Usuario</label>
                        <input type="text" maxLength="25" ref={inputUsuario} className={(inputUsuarioVacio) ? menuStyles.inputVacio : ""} onFocus={()=>{setUsuarioFocus(true)}} onBlur={()=>{
                            if(event.target.value == ""){
                                setUsuarioFocus(false)
                            }else{ return }
                        }} onChange={()=>{
                            (inputUsuarioVacio ?  setInputUsuarioVacio(false) : "" )
                        }}/>
                        {/* Contraseña */}
                        <label className={(contraseñaFocus) ? menuStyles.inputActivo : ""}>Contraseña</label>
                        <input type="password" maxLength="128" ref={inputContraseña} className={(inputContraseñaVacio) ? menuStyles.inputVacio : ""} onFocus={()=>{setContraseñaFocus(true)}} onBlur={()=>{
                            if(event.target.value == ""){
                                setContraseñaFocus(false)
                            }else{ return }
                        }} onChange={()=>{
                            (inputContraseñaVacio ?  setInputContraseñaVacio(false) : "" )
                        }}/>
                        {/* Especificos para registro */}
                        {(registroUsuario) ? 
                            <>  
                                {/* Nombre */}
                                <label className={(nombreFocus) ? menuStyles.inputActivo : ""}>Nombre</label>
                                <input type="text" maxLength="70"ref={inputNombre} className={(inputNombreVacio) ? menuStyles.inputVacio : ""} onFocus={()=>{setNombreFocus(true)}} onBlur={()=>{
                                    if(event.target.value == ""){
                                        setNombreFocus(false)
                                    }else{ return }
                                }} onChange={()=>{
                                    (inputNombreVacio ?  setInputNombreVacio(false) : "" )
                                }}/>
                                {/* Celular */}
                                <label className={(celularFocus) ? menuStyles.inputActivo : ""}>Celular</label>
                                <input type="number" ref={inputCelular} className={(inputCelularVacio) ? menuStyles.inputVacio : ""} onFocus={()=>{setCelularFocus(true)}} onBlur={()=>{
                                    if(event.target.value == ""){
                                        setCelularFocus(false)
                                    }else{ return }
                                }} onChange={()=>{
                                    (inputCelularVacio ?  setInputCelularVacio(false) : "" )
                                }}/>
                            </>
                        : ""}
                    </form>
                    {/* Boton continuar */}
                    <div className={menuStyles.btnContinuarContainer}>
                        <button onClick={()=>{iniciarSesion()}}>Continuar</button>
                    </div>
                </div>
            : ""}
        </div>
    );
}
 
export default MenuLogin;