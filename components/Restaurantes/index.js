import Image from 'next/image'
import Link from "next/link"
import restaurantesStyles from "./restaurantes.module.scss"

const Restaurantes = ({restaurantes}) => {

    return (
        <div className={restaurantesStyles.restaurantesContainer}>
            {/* Cantidad de restaurantes cargados */}
            <h3>{restaurantes.length} restaurantes encontrados</h3>
            {restaurantes.map((restaurante)=>(
                <Link key={restaurante.id_restaurante} href={`/restaurante/${restaurante.id_restaurante}`}>
                    <a className={restaurantesStyles.restaurante} >
                        {/* Logo restaurante */}
                        <div className={restaurantesStyles.portadaContainer}>
                            <Image src={restaurante.logo} alt="Imagen de un producto del restaurante" layout={'responsive'} width="500" height="500" quality="90"/>
                        </div>
                        {/* Info del restaurante */}
                        <div className={restaurantesStyles.info}>
                            {/* Nombre */}
                            <h3>{restaurante.nombre}</h3>
                            <span>ENVÍO DEL LOCAL</span>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6h16v2H4V6zm0 12v-6h16.001l.001 6H4z"></path><path d="M6 14h6v2H6z"></path></svg>
                                Acepta pago online
                            </span>
                        </div>
                        {/* Calificacion */}
                        <span className={restaurantesStyles.calificacion}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="#7f7304" viewBox="0 0 16 16"><path d="M5.483 5.186l-4.028.331-.117.016C.499 5.693.192 6.779.874 7.349l3.033 2.534-.909 3.756-.02.11c-.115.836.795 1.473 1.552 1.031L8 12.758l3.47 2.022.1.052c.769.349 1.639-.34 1.433-1.193l-.91-3.756 3.035-2.534.086-.081c.593-.614.218-1.679-.668-1.751l-4.03-.331-1.565-3.565c-.363-.828-1.538-.828-1.901 0L5.483 5.186z"></path></svg>
                            4.3
                        </span>
                    </a>
                </Link>
            ))}
        </div>
    );
}
 
export default Restaurantes;