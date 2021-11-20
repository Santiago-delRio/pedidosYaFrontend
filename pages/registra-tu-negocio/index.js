import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import axios from 'axios';
import logo from "../../assets/imagenes/LogoBlanco.svg"
import registroStyles from "./registroNegocio.module.scss"


const RegistroNegocio = () => {

    const router = useRouter()

    //======= Refs
    const inputNombreLocal = useRef()
    const inputDireccion = useRef()
    const inputUsuario = useRef()
    const inputContraseña = useRef()

    //======= States
    const [inputNombreLocalVacio, setInputNombreLocalVacio] = useState()
    const [inputDireccionVacio, setInputDireccionVacio] = useState()
    const [inputUsuarioVacio, setInputUsuarioVacio] = useState()
    const [inputContraseñaVacio, setInputContraseñaVacio] = useState()

    // Enviar formulario
    const enviarFormulario = (event) =>{
        event.preventDefault()
        
        let camposVacios = false

        // Verificar que no se hayan dejado campos sin completar
        if( inputNombreLocal.current.value == ""){
            setInputNombreLocalVacio(true)
            camposVacios = true
        }
        if( inputDireccion.current.value == ""){
            setInputDireccionVacio(true)
            camposVacios = true
        }
        if( inputUsuario.current.value == ""){
            setInputUsuarioVacio(true)
            camposVacios = true
        }
        if( inputContraseña.current.value == ""){
            setInputContraseñaVacio(true)
            camposVacios = true
        }

        //Alertar de los campos vacios
        if(camposVacios == true){
            alert("Error - No puede dejar los campos resaltados sin completar")
            return 
        }
        
        const datosRestaurante = {
            nombreLocal: inputNombreLocal.current.value,
            direccion: inputDireccion.current.value,
            usuario: inputUsuario.current.value,
            contraseña: inputContraseña.current.value,
        }

        const subirRestaurante = async () =>{
            const respuesta = await axios.post('http://localhost:1337/restaurantes', datosRestaurante, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).catch(function (error) {
                console.log(error);
            });

            //Ya existe el local
            if(respuesta.data == "localExiste"){
                alert("El nombre del local ya está registrado")
                return
            }
            //Ya existe el usuario
            if(respuesta.data == false){
                alert("El nombre de usuario ya está registrado")
                return
            }

            //Se registro el local
            alert("Registro exitoso")
            //Refrescar la pagina
            router.reload(window.location.pathname)
            
        }
        subirRestaurante()
    }

    return (
        <div className={registroStyles.registroNegocioContainer}>
            <div className={registroStyles.containerContent}>
                {/* Columna de texto */}
                <div className={registroStyles.textoHero}>
                    <div className={registroStyles.logoContainer}>
                        <Image src={logo} alt="Logo pedidosYa" layout={'responsive'} quality="90"/>
                    </div>
                    <div className={registroStyles.texto}>
                        <h1>¡Registra tu negocio!</h1>
                        <h2>Regístrate en simples pasos y empieza <br />
                            a hacer crecer tu negocio junto a <br />
                            nosotros
                        </h2>
                    </div>
                </div>
                {/* Formulario */}
                <form action="" onSubmit={()=>{enviarFormulario(event)}}>
                    <h3>Registro de tu local</h3>
                    {/* Nombre del local */}
                    <label>Nombre del local</label>
                    <input type="text" maxLength="75" ref={inputNombreLocal} className={(inputNombreLocalVacio) ? registroStyles.inputVacio : ""} onChange={()=>{
                        (inputNombreLocalVacio ? setInputNombreLocalVacio(false) : "")
                    }}/>
                    {/* Direccion */}
                    <label>Dirección</label>
                    <input type="text" maxLength="120" ref={inputDireccion} className={(inputDireccionVacio) ? registroStyles.inputVacio : ""} onChange={()=>{
                        (inputDireccionVacio ? setInputDireccionVacio(false) : "")
                    }}/>
                    {/* Usuario */}
                    <label>Usuario</label>
                    <input type="text" maxLength="25" ref={inputUsuario} className={(inputUsuarioVacio) ? registroStyles.inputVacio : ""} onChange={()=>{
                        (inputUsuarioVacio ? setInputUsuarioVacio(false) : "")
                    }}/>
                    {/* Contraseña */}
                    <label>Contraseña</label>
                    <input type="password" maxLength="128" ref={inputContraseña} className={(inputContraseñaVacio) ? registroStyles.inputVacio : ""} onChange={()=>{
                        (inputContraseñaVacio ? setInputContraseñaVacio(false) : "")
                    }}/>

                    {/* Enviar formulario */}
                    <input className={registroStyles.btnEnviar} type="submit" value="Enviar"/>
                </form>
            </div>
        </div>
    );
}
 
export default RegistroNegocio;