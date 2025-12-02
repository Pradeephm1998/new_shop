import { useState } from "react";
import { useShop } from "../state/ShopContext.jsx";

export default function ShopPage() {
  const { shops, addToCart } = useShop();
  const [selectedShopId, setSelectedShopId] = useState(shops[0]?.id ?? null);
  const selectedShop = shops.find((s) => s.id === selectedShopId) ?? shops[0];

  return (
    <div className="page">
      <aside className="sidebar">
        {shops.map((shop) => (
          <button
            key={shop.id}
            className={
              "shop-btn" + (shop.id === selectedShop?.id ? " shop-btn-active" : "")
            }
            onClick={() => setSelectedShopId(shop.id)}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{shop.name}</span>
              <span style={{ fontSize: 11, color: "#a5b4fc" }}>
                ★ {shop.rating.toFixed(1)}
              </span>
            </div>
            <span>
              {shop.category} • {shop.etaMinutes} min ETA
            </span>
          </button>
        ))}
      </aside>

      <section className="content">
        <div>
          <h2>{selectedShop?.name}</h2>
          <div className="content-sub">
            {selectedShop?.category} • Approx. delivery{" "}
            {selectedShop?.etaMinutes} mins
          </div>
        </div>

        <div className="products-grid">
          {selectedShop?.products.map((product) => (
            <div key={product.id} className="card product-card">
              <div className="product-name">{product.name}</div>
              <div className="product-meta">
                <span>₹ {product.price}</span>
                {!product.inStock && (
                  <span className="badge-out">Out of stock</span>
                )}
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <button
                  className="btn-primary"
                  disabled={!product.inStock}
                  onClick={() =>
                    addToCart({
                      shopId: selectedShop.id,
                      shopName: selectedShop.name,
                      productId: product.id,
                      name: product.name,
                      price: product.price,
                    })
                  }
                >
                  {product.inStock ? "Add to cart" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
