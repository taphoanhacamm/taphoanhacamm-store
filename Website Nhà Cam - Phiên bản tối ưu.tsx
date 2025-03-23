import React from 'react';
import { Search, ShoppingCart, Heart, User, Facebook, Instagram, Phone, MapPin, Mail } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => (
  <div className="w-full bg-[#ccecff] text-center py-2 text-sm">
    <span>✨ Phí Giao Hàng Toàn Quốc 25k - Phí Giao Hàng TP.HCM 20k ✨</span>
    <br />
    <span className="text-red-500">Miễn Phí Giao Hàng Đơn 200k</span>
  </div>
);

const Navigation = () => (
  <nav className="bg-[#fff7df] py-4">
    <div className="container mx-auto flex items-center justify-between">
      <img src="/logo.png" alt="Nhà Cam" className="h-12" />
      
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <input 
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            className="w-full px-4 py-2 rounded-full border focus:outline-none"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <User size={24} className="cursor-pointer" />
        <Heart size={24} className="cursor-pointer" />
        <div className="relative">
          <ShoppingCart size={24} className="cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            0
          </span>
        </div>
      </div>
    </div>
  </nav>
);

const CategorySidebar = () => (
  <div className="w-64 bg-[#ccecff] p-4 rounded-lg">
    <h3 className="font-bold mb-4">Danh mục sản phẩm</h3>
    <ul className="space-y-2">
      {[
        'Tshirt / Hoodie / Sweater',
        'Dress / Top / Skirt',
        'Quà tặng - Phụ kiện',
        'Doll, Plush toys',
        'Móc khóa, Bag charm',
        'Văn phòng phẩm',
        'OOTD (Order 2-3 tuần)',
        'Dịch vụ gói quà'
      ].map(category => (
        <li key={category} className="hover:bg-white/50 rounded p-2 cursor-pointer">
          {category}
        </li>
      ))}
    </ul>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-bold">{product.price}đ</span>
        <span className="text-sm text-gray-500">Đã bán: {product.sold}</span>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 bg-[#ccecff] text-gray-800 py-2 rounded-full hover:bg-[#b3e0ff]">
          Thêm giỏ
        </button>
        <button className="flex-1 bg-[#ff9d8a] text-white py-2 rounded-full hover:opacity-90">
          Đặt hàng
        </button>
      </div>
    </div>
  </div>
);

const ProductGrid = () => (
  <div className="flex-1">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Sản phẩm mới</h2>
      <Select>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Sắp xếp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Mới nhất</SelectItem>
          <SelectItem value="price-asc">Giá tăng</SelectItem>
          <SelectItem value="price-desc">Giá giảm</SelectItem>
          <SelectItem value="bestseller">Bán chạy</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

    <div className="flex justify-center mt-8">
      <nav className="flex gap-2">
        {[1, 2, 3, 4, 5].map(page => (
          <button 
            key={page}
            className={`w-10 h-10 rounded-full ${
              page === 1 ? 'bg-[#ccecff]' : 'bg-white'
            } border hover:bg-[#ccecff]`}
          >
            {page}
          </button>
        ))}
      </nav>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-[#ccecff] mt-16 py-8">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h4 className="font-bold mb-4">Nhà Cam</h4>
        <p className="mb-4">More than a gift, our memory</p>
        <div className="flex gap-4">
          <Facebook className="cursor-pointer" />
          <Instagram className="cursor-pointer" />
        </div>
      </div>
      
      <div>
        <h4 className="font-bold mb-4">Thời gian hoạt động</h4>
        <p>Thứ 2 - Chủ Nhật</p>
        <p>9:00 - 17:00</p>
        <p className="text-sm">(Khách ghé nhận hàng tại kho)</p>
      </div>
      
      <div>
        <h4 className="font-bold mb-4">Liên hệ</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>0392.851.828 / 0938.890.917</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>60/3 ấp Trung Lân, Nguyễn Ảnh Thủ, Xã Bà Điểm</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>contact@nhacam.com</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

const Layout = ({ children }) => (
  <div className="min-h-screen bg-[#fff7df]">
    <Header />
    <Navigation />
    <main className="container mx-auto py-8">
      <div className="flex gap-8">
        <CategorySidebar />
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

const products = [
  {
    id: 1,
    name: "Blue and white checkered bow tie shirt",
    price: "220.000",
    sold: 5,
    image: "/product1.jpg"
  },
  {
    id: 2,
    name: "Gentle floral lace-up ruffle trim camisole",
    price: "140.000",
    sold: 12,
    image: "/product2.jpg"
  },
  // Thêm sản phẩm khác...
];

const HomePage = () => (
  <Layout>
    <ProductGrid />
  </Layout>
);

export default HomePage;