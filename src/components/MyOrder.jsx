import { useState, useEffect } from "react";

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        console.error("User is not logged in");
        return;
      }

      const response = await fetch("https://js2-ecommerce-api.vercel.app/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, [token]);

  if (!token) {
    return <p>Please log in to view your orders.</p>;
  }

  return (
    <div className="my-orders-page">
      <h1 className="text-center mb-5">Order&apos;s Summary</h1>
      {orders.map((order, index) => (
        <div key={index} className="card mb-3 col-7 mx-auto">
          <div className="card-header">
            <h4 className="text-right text-success">Order N: {index + 1}</h4>
          </div>
          <ul className="list-group list-group-flush">
            {order.products.map((productItem, i) => {
              const product = productItem.product;
              return (
                <li key={i} className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-2">{Array.isArray(product.images) && product.images.length > 0 && <img src={product.images[0]} alt={product.name} className="img-fluid rounded" />}</div>
                    <div className="col-10">
                      <h3>{product.name}</h3>
                      <p>Price: ${product.price}</p>
                      <p>Quantity: {productItem.quantity}</p>
                      <p>Total: ${product.price * productItem.quantity}</p>
                      <p>Category: {product.category}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default MyOrder;
