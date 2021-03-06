import Image from 'next/image'
import Link from "next/link"
import { useEffect, useState } from 'react'
import sidebarStyles from "./datosCuentaSidebar.module.scss"

const DatosCuentaSidebar = () => {

    //Poner imagen de perfil default
    const [ logoCuenta, setLogoCuenta] = useState("http://137.184.217.46:1337/imagenPerfilDefault.png")

    //Logeado?
    const [logeadoCliente, setLogeadoCliente] = useState()
    const [logeadoRestaurante, setLogeadoRestaurante] = useState()

    useEffect(()=>{

        //Si hay un logo cargado usarlo
        if(window.localStorage.logo != "null" && window.localStorage.logo != undefined){
            setLogoCuenta(window.localStorage.logo)
        }

        //Logeado como cliente
        if(window.localStorage.idCliente){
            setLogeadoCliente(true)
        }
        //Logeado como restaurante
        if(window.localStorage.idRestaurante){
            setLogeadoRestaurante(true)
        }
        
    },[])
    return (
        <div className={sidebarStyles.sidebarContainer}>
            <div className={sidebarStyles.avatar}>
                <Image src={logoCuenta} alt="Imagen de perfil" layout={'responsive'} width="500px" height="500px" quality="90" priority="true"/>
            </div>
            <ul>
                <li>
                    <Link href="/">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2b1a46" viewBox="0 0 16 16"><path d="M7.043 1.525l-4.686 4.22a1.65 1.65 0 00-.489 1.172v6.658c0 .717.567 1.289 1.282 1.289h3.301l.09-.008a.501.501 0 00.41-.492v-3.681h2.097v3.68a.5.5 0 00.5.5h3.302c.715 0 1.282-.571 1.282-1.288V6.902c0-.434-.179-.86-.49-1.173L8.96 1.513a1.388 1.388 0 00-1.917.012zm1.236.72l4.674 4.208a.668.668 0 01.179.449v6.673l-.007.068a.276.276 0 01-.275.22h-2.802v-3.207a.963.963 0 00-.969-.973H6.921l-.115.006a.963.963 0 00-.855.967v3.207h-2.8a.278.278 0 01-.283-.288V6.917a.65.65 0 01.2-.468l4.656-4.193a.397.397 0 01.555-.01z"></path></svg>
                            Inicio
                        </a>
                    </Link>
                </li>
                {(logeadoRestaurante) ? 
                    <li>
                        <Link href="/mi-cuenta">
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2b1a46" viewBox="0 0 16 16"><path d="M6.197 8.704a.5.5 0 01-.138.693c-.42.282-1.37.733-2.352.988l-.241.059-.138.048a1.166 1.166 0 00-.7.736c-.07.203-.101.387-.117.651l-.01.236v-.002l-.001.169c.003.264.03.554.08.73l.011.027.043.024c.232.125.642.303 1.176.479l.206.066c1.162.359 2.498.574 3.988.574 1.518 0 2.873-.223 4.048-.594a9.648 9.648 0 001.033-.388l.26-.123.072-.039.008-.024c.048-.177.073-.478.075-.755v-.133l-.003-.058c-.013-.376-.04-.594-.125-.836a1.155 1.155 0 00-.7-.737l-.144-.05c-1.05-.236-2.108-.73-2.584-1.043a.5.5 0 11.549-.835c.353.231 1.192.628 2.073.859l.25.061c.775.233 1.262.737 1.5 1.414.11.313.152.575.172.951l.011.263c.01.49-.028 1.012-.182 1.373a.853.853 0 01-.365.398l-.253.132c-.326.16-.766.34-1.346.524-1.27.4-2.726.64-4.349.64-1.594 0-3.029-.231-4.284-.619-.78-.241-1.372-.506-1.66-.675a.836.836 0 01-.366-.396c-.14-.31-.19-.742-.194-1.163v-.209l.004-.089c.016-.473.052-.77.182-1.136a2.165 2.165 0 011.316-1.348l.226-.075.019-.004c.929-.208 1.896-.66 2.256-.902a.5.5 0 01.694.138zM8.03.8c1.791.037 3.131.97 3.24 3.197l-.004-.045.013.095c.022.218.03.575.009.964l-.013.196-.02.199c-.11 1.012-.42 1.885-1.012 2.51-.555.588-1.294.876-2.227.884l-.268-.008c-.822-.05-1.487-.338-1.99-.875-.59-.623-.902-1.496-1.014-2.51a7.675 7.675 0 01-.034-1.275l.014-.108v-.021l.02-.261C4.93 1.713 6.2.862 7.799.803zm-.02 1h-.033c-1.27 0-2.17.58-2.25 2.197l-.032.264c-.08.75.084 2.051.653 2.807l.137.163c.353.376.832.563 1.495.569l.227-.007c.569-.038.987-.223 1.31-.563.726-.768.89-2.27.761-3.132-.011-.051-.013-.063-.01-.07-.076-1.6-.937-2.2-2.259-2.228z"></path></svg>
                                Mi cuenta
                            </a>
                        </Link>
                    </li>
                : ""}
                <li>
                    <Link href="/mis-pedidos">
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2b1a46" viewBox="0 0 16 16"><path d="M12.55 1.136c.64 0 1.2.445 1.2 1.057v11.635c0 .334-.222.61-.532.723a.922.922 0 01-.827-.098l-1.609-1.096-2.316 1.38a.924.924 0 01-.822.056l-.11-.055-2.317-1.381-1.608 1.096a.917.917 0 01-.708.132l-.12-.034c-.31-.114-.531-.39-.531-.723V2.193c0-.612.56-1.057 1.2-1.057zm0 1h-9.1c-.132 0-.2.054-.2.057v11.294l1.669-1.136a.5.5 0 01.45-.057l.087.041L8 13.851l2.544-1.516a.5.5 0 01.453-.03l.084.046 1.669 1.137V2.193a.253.253 0 00-.128-.051l-.072-.006zm-1.333 6.806l.1.008a.677.677 0 01.57.57l.007.1a.677.677 0 11-.782-.669l.105-.009zm-2.475.177a.5.5 0 01.09.992l-.09.008H4.5a.5.5 0 01-.09-.992l.09-.008h4.242zm2.475-2.298l.1.008a.677.677 0 01.57.569l.007.1a.677.677 0 11-.782-.668l.105-.009zm-2.828.177a.5.5 0 01.09.992l-.09.008H4.5a.5.5 0 01-.09-.992l.09-.008h3.889zM11.217 4.7l.1.007a.679.679 0 01.57.57l.007.1a.677.677 0 11-.782-.669l.105-.008zm-3.889.177a.5.5 0 01.09.992l-.09.008H4.5a.5.5 0 01-.09-.992l.09-.008h2.828z"></path></svg>
                            Mis pedidos
                        </a>
                    </Link>
                </li>
                {(logeadoRestaurante ? 
                    <li>
                        <Link href="/mis-productos">
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"  fill="#2b1a46" ><path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"></path></svg>
                                Mis productos
                            </a>
                        </Link>
                    </li>    
                : "")}
            </ul>
        </div>
    );
}
 
export default DatosCuentaSidebar;