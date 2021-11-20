import { useRouter } from 'next/router'
import footerStyles from "./footer.module.scss"

const Footer = () => {

    const router = useRouter();

    return (
        <div className={footerStyles.footerContainer}>
            {(router.asPath == "/mi-cuenta" || router.asPath == "/mis-pedidos" || router.asPath == "/mis-productos") ? "" 
            :
            <footer>
                <div className={footerStyles.links}>
                    <ul>
                        <li>Quiénes somos</li>
                        <li>Términos y Condiciones</li>
                        <li>Privacidad</li>
                        <li>Sé parte de PedidosYa</li>
                        <li>Blog</li>
                    </ul>

                    <ul>
                        <li>Top comidas</li>
                        <li>Top cadenas</li>
                        <li>Top ciudades</li>
                    </ul>

                    <ul>
                        <li>Registra tu negocio</li>
                    </ul>

                    <ul>
                        <li>Acuerdos corporativos</li>
                    </ul>
                </div>
                <span className={footerStyles.arrepentimiento}>Te arrepentiste de una compra? <a href="#">Botón de arrepentimiento</a></span>
                <span className={footerStyles.defensa}>Defensa de las y los Consumidores: para reclamos, ingrese <a href="#">aquí</a></span>
                <p>PAGOS YA S.A. es un proveedor de servicios de pago y no está autorizado por el BCRA para operar como entidad financiera.</p>
                <span className={footerStyles.copyright}>PedidosYa © 2010-2021</span>
                <span>V4.0.19</span>
            </footer> }
        </div>
        
    );
}
 
export default Footer;