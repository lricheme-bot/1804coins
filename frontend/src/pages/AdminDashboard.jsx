import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { toast } from '../hooks/use-toast';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    status: 'in_stock',
    category: 'historical',
    featured: false,
    year: '',
    material: '',
    weight: '',
    diameter: '',
    mintage: '',
    sale_price: '',
    sale_label: ''
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${API}/admin/check`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.is_admin) {
        setIsAdmin(true);
        fetchProducts();
      } else {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive"
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Admin check failed:', error);
      navigate('/login');
    }
  };

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/admin/products`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      toast({
        title: "Error",
        description: "Failed to load products.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      status: 'in_stock',
      category: 'historical',
      featured: false,
      year: '',
      material: '',
      weight: '',
      diameter: '',
      mintage: '',
      sale_price: '',
      sale_label: ''
    });
    setEditingProduct(null);
  };

  const handleAddProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
        featured: formData.featured === 'true' || formData.featured === true
      };

      await axios.post(`${API}/admin/products`, productData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Success",
        description: "Product added successfully!"
      });

      setShowAddDialog(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Failed to add product:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to add product.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
        featured: formData.featured === 'true' || formData.featured === true
      };

      await axios.put(`${API}/admin/products/${editingProduct.id}`, productData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Success",
        description: "Product updated successfully!"
      });

      setEditingProduct(null);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error('Failed to update product:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to update product.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/admin/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast({
        title: "Success",
        description: "Product deleted successfully!"
      });

      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to delete product.",
        variant: "destructive"
      });
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      status: product.status,
      category: product.category,
      featured: product.featured,
      year: product.year,
      material: product.material,
      weight: product.weight,
      diameter: product.diameter,
      mintage: product.mintage,
      sale_price: product.sale_price?.toString() || '',
      sale_label: product.sale_label || ''
    });
    setEditingProduct(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  const ProductForm = () => (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
      <div>
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Emp. Jean Jacques Dessalines"
        />
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Challenge coin honoring..."
          rows={4}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            placeholder="25.00"
          />
        </div>
        <div>
          <Label htmlFor="sale_price">Sale Price (optional)</Label>
          <Input
            id="sale_price"
            type="number"
            step="0.01"
            value={formData.sale_price}
            onChange={(e) => handleInputChange('sale_price', e.target.value)}
            placeholder="20.00"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="sale_label">Sale Label (optional)</Label>
        <Input
          id="sale_label"
          value={formData.sale_label}
          onChange={(e) => handleInputChange('sale_label', e.target.value)}
          placeholder="Independence Day Sale"
        />
      </div>

      <div>
        <Label htmlFor="image">Image URL *</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => handleInputChange('image', e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="limited_stock">Limited Stock</SelectItem>
              <SelectItem value="coming_soon">Coming Soon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="historical">Historical</SelectItem>
              <SelectItem value="presidential">Presidential</SelectItem>
              <SelectItem value="royal">Royal</SelectItem>
              <SelectItem value="gift_set">Gift Set</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="children">Children</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="featured">Featured</Label>
        <Select 
          value={formData.featured.toString()} 
          onValueChange={(value) => handleInputChange('featured', value === 'true')}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            placeholder="1804"
          />
        </div>
        <div>
          <Label htmlFor="mintage">Mintage</Label>
          <Input
            id="mintage"
            value={formData.mintage}
            onChange={(e) => handleInputChange('mintage', e.target.value)}
            placeholder="Limited Edition"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="material">Material</Label>
          <Input
            id="material"
            value={formData.material}
            onChange={(e) => handleInputChange('material', e.target.value)}
            placeholder="Zinc alloy"
          />
        </div>
        <div>
          <Label htmlFor="weight">Weight</Label>
          <Input
            id="weight"
            value={formData.weight}
            onChange={(e) => handleInputChange('weight', e.target.value)}
            placeholder="28g"
          />
        </div>
        <div>
          <Label htmlFor="diameter">Diameter</Label>
          <Input
            id="diameter"
            value={formData.diameter}
            onChange={(e) => handleInputChange('diameter', e.target.value)}
            placeholder="39mm"
          />
        </div>
      </div>

      <Button
        onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
        className="w-full bg-black text-white hover:bg-gray-800"
      >
        {editingProduct ? 'Update Product' : 'Add Product'}
      </Button>

      {editingProduct && (
        <Button
          onClick={() => {
            setEditingProduct(null);
            resetForm();
          }}
          variant="outline"
          className="w-full"
        >
          Cancel Edit
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 flex items-center">
              <Shield className="w-10 h-10 mr-3 text-purple-600" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2">Manage your products</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-5 h-5 mr-2" />
                Add New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <ProductForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        {editingProduct && (
          <Dialog open={!!editingProduct} onOpenChange={() => {
            setEditingProduct(null);
            resetForm();
          }}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <ProductForm />
            </DialogContent>
          </Dialog>
        )}

        {/* Products List */}
        <Card>
          <CardHeader>
            <CardTitle>All Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        ${product.price.toFixed(2)}
                        {product.sale_price && (
                          <span className="ml-2 text-red-600">
                            Sale: ${product.sale_price.toFixed(2)}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.category} • {product.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
