import { useState } from "react";
import { useShop } from "../state/ShopContext.jsx";

export default function CartDrawer() {
  const { cart, addToCart, removeFromCart, placeOrder } = useShop();
  const [open, setOpen] = useState(false);

  const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="cart-drawer-trigger">
      <button
        className="btn-outline"
        onClick={() => setOpen((o) => !o)}
      >
        Cart ({cart.items.length}) – ₹ {total}
      </button>

      {open && (
        <div className="cart-drawer">
          <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
            Current Cart
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>
            Adjust quantities and place a dummy order.
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {cart.items.length === 0 && (
              <div style={{ fontSize: 11, color: "#6b7280" }}>
                Cart is empty. Add products from any shop.
              </div>
            )}
            {cart.items.map((item) => (
              <div key={item.productId + item.shopId} className="cart-item">
                <div>
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">
                    {item.shopName} • ₹ {item.price} x {item.qty}
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="btn-small"
                    onClick={() =>
                      removeFromCart({
                        shopId: item.shopId,
                        productId: item.productId,
                      })
                    }
                  >
                    −
                  </button>
                  <button
                    className="btn-small"
                    onClick={() =>
                      addToCart({
                        shopId: item.shopId,
                        shopName: item.shopName,
                        productId: item.productId,
                        name: item.name,
                        price: item.price,
                      })
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <div>Total:</div>
            <div>₹ {total}</div>
          </div>
          <button
            className="btn-primary"
            style={{ marginTop: 8 }}
            disabled={cart.items.length === 0}
            onClick={placeOrder}
          >
            Place Dummy Order
          </button>
        </div>
      )}
    </div>
  );
}
