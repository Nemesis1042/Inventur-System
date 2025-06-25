import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../../services/productService";

export default function InventoryTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((e) => console.error("Fehler beim Laden der Produkte", e));
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Kategorie</th>
          <th>Menge</th>
          <th>Stückpreis</th>
          <th>Gesamtwert</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>
              {p.category} / {p.subcategory}
            </td>
            <td>{p.quantity}</td>
            <td>{p.unit_price} €</td>
            <td>{p.total_value.toFixed(2)} €</td>
            <td>
              <button onClick={() => handleDelete(p.id)}>Löschen</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

