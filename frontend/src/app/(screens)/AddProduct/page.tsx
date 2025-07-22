"use client";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PRODUCT,
  GET_ALL_PRODUCTS,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "@/lib/graphql/queries";

type CategoryEnum = "ELECTRONICS" | "CLOTHING" | "BEAUTY";
type RecommendFor = "MEN" | "WOMEN" | "KIDS";
type Size = "S" | "M" | "L" | "XL";

export default function ProductManagement() {
  const [productData, setProductData] = useState({
    productName: "",
    price: "",
    description: "",
    category: "" as CategoryEnum | "",
    subCategory: "",
    discount: "",
    imageKeys: [] as string[],
    size: "" as Size | "",
    recommendFor: "" as RecommendFor | "",
    title: "",
  });

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [notification, setNotification] = useState<{
    type: string;
    message: string;
  } | null>(null);

  const { loading, error, data, refetch } = useQuery(GET_ALL_PRODUCTS);
  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(productData.price);
    const discount = parseFloat(productData.discount);

    if (isNaN(price) || isNaN(discount)) {
      setNotification({
        type: "error",
        message: "Price and Discount must be numbers.",
      });
      return;
    }

    try {
      if (editingProductId) {
        const { __typename, id, ...cleanInput } = productData as any;

        await updateProduct({
          variables: {
            id: editingProductId,
            input: {
              ...cleanInput,
              price,
              discount,
            },
          },
        });

        setNotification({
          type: "success",
          message: "Product updated successfully!",
        });
      } else {
        await createProduct({
          variables: {
            input: {
              ...productData,
              price,
              discount,
            },
          },
        });
        setNotification({
          type: "success",
          message: "Product created successfully!",
        });
      }

      refetch();
      setProductData({
        productName: "",
        price: "",
        description: "",
        category: "",
        subCategory: "",
        discount: "",
        imageKeys: [],
        size: "",
        recommendFor: "",
        title: "",
      });
      setImagePreviews([]);
      setEditingProductId(null);
    } catch (err: any) {
      setNotification({ type: "error", message: err.message });
    }
  };

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
    const keys = files.map((file) => file.name);
    setImagePreviews([...imagePreviews, ...previews]);
    setProductData((prev) => ({
      ...prev,
      imageKeys: [...prev.imageKeys, ...keys],
    }));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct({ variables: { id } });
      setNotification({ type: "success", message: "Product deleted!" });
      refetch();
    } catch (err: any) {
      setNotification({ type: "error", message: err.message });
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

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingProductId ? "Edit Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="productName"
              label="Product Name"
              value={productData.productName}
              onChange={handleInputChange}
            />
            <Input
              name="price"
              type="number"
              label="Price"
              value={productData.price}
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
            <Select
              name="size"
              label="Size"
              value={productData.size}
              onChange={handleInputChange}
              options={["S", "M", "L", "XL"]}
            />
            <Select
              name="recommendFor"
              label="Recommended For"
              value={productData.recommendFor}
              onChange={handleInputChange}
              options={["MEN", "WOMEN", "KIDS"]}
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
              name="description"
              value={productData.description}
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
            {editingProductId ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

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
                  <td className="p-2">${product.price}</td>
                  <td className="p-2">${product.discount}</td>
                  <td className="p-2">
                    {product.category} / {product.subCategory}
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 mr-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditingProductId(product.id);
                        setProductData({
                          ...product,
                          price: String(product.price),
                          discount: String(product.discount),
                        });
                        setImagePreviews(product.imageKeys || []);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
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
