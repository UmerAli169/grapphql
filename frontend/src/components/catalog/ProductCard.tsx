const ProductCard = ({ product }:any) => {
    return (
      <div className="border p-4">
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
        <h3 className="font-bold">{product.name}</h3>
        <p>{product.description}</p>
        <p className="text-lg font-semibold">${product.price}</p>
        <button className="mt-2 bg-black text-white p-2 w-full">Add To Bag</button>
      </div>
    );
  };
  
  export default ProductCard;
   