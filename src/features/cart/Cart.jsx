import LinkButton from '../../Ui/LinkButton';
import Button from '../../Ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.userName);
  const cart = useSelector(getCart);

  if(!cart.length) return <EmptyCart />

  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {userName}</h2>

      <ul className='divide-y divide-stone-200 border-b border-b-stone-200 mt-3'>
         {cart.map(item=> <CartItem item={item} key={item.id} />)}
      </ul>

      <div className='mt-6 space-x-3'>
        <Button type='primary' to="/order/new">Order pizzas</Button>
        
        <Button type='secondary' onClick={()=>dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
