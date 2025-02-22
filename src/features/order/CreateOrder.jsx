import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../Ui/Button";
import { useSelector } from "react-redux";
import { clearCart, getCart } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store"

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const userName = useSelector(state => state.user.userName)
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl mb-8 font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
             <input type="text" name="customer" defaultValue={userName} required className="input w-full"/>
        </div>
        </div>

        <div  className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input  type="tel" name="phone" required className="input w-full"/>
            {formErrors?.phone && <p className="mt-2 p-2 text-xs text-red-700 bg-red-100 rounded-full ">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input type="text" name="address" required className="input w-full"/>
          </div>
        </div>

        <div className="flex gap-5 mb-12">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="accent-yellow-400 h-6 w-6 focus:ring focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} className="bg-white "/>
          <Button type='primary' disabled={isSubmitting} >{isSubmitting ? 'placing order': 'Order now'}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({request})
{
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    
    const order = {
      ...data,
      cart : JSON.parse(data.cart),
      priority : data.priority === 'on',
    };
    
    const errors = {};
    if(!isValidPhone(order.phone)) errors.phone = 'please give us your correct phone number. we might need it to contact you';
    if(Object.keys(errors).length > 0) return errors;

    const newOrder = await createOrder(order);
    store.dispatch(clearCart());
    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
