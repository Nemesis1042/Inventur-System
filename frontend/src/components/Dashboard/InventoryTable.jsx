import React, { useState, useEffect } from 'react';

const mockInventory = [
  { id: 1, name: 'Produkt A', sku: 'A001', stock: 100 },
  { id: 2, name: 'Produkt B', sku: 'B002', stock: 50 },
];

export default function InventoryTable() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    // TODO: API call to load inventory
    setInventory(mockInventory);
  }, []);

  const handleChangeStock = (id, delta) => {
    setInventory(inv =>
      inv.map(item =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
    // TODO: Call API to persist stock change
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Produkt</th>
          <th>Artikelnummer</th>
          <th>Lagerbestand</th>
          <th>Aktion</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map(item => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.sku}</td>
            <td>{item.stock}</td>
            <td>
              <button onClick={() => handleChangeStock(item.id, +1)}>Einlagern +1</button>
              <button onClick={() => handleChangeStock(item.id, -1)}>Auslagern -1</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

