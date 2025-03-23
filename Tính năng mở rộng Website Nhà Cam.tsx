import React, { useState } from 'react';
import { Star, MessageCircle, CreditCard, User, Settings, LogOut, Send } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// === Hệ thống đánh giá sản phẩm ===
const Rating = ({ rating, setRating, size = "md" }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          className={`cursor-pointer ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          } ${size === "sm" ? "w-4 h-4" : "w-6 h-6"}`}
          onClick={() => setRating?.(star)}
        />
      ))}
    </div>
  );
};

const ReviewSection = ({ productId }) => {
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [reviews] = useState([
    { id: 1, user: "Minh Anh", rating: 5, comment: "Sản phẩm rất đẹp và chất lượng!", date: "2025-03-20" },
    { id: 2, user: "Thanh Thảo", rating: 4, comment: "Giao hàng nhanh, đóng gói cẩn thận", date: "2025-03-19" }
  ]);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h3>
      
      {/* Form đánh giá mới */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Viết đánh giá</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Đánh giá của bạn</label>
              <Rating rating={newReview.rating} setRating={(r) => setNewReview({...newReview, rating: r})} />
            </div>
            <div>
              <label className="block mb-2">Nhận xét</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                placeholder="Chia sẻ trải nghiệm của bạn..."
              />
            </div>
            <button className="bg-[#ccecff] px-4 py-2 rounded-md hover:bg-[#b3e0ff]">
              Gửi đánh giá
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Danh sách đánh giá */}
      <div className="space-y-4">
        {reviews.map(review => (
          <Card key={review.id}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-semibold">{review.user}</span>
                  <Rating rating={review.rating} size="sm" />
                </div>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// === Tích hợp thanh toán ===
const PaymentDialog = ({ total }) => {
  const [paymentMethod, setPaymentMethod] = useState('momo');
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-[#ff9d8a] text-white px-6 py-2 rounded-full">
          Thanh toán
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thanh toán đơn hàng</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <span>Tổng tiền:</span>
            <span className="font-bold text-lg">{total}đ</span>
          </div>
          
          <div>
            <h4 className="mb-2">Chọn phương thức thanh toán:</h4>
            <div className="space-y-2">
              {[
                { id: 'momo', name: 'Ví MoMo' },
                { id: 'vnpay', name: 'VNPay' },
                { id: 'cod', name: 'Thanh toán khi nhận hàng' },
                { id: 'bank', name: 'Chuyển khoản ngân hàng' }
              ].map(method => (
                <div key={method.id} className="flex items-center">
                  <input
                    type="radio"
                    id={method.id}
                    name="payment"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor={method.id}>{method.name}</label>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-[#ff9d8a] text-white py-2 rounded-md hover:opacity-90">
            Xác nhận thanh toán
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// === Quản lý tài khoản người dùng ===
const UserAccount = () => {
  return (
    <Tabs defaultValue="profile" className="w-full max-w-3xl mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
        <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
        <TabsTrigger value="settings">Cài đặt</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>
              Quản lý thông tin cá nhân của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Họ và tên</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  defaultValue="Nguyễn Văn A"
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-md"
                  defaultValue="example@email.com"
                />
              </div>
              <div>
                <label className="block mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded-md"
                  defaultValue="0123456789"
                />
              </div>
              <div>
                <label className="block mb-1">Địa chỉ</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  defaultValue="123 Đường ABC, Quận XYZ"
                />
              </div>
            </div>
            <button className="bg-[#ccecff] px-4 py-2 rounded-md hover:bg-[#b3e0ff]">
              Lưu thay đổi
            </button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="orders">
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng của tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "DH001", date: "2025-03-20", status: "Đã giao", total: "440.000đ" },
                { id: "DH002", date: "2025-03-15", status: "Đang giao", total: "280.000đ" }
              ].map(order => (
                <div key={order.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Đơn hàng #{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "Đã giao" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Ngày đặt: {order.date}</p>
                    <p>Tổng tiền: {order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt tài khoản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Nhận thông báo qua email</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Nhận thông báo qua SMS</span>
              <input type="checkbox" />
            </div>
            <hr />
            <button className="text-red-500 hover:text-red-700">
              Đăng xuất <LogOut className="inline-block w-4 h-4 ml-1" />
            </button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

// === Chat hỗ trợ khách hàng ===
const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Xin chào! Tôi có thể giúp gì cho bạn?", isUser: false },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), text: newMessage, isUser: true }]);
      setNewMessage("");
      // Giả lập phản hồi từ nhân viên hỗ trợ
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: "Cảm ơn bạn đã liên hệ. Nhân viên sẽ phản hồi trong vài phút.",
          isUser: false
        }]);
      }, 1000);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-[#ff9d8a] text-white p-3 rounded-full shadow-lg hover:bg-opacity-90"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl">
          <div className="p-4 bg-[#ccecff] rounded-t-lg">
            <h3 className="font-bold">Hỗ trợ khách hàng</h3>
            <p className="text-sm">Nhà Cam luôn sẵn sàng hỗ trợ bạn</p>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-[#ccecff] text-gray-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                className="flex-1 p-2 border rounded-md"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="bg-[#ff9d8a] text-white p-2 rounded-md hover:bg-opacity-90"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// === Tích hợp các component vào trang chính ===
const ProductDetail = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Chi tiết sản phẩm */}
        <div>
          <img src="/product1.jpg" alt="Product" className="w-full rounded-lg" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold mb-4">Tên sản phẩm</h1>
          <div className="flex items-center gap-2 mb-4">
            <Rating rating={4.5} />
            <span className="text-gray-500">(25 đánh giá)</span>
          </div>
          <p className="text-2xl font-bold mb-4">220.000đ</p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <button className="flex-1 bg-[#ccecff] py-2 rounded-full hover:bg-[#b3e0ff]">
                Thêm vào giỏ
              </button>
              <PaymentDialog total="220.000" />
            </div>
          </div>
        </div>
      </div>

      <ReviewSection productId={1} />
      <ChatSupport />
    </div>
  );
};

export default ProductDetail;