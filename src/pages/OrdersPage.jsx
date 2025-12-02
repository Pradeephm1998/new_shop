import { useShop } from "../state/ShopContext.jsx";

export default function OrdersPage() {
  const { orders } = useShop();

  return (
    <section className="content-full">
      <h2>Orders</h2>
      <p className="content-sub">
        This is a dummy history. Every time you place an order from the cart,
        it appears here.
      </p>

      {orders.length === 0 && (
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 10 }}>
          No orders yet. Add some items to cart and click <b>Place Dummy Order</b>.
        </p>
      )}

      {orders.map((order) => (
        <div key={order.id} className="card order-card">
          <div className="order-header">
            <span>{order.id}</span>
            <span>
              {new Date(order.createdAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
          <div style={{ marginTop: 6 }}>
            {order.items.map((item) => (
              <div
                key={item.productId + item.shopId}
                className="order-item-row"
              >
                <span>
                  {item.name} <span style={{ color: "#9ca3af" }}>x{item.qty}</span>
                </span>
                <span>₹ {item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="order-total">Total: ₹ {order.totalAmount}</div>
        </div>
      ))}
    </section>
  );
}
