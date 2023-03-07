import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"

type CartItem = {
    id:number;
    quantity:number
}

export function CartItem({id, quantity}:CartItem) {

    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(i => i.id ===id)
    if (item === null) return null

    return(
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center" style={{boxShadow:"0 1px 0px rgba(0, 0, 0, 0.1)"}}>
            <img src={item?.imgUrl} style={{width: "90px", height:"125px", objectFit:"cover"}}/>
            <div className="me-auto">
                <div>
                    {item?.name}{" "} 
                    {quantity > 1 && (
                        <span className="text-muted" style={{fontSize:"0.65rem"}}>x{quantity}</span>
                    )}
                    <div className="text-muted" style={{fontSize:"0.8rem"}}>{formatCurrency(item?.price ?? 0)}</div>
                </div>
            </div>
            <div>{formatCurrency((item?.price ?? 0) * Number(quantity))}</div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item?.id ?? 0)}>x</Button>
        </Stack>
    );
}