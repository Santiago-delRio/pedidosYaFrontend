import Image from 'next/image'
import Link from "next/link"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import logo from "../../assets/imagenes/Logo.svg"
import logoPerfil from "../../assets/imagenes/LogoRegistro.png"
import navbarStyles from "./navbar.module.scss"
import MenuLogin from "../MenuLogin"

const Navbar = () => {

    const router = useRouter();

    //Controlar menu de login / registro
    const [menuAbierto, setMenuAbierto] = useState(false)
    const [menuLoginAbierto, setMenuLoginAbierto] = useState(false)
    //Logeado?
    const [logeadoCliente, setLogeadoCliente] = useState()
    const [logeadoRestaurante, setLogeadoRestaurante] = useState()

    useEffect(()=>{
        //==== Si el menu esta abierto cerrarlo al cambiar de pagina
        if(menuAbierto){
            setMenuAbierto(false)
        }
        //==== Ver si esta logeado
        //Logeado como cliente
        if(window.localStorage.idCliente){
            setLogeadoCliente(true)
        }
        //Logeado como restaurante
        if(window.localStorage.idRestaurante){
            setLogeadoRestaurante(true)
        }
    },[router.asPath])

    return (
        <div className={navbarStyles.navContainer}>
            <nav className={navbarStyles.navbar}>
                {/* Logo */}
                <div className={navbarStyles.logoFlex}>
                    <div className={navbarStyles.logoContainer}>
                        <Link href="/">
                            <a>
                                <Image src={logo} alt="Logo pedidosYa" layout={'responsive'} quality="90"/>
                            </a>
                        </Link>
                    </div>
                </div>
                {/* Boton registrar negocio */}
                <Link href="/registra-tu-negocio">
                    <a>
                        <button className={navbarStyles.btnRegistrarNegocio}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2b1a46" viewBox="0 0 16 16"><path d="M12.858 1.5a.5.5 0 01.455.294l.328.73.353.81.202.487.105.267.082.221.058.177c.23.77-.162 1.611-.94 1.998L13.5 13a.5.5 0 01-.41.492L13 13.5H8.04c-.602 1.092-1.736 1.83-3.04 1.83-1.938 0-3.5-1.63-3.5-3.63 0-.988.38-1.885 1-2.54l-.001-2.62c-.851-.353-1.177-1.24-.92-2.14l.067-.209.043-.12.105-.272.131-.316L2 3.31l.266-.588.446-.94a.5.5 0 01.45-.282zM5 9.07c-1.376 0-2.5 1.173-2.5 2.63 0 1.457 1.124 2.63 2.5 2.63s2.5-1.173 2.5-2.63c0-1.457-1.124-2.63-2.5-2.63zm.034 1.163c.246 0 .45.176.492.41l.008.09v.529l.53.001a.5.5 0 01.09.992l-.09.008-.53-.001v.531a.5.5 0 01-.992.09l-.008-.09v-.531l-.53.001a.5.5 0 01-.09-.992l.09-.008.53-.001v-.53a.5.5 0 01.5-.5zm-.04-4.227l-.083.094c-.34.354-.797.557-1.355.594l-.057.001v1.724a3.41 3.41 0 011.315-.344L5 8.07c1.938 0 3.5 1.63 3.5 3.63 0 .275-.03.542-.085.8l4.084-.001v-5.8c-.616-.01-1.106-.238-1.447-.657l-.008-.01-.058.069c-.326.352-.757.556-1.28.593l-.179.006c-.58 0-1.045-.192-1.377-.552l-.062-.073-.072.08c-.316.32-.74.506-1.258.54L6.58 6.7c-.63 0-1.139-.208-1.507-.601l-.08-.093zm7.54-3.507H3.476l-.204.43-.203.44-.172.386-.141.333-.11.279a6.203 6.203 0 00-.08.224l-.025.085c-.166.577.084 1.024.825 1.024.633 0 .98-.28 1.149-.94.128-.502.843-.5.97.003.165.66.498.937 1.096.937.592 0 .9-.267 1.036-.917.111-.539.885-.528.981.013.116.649.392.904.93.904.552 0 .877-.277 1.057-.946.137-.507.863-.487.972.026.14.656.436.92.987.92.699 0 1.062-.516.939-.927a2.574 2.574 0 00-.052-.156l-.122-.323-.177-.43-.23-.535-.368-.83z"></path></svg>
                            Registrá tu negocio
                        </button>
                    </a>
                </Link>
                {/* Logo perfil */}
                <div className={navbarStyles.logoPerfilContainer}>
                    <div className={navbarStyles.logoContainer} onClick={()=>{setMenuAbierto(prevState => !prevState)}}>
                        <Image src={logoPerfil} alt="Logo pedidosYa" layout={'responsive'} quality="100"/>
                    </div>
                    <svg onClick={()=>{setMenuAbierto(prevState => !prevState)}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2b1a46" viewBox="0 0 16 16"><path d="M80.927-238.385c0 50.863-42.919 92.243-95.679 92.243H-278.75l-119.21 385.144h-29.11l-.934-.292 128.044-413.648h285.208c36.891 0 66.905-28.465 66.905-63.447zm133.068 0c0 59.718-23.822 115.852-67.086 158.042-43.17 42.107-100.54 65.296-161.543 65.296H-184.85L-264.067 239h-30.193l88.197-282.844h191.429c53.435 0 103.648-20.282 141.403-57.103 37.657-36.732 58.4-85.543 58.4-137.44zM147.99-238c.01.247.01.499.01.756 0 42.601-16.96 82.644-47.768 112.731-30.705 30.008-71.51 46.53-114.894 46.53H-232.76L-330.893 239H-361l107.044-345.757h239.294c73.836 0 133.908-58.54 133.908-130.487 0-.257-.005-.509-.01-.756z"></path><path d="M8 9.916L3.542 5.458a.625.625 0 00-.884.884l4.9 4.9c.244.244.64.244.884 0l4.9-4.9a.625.625 0 00-.884-.884L8 9.916z"></path></svg>
                    {/* Menu desplegable */}
                    {(menuAbierto) ? (logeadoCliente || logeadoRestaurante) ?
                        <div className={navbarStyles.menu}>
                            { logeadoRestaurante ? 
                                <>
                                {/* Mi cuenta */}
                                <Link href="/mi-cuenta">
                                    <a> 
                                        <button>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2b1a46" viewBox="0 0 16 16"><path d="M6.197 8.704a.5.5 0 01-.138.693c-.42.282-1.37.733-2.352.988l-.241.059-.138.048a1.166 1.166 0 00-.7.736c-.07.203-.101.387-.117.651l-.01.236v-.002l-.001.169c.003.264.03.554.08.73l.011.027.043.024c.232.125.642.303 1.176.479l.206.066c1.162.359 2.498.574 3.988.574 1.518 0 2.873-.223 4.048-.594a9.648 9.648 0 001.033-.388l.26-.123.072-.039.008-.024c.048-.177.073-.478.075-.755v-.133l-.003-.058c-.013-.376-.04-.594-.125-.836a1.155 1.155 0 00-.7-.737l-.144-.05c-1.05-.236-2.108-.73-2.584-1.043a.5.5 0 11.549-.835c.353.231 1.192.628 2.073.859l.25.061c.775.233 1.262.737 1.5 1.414.11.313.152.575.172.951l.011.263c.01.49-.028 1.012-.182 1.373a.853.853 0 01-.365.398l-.253.132c-.326.16-.766.34-1.346.524-1.27.4-2.726.64-4.349.64-1.594 0-3.029-.231-4.284-.619-.78-.241-1.372-.506-1.66-.675a.836.836 0 01-.366-.396c-.14-.31-.19-.742-.194-1.163v-.209l.004-.089c.016-.473.052-.77.182-1.136a2.165 2.165 0 011.316-1.348l.226-.075.019-.004c.929-.208 1.896-.66 2.256-.902a.5.5 0 01.694.138zM8.03.8c1.791.037 3.131.97 3.24 3.197l-.004-.045.013.095c.022.218.03.575.009.964l-.013.196-.02.199c-.11 1.012-.42 1.885-1.012 2.51-.555.588-1.294.876-2.227.884l-.268-.008c-.822-.05-1.487-.338-1.99-.875-.59-.623-.902-1.496-1.014-2.51a7.675 7.675 0 01-.034-1.275l.014-.108v-.021l.02-.261C4.93 1.713 6.2.862 7.799.803zm-.02 1h-.033c-1.27 0-2.17.58-2.25 2.197l-.032.264c-.08.75.084 2.051.653 2.807l.137.163c.353.376.832.563 1.495.569l.227-.007c.569-.038.987-.223 1.31-.563.726-.768.89-2.27.761-3.132-.011-.051-.013-.063-.01-.07-.076-1.6-.937-2.2-2.259-2.228z"></path></svg>
                                                Mi cuenta
                                        </button>
                                    </a>
                                </Link>
                                {/* Productos */}
                                <Link href="/mis-productos">
                                    <a>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"  fill="#2b1a46" ><path d="M22 8a.76.76 0 0 0 0-.21v-.08a.77.77 0 0 0-.07-.16.35.35 0 0 0-.05-.08l-.1-.13-.08-.06-.12-.09-9-5a1 1 0 0 0-1 0l-9 5-.09.07-.11.08a.41.41 0 0 0-.07.11.39.39 0 0 0-.08.1.59.59 0 0 0-.06.14.3.3 0 0 0 0 .1A.76.76 0 0 0 2 8v8a1 1 0 0 0 .52.87l9 5a.75.75 0 0 0 .13.06h.1a1.06 1.06 0 0 0 .5 0h.1l.14-.06 9-5A1 1 0 0 0 22 16V8zm-10 3.87L5.06 8l2.76-1.52 6.83 3.9zm0-7.72L18.94 8 16.7 9.25 9.87 5.34zM4 9.7l7 3.92v5.68l-7-3.89zm9 9.6v-5.68l3-1.68V15l2-1v-3.18l2-1.11v5.7z"></path></svg>
                                            Productos
                                        </button>
                                    </a>
                                </Link>
                                {/* Pedidos */}
                                <Link href="/mis-pedidos">
                                    <a>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2b1a46" viewBox="0 0 16 16"><path d="M12.55 1.136c.64 0 1.2.445 1.2 1.057v11.635c0 .334-.222.61-.532.723a.922.922 0 01-.827-.098l-1.609-1.096-2.316 1.38a.924.924 0 01-.822.056l-.11-.055-2.317-1.381-1.608 1.096a.917.917 0 01-.708.132l-.12-.034c-.31-.114-.531-.39-.531-.723V2.193c0-.612.56-1.057 1.2-1.057zm0 1h-9.1c-.132 0-.2.054-.2.057v11.294l1.669-1.136a.5.5 0 01.45-.057l.087.041L8 13.851l2.544-1.516a.5.5 0 01.453-.03l.084.046 1.669 1.137V2.193a.253.253 0 00-.128-.051l-.072-.006zm-1.333 6.806l.1.008a.677.677 0 01.57.57l.007.1a.677.677 0 11-.782-.669l.105-.009zm-2.475.177a.5.5 0 01.09.992l-.09.008H4.5a.5.5 0 01-.09-.992l.09-.008h4.242zm2.475-2.298l.1.008a.677.677 0 01.57.569l.007.1a.677.677 0 11-.782-.668l.105-.009zm-2.828.177a.5.5 0 01.09.992l-.09.008H4.5a.5.5 0 01-.09-.992l.09-.008h3.889zM11.217 4.7l.1.007a.679.679 0 01.57.57l.007.1a.677.677 0 11-.782-.669l.105-.008zm-3.889.177a.5.5 0 01.09.992l-.09.008H4.5a.5.5 0 01-.09-.992l.09-.008h2.828z"></path></svg>
                                            Pedidos
                                        </button>
                                    </a>
                                </Link>
                                </>
                            : ""}
                            {/* Cerrar sesion */}
                            <button onClick={()=>{window.localStorage.removeItem("idCliente"), window.localStorage.removeItem("idRestaurante"), window.localStorage.removeItem("logo"), router.reload(window.location.pathname)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2b1a46" viewBox="0 0 16 16"><path d="M9 1.5c-1.578 0-3.07.565-4.242 1.575a.498.498 0 00-.052.705c.18.21.496.233.705.052A5.5 5.5 0 119 13.5a5.472 5.472 0 01-3.589-1.333.5.5 0 10-.653.758A6.5 6.5 0 109 1.5zM3.354 5.646a.501.501 0 00-.638-.057l-.07.057-2 2-.057.07a.496.496 0 000 .568l.057.07 2 2 .07.057c.17.119.398.119.568 0l.07-.057.057-.07a.496.496 0 000-.568l-.057-.07L2.207 8.5H8a.5.5 0 00.09-.992L8 7.5H2.207l1.147-1.146.057-.07a.501.501 0 00-.057-.638z"></path></svg>
                                Cerrar sesión
                            </button>
                        </div>
                    :
                    //No está logeado
                        <div className={navbarStyles.menu}>
                            <button onClick={()=>{setMenuLoginAbierto(true), setMenuAbierto(false)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#2b1a46" viewBox="0 0 16 16"><path d="M14.533 1.5a.5.5 0 01.492.41l.008.09v12a.5.5 0 01-.41.492l-.09.008h-12a.5.5 0 01-.492-.41L2.033 14v-3.067a.5.5 0 01.992-.09l.008.09V13.5h11v-11h-11v2.758a.5.5 0 01-.41.492l-.09.008a.5.5 0 01-.492-.41l-.008-.09V2a.5.5 0 01.41-.492l.09-.008h12zM8.646 5.646a.502.502 0 01.708 0l2 2 .011.013a.31.31 0 01.033.039l.013.018.012.017.02.035.02.041.014.04c.005.015.009.03.012.046l.006.033.005.052v.04l-.005.052L11.5 8a.52.52 0 01-.011.105l-.012.046-.015.04c-.005.014-.012.027-.019.04a.568.568 0 01-.09.123l.045-.052a.304.304 0 01-.033.04l-.011.012-2 2-.07.057a.501.501 0 01-.638-.057l-.057-.07a.501.501 0 01.057-.638L9.792 8.5H1a.5.5 0 01-.09-.992L1 7.5h8.792L8.646 6.354l-.057-.07a.501.501 0 01.057-.638z"></path></svg>
                                Ingresar / Regístrate
                            </button>
                        </div>
                    : ""}
                </div>

                {/* Menu login / registro */}
                <div className={(menuLoginAbierto) ? navbarStyles.esconderFondo : ""}></div>
                {(menuLoginAbierto) ?  
                    <MenuLogin cerrarMenu={setMenuLoginAbierto}/>
                : ""}
            </nav>
        </div>
    );
}
 
export default Navbar;