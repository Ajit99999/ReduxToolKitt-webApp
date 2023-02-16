import { useDispatch, useSelector } from "react-redux";
import { ADD_ITEM, CLEAR_ITEM } from "../app/CartSlice";

import { store } from "../app/store";

const Cart = ()=>{
    const cart = useSelector((store)=>store.cart)
    const dispatch = useDispatch()
    console.log(cart);
    return (
        <div>
            <h2>{ cart.items.length}</h2>

            <button onClick={()=>{
                  dispatch(ADD_ITEM("BANANA"))
            }} > Add </button>
             <button onClick={()=>{
                  dispatch( CLEAR_ITEM())
            }} > Remove </button>
        </div>
    )

}

export default Cart;