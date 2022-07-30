import { useState , useEffect } from "react";

const Tablero = ({puntos , numeros}) =>{
    const [Bloques , setBloques] = useState([])

    useEffect(()=>{
        retornodeimagenes();
    })

    const retornodeimagenes = () =>{
        if(numeros !== undefined){
            let bloq = []
            for(let i= 1; i < 5 ; i++) {
                // eslint-disable-next-line default-case
                switch(numeros[i]){
                    case 0:
                    bloq.push(`fondo2`)
                    break;
                    case 1:
                    bloq.push(`fondo3`)
                    break;
                    case 2:
                    bloq.push(`fondo0`)
                    break;
                    case 3:
                    bloq.push(`fondo6`)
                    break;
                    case 4:
                    bloq.push(`fondo5`)
                    break;
                    case 5:
                    bloq.push(`fondo1`)
                    break;
                    case 6:
                    bloq.push(`fondo4`)
                    break;
                }
            }
            setBloques(bloq)
            console.log(Bloques);
        }
        // 0 > 2
        // 1 > 3
        // 2 > 0
        // 3 > 2
        // 4 > 6
        // 5 > 1
        // 6 > 4
    }
    
    return (
    <div id="tablero" className="d-flex flex-column align-items-center">
        <div className="d-flex mt-2 flex-column align-items-center" style={{borderBottom: '1px solid black' , height: '10%' , width: '100px'}}>
            <p style={{marginBottom: '0px'}}>Puntos:</p>
            <p style={{marginBottom: '0px'}}>{puntos}</p>
        </div>
        <div className={`d-flex align-items-center justify-content-center ${Bloques[0]}`} style={{borderBottom: '1px solid black' , height: '22%' , width: '100px'}}>
        </div>
        <div className={`d-flex align-items-center justify-content-center ${Bloques[1]}`} style={{borderBottom: '1px solid black' , height: '22%' , width: '100px'}}>
        </div>
        <div className={`d-flex align-items-center justify-content-center ${Bloques[2]}`} style={{borderBottom: '1px solid black' , height: '22%' , width: '100px'}}>
        </div>
        <div className={`d-flex align-items-center justify-content-center ${Bloques[3]}`} style={{ height: '22%' , width: '100px'}}>
        </div>
    </div>
    )
}

export default Tablero;