import { useEffect } from "react";
import comprarProductoStyles from "./comprarProducto.module.scss"

const ComprarProducto = ({ producto }) => {

    useEffect(()=>{
        console.log(producto)
    },[])

    return (
        <div className={comprarProductoStyles.comprarProductoContainer}>
            <h1>hola</h1>
        </div>
    );
}
 
export default ComprarProducto;