import { useContext } from "react"
import {Card, Button} from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"


type StoreItemProps = {
    id:number, 
    name:string,
    price:number,
    imgUrl:string,
}


export function StoreItem({id, name, price, imgUrl}:StoreItemProps) {

    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()

    const quantity = getItemQuantity(id)

    return <Card style={{ width: '18rem', marginBottom:"2rem"}}>
    <Card.Img variant="top" src={imgUrl} style={{height:"20rem" , objectFit:"cover"}} />
    <Card.Body>
      <Card.Title style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:"2rem"}}>
      <span className="fs-4">{name}</span>
      <span className="ms-2 text-muted">{ formatCurrency(price) }</span>
      
      </Card.Title>
      {/* <Card.Text>
      </Card.Text> */}
      <div className="mt-auto">
        {quantity === 0 ? (
        <Button style={{width:'100%'}} onClick={() => increaseCartQuantity(id)}>Add to cart</Button>) 
        : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: ".5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div style={{ marginLeft:"1rem", marginRight:"1rem"}}>
                <span style={{fontSize:"1.5rem"}}>{quantity}</span> in the cart
                </div>
                
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
            </div>
          )}

      </div>
    </Card.Body>
  </Card>
}