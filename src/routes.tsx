import { Route } from "react-router-dom"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import AdminBlogPage from "./pages/admin/AdminBlogPage"
import AdminDashboardPage from "./pages/admin/AdminDashboardPage"
import AdminOrdersPage from "./pages/admin/AdminOrdersPage"
import AdminProductsPage from "./pages/admin/AdminProductsPage"
import AdminReviewsPage from "./pages/admin/AdminReviewsPage"
import AdminUsersPage from "./pages/admin/AdminUsersPage"
import AdminLayout from "./components/AdminLayout"
import AboutUsPage from "./pages/AboutUsPage"
import BlogListPage from "./pages/BlogListPage"
import BlogPostPage from "./pages/BlogPostPage"
import CartPage from "./pages/CartPage"
import HomePage from "./pages/HomePage"
import IndexLayout from "./pages/IndexLayout"
import ProductDetailPage from "./pages/ProductDetailPage"
import ReviewsPage from "./pages/ReviewsPage"
import ShopPage from "./pages/ShopPage"
import UserManagement from "./pages/admin/UserManagment"



export const AdminRoutes=(
    <Route path="/admin" element=  {<ProtectedRoute><AdminLayout /></ProtectedRoute> }>
          <Route index element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
          <Route path="users" element={<UserManagement />} />
          
          {/* Add more admin routes here */}
        </Route>
)

export const IndexRoutes=(
    
  <Route path='/' element={<IndexLayout/>}>
      {/* Public Routes */}
      <Route path="/" index element={<HomePage />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/:postId" element={<BlogPostPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/about" element={<AboutUsPage />} />
  </Route>
)
