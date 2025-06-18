"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../../components/shared/ProductCard";
import Sidebar from "../../../components/catalog/Sliderbar";
import Wrapper from "@/app/wrapper";
import Filters from "@/components/shared/Filters";
import ProductSection from "@/components/main/ProductSection";
import {useWishlistStore} from "@/store/useWishlistStore";
import useProductStore from "@/store/productStore";
import useCategoryStore from "@/store/categoryStore";
import useCartStore from "@/store/cartStore";
import Pagination from "@/components/shared/Pagination";
const CatalogPage = () => {
  const { categories, fetchCategories } = useCategoryStore();
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { products, fetchProducts, productdetails } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [totalProducts, setTotalProducts] = useState(products.length || 0);
  const [sortBy, setSortBy] = useState("relevance");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );
  const [filters, setFilters] = useState({
    skinType: [] as string[],
    priceRange: [] as string[],
    minPrice: "",
    maxPrice: "",
  });
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
  useEffect(() => {
    let filtered = [...products];

    if (activeCategory) {
      filtered = filtered.filter((product: any) =>
        product.category.name?.includes(activeCategory)
      );
    }
    if (activeSubCategory) {
      filtered = filtered.filter((product: any) =>
        product.subcategory.name?.includes(activeSubCategory)
      );
    }
    if (filters.skinType.length > 0 && !filters.skinType.includes("All")) {
      filtered = filtered.filter((product: any) =>
        filters.skinType.some((type) => product.skinTypes?.includes(type))
      );
    }
    if (filters.priceRange.length > 0) {
      filtered = filtered.filter((product) => {
        const price = Number(product.price);
        return filters.priceRange.some((range) => {
          if (range === "Under $25") return price < 25;
          if (range === "$25 - $50") return price >= 25 && price <= 50;
          if (range === "$50 - $100") return price >= 50 && price <= 100;
          return true;
        });
      });
    }
    if (filters.minPrice || filters.maxPrice) {
      const min = filters.minPrice ? Number(filters.minPrice) : 0;
      const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
      filtered = filtered.filter((product) => {
        const price = Number(product.price);
        return price >= min && price <= max;
      });
    }
    if (sortBy === "lowest") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "highest") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredProducts(filtered);
    setTotalProducts(filtered.length);
  }, [activeCategory, activeSubCategory, filters, sortBy, products]);
  const handleCategoryClick = (categorySlug: string) => {
    setActiveCategory((prev) => (prev === categorySlug ? null : categorySlug));
    setActiveSubCategory(null);
  };
  const handleSubCategoryClick = (subCategorySlug: string) => {
    setActiveSubCategory((prev) =>
      prev === subCategorySlug ? null : subCategorySlug
    );
  };
  const handleFilterChange = (filterType: string, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: Array.isArray(value) ? value : [value],
    }));
  };
  const handlePriceInput = (type: "min" | "max", value: string) => {
    setFilters((prev) => ({ ...prev, [`${type}Price`]: value }));
  };
  const collapsibleSections = categories.map((category) => ({
    key: category.name,
    title: category.name,
    href: "#",
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      handleCategoryClick(category.name);
    },
    isActive: activeCategory === category.name,
    items: category.subcategories.map((sub) => ({
      label: sub.name,
      href: "#",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleSubCategoryClick(sub.name);
      },
      isActive: activeSubCategory === sub.name,
    })),
  }));

  return (
    <>
    <Wrapper>
      <div className="flex md:flex-row flex-col gap-[20px] pt-[40px]">
        <div className="md:max-w-[250px] w-full max-h-[80vh] overflow-y-auto">
          <Sidebar
            tittle="Shop All"
            collapsibleSections={collapsibleSections as any} 
            />
          <Filters
            onFilterChange={handleFilterChange}
            onPriceInput={handlePriceInput}
            />
        </div>
        <main className="flex-1">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">{totalProducts} Products</p>
            <div>
              <label className="mr-[12px] text-gray-600">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-[10px] rounded"
                >
                <option value="relevance">Relevance</option>
                <option value="lowest">Lowest Price</option>
                <option value="highest">Highest Price</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative pt-[30px]">
            {filteredProducts.slice(0, 9).map((product:any) => (
              <ProductCard
              key={product._id}
              product={product as any}
              addToCart={() => addToCart(product._id)}
              toggleWishlist={() => toggleWishlist(product)}
              isInWishlist={isInWishlist(product._id)}
              />
            ))}
          </div>
          <Pagination totalPages={Math.ceil(totalProducts / 10)} />
        
        </main>
      </div>
    </Wrapper>
      <ProductSection
      products={productdetails as any}
      cardWidth={289}
      addToCart={addToCart}
      toggleWishlist={toggleWishlist}
      isInWishlist={isInWishlist}
      />
      </>
  );
};

export default CatalogPage;
