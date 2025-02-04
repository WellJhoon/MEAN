import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate('products.productId');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ error: 'Carrito vacío' });
    }

    const total = cart.products.reduce((sum, item) => {
      return sum + (item.productId.price * item.quantity);
    }, 0);

    const order = new Order({
      userId: req.userId,
      products: cart.products.map(item => ({
        productId: item.productId._id,
        quantity: item.quantity
      })),
      total,
      status: 'completed'
    });

    await order.save();
    await Cart.deleteOne({ _id: cart._id });
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .populate('products.productId')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};