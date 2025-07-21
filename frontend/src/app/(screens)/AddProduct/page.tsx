"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  DELETE_PRODUCT,
} from "@/lib/graphql/queries";

type CategoryEnum = "ELECTRONICS" | "CLOTHING" | "BEAUTY";

export default function ProductManagement() {
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    category: "" as CategoryEnum | "",
    subCategory: "",
    discount: "",
    images: [],
    size: "",
    recommendedFor: "",
    title: "",
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    type: string;
    message: string;
  } | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct({
        variables: {
          input: {
            ...productData,
            productPrice: parseFloat(productData.productPrice),
            discount: parseFloat(productData.discount),
            images: imagePreviews,
          },
        },
      });
      setNotification({
        type: "success",
        message: "Product created successfully!",
      });
      refetch();
      setProductData({
        productName: "",
        productPrice: "",
        productDescription: "",
        category: "",
        subCategory: "",
        discount: "",
        images: [],
        size: "",
        recommendedFor: "",
        title: "",
      });
      setImagePreviews([]);
    } catch (err: any) {
      setNotification({ type: "error", message: err.message });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct({ variables: { id } });
        setNotification({ type: "success", message: "Product deleted!" });
        refetch();
      } catch (err: any) {
        setNotification({ type: "error", message: err.message });
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {notification && (
        <div
          className={`p-3 mb-4 rounded-md ${
            notification.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Add Product Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="productName"
              label="Product Name"
              value={productData.productName}
              onChange={handleInputChange}
            />
            <Input
              name="productPrice"
              type="number"
              label="Price"
              value={productData.productPrice}
              onChange={handleInputChange}
            />
            <Input
              name="discount"
              type="number"
              label="Discount"
              value={productData.discount}
              onChange={handleInputChange}
            />

            <Select
              name="category"
              label="Category"
              value={productData.category}
              onChange={handleInputChange}
              options={["ELECTRONICS", "CLOTHING", "BEAUTY"]}
            />

            <Input
              name="subCategory"
              label="Sub Category"
              value={productData.subCategory}
              onChange={handleInputChange}
            />
            <Input
              name="size"
              label="Size"
              value={productData.size}
              onChange={handleInputChange}
            />
            <Input
              name="recommendedFor"
              label="Recommended For"
              value={productData.recommendedFor}
              onChange={handleInputChange}
            />
            <Input
              name="title"
              label="Title"
              value={productData.title}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="productDescription"
              value={productData.productDescription}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {imagePreviews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt="Preview"
                  className="h-20 w-20 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Discount</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.getAllProducts?.map((product: any) => (
                <tr key={product.id} className="border-t">
                  <td className="p-2">{product.productName}</td>
                  <td className="p-2">${product.productPrice}</td>
                  <td className="p-2">${product.discount}</td>
                  <td className="p-2">
                    {product.category}/{product.subCategory}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Input({
  name,
  label,
  value,
  onChange,
  type = "text",
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      />
    </div>
  );
}

function Select({
  name,
  label,
  value,
  onChange,
  options,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        required
      >
        <option value="" disabled>
          -- Select {label} --
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
