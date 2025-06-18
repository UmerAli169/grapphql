import ProductCard from "./ProductCard";


export default function ProductList({ products }:any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {products.map((product:any) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

