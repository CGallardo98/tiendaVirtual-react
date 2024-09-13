import React, { useState } from 'react';
import ProductCard from './Components/ProductCard'

const productos = [
  { id: 1, nombre: 'Camiseta Colombia', precio: 20, imagen: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/dd3211ccf3b8485091d5825e4b2bc913_9366/Camiseta_Local_Seleccion_Colombia_24_Version_Jugador_Amarillo_IP8280_21_model.jpg' },
  { id: 2, nombre: 'Camiseta Argentina', precio: 20, imagen: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/05596cc5f7724da8946f5362652319d0_9366/Camiseta_Local_Seleccion_Argentina_24_Blanco_IP8409_21_model.jpg' },
  { id: 3, nombre: 'Camiseta Deportiva', precio: 20, imagen: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5ee24b019f8640e886ffd3e19a6f2fc8_9366/Camiseta_de_Entrenamiento_Power_Rosa_IX9092_HM1.jpg' },
];

const TiendaVirtual = () => {
  const [carrito, setCarrito] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existingProductIndex = prevCarrito.findIndex((item) => item.id === producto.id);
      
      if (existingProductIndex !== -1) {
        const updatedCarrito = [...prevCarrito];
        updatedCarrito[existingProductIndex] = {
          ...updatedCarrito[existingProductIndex],
          cantidad: updatedCarrito[existingProductIndex].cantidad + 1
        };
        return updatedCarrito;
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  const cambiarCantidad = (productoId, cantidad) => {
    // If quantity is empty or not a valid number, set to 1
    const newCantidad = cantidad === '' ? 1 : parseInt(cantidad, 10) || 1;
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === productoId ? { ...item, cantidad: newCantidad } : item
      )
    );
  };  

  const filteredProductos = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Mi Tienda Virtual</h1>
      <div className='search-container'>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="search-input"
        />
      </div> 
      
      <div className="productos-grid">
        {filteredProductos.length > 0 ? (
          filteredProductos.map((producto) => (
            <ProductCard 
              key={producto.id} 
              producto={producto} 
              onAgregarAlCarrito={agregarAlCarrito}
            />
          ))
        ) : (
          <p>No se encuentran registros</p>
        )}
      </div>
      
      <div className="carrito">
        <h2>Carrito</h2>
        <div className='carrito-resumen'>
          <p>{carrito.reduce((total, item) => total + item.cantidad, 0)} artículos</p>
          <button className='boton-eliminar'
            onClick={() => vaciarCarrito()}
          >
              Vaciar Carrito
          </button>
        
          <ul className="mt-2">
            {carrito.map((item, index) => (
              <div key={index} className="carrito-item ">
                <img 
                  src={item.imagen} 
                  alt={item.nombre} 
                  className="carrito-item-imagen"
                />
                <span>
                  {item.nombre} - ${item.precio} 
                </span>
                <div className="carrito-item-controls">
                  <input
                    type="number"
                    value={item.cantidad}
                    onChange={(e) => cambiarCantidad(item.id, e.target.value)}
                    className="carrito-item-cantidad"
                  />
                  <button
                    onClick={() => eliminarProducto(index)}
                    className="boton-eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </ul>
          <p className="carrito-total">
            Total: ${carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TiendaVirtual;