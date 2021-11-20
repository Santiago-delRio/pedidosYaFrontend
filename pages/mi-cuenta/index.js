import Image from 'next/image'
import { useRef, useState } from 'react'
import axios from 'axios';
import Sidebar from "../../components/DatosCuentaSidebar"
import miCuentaStyles from "./miCuenta.module.scss"

const MiCuenta = () => {

    const imagenLogo = useRef()
    const [imagenSubida, setImagenSubida] = useState()

    const guardarCambios = () =>{

        let formData = new FormData()

        formData.append("logo" , imagenLogo.current.files[0])
        console.log(formData)

        const subirImagen = async () =>{
            const respuesta = await axios.put('http://localhost:1337/restaurante', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).catch(function (error) {
                console.log(error);
            });

            console.log(respuesta.data)
        }

        subirImagen()
    }

    return (
        <div className={miCuentaStyles.miCuentaContainer}>
            <Sidebar />
            <div className={miCuentaStyles.misDatos}>
                <h1>Mis datos</h1>
                <div className={miCuentaStyles.datos}>
                    <label>Nombre</label>
                    <p>nombre</p>
                    <label>Dirección</label>
                    <p>la direcicon</p>
                    <label>Horarios</label>
                    <p>nombre</p>
                    <label>Logo del local</label>
                    <input type="file" ref={imagenLogo}/>
                    <div className={registroStyles.logoContainer}>
                        <Image src={} alt="Logo pedidosYa" layout={'responsive'} width="500px" height="500px" quality="90"/>
                    </div>
                    <button onClick={()=>{guardarCambios()}}>Guardar cambios</button>
                </div>
            </div>
        </div>
    );
}
 
export default MiCuenta;