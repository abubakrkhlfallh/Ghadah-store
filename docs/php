<?php
// إضافة تقييم جديد
if($_SERVER['REQUEST_METHOD'] === 'POST') {
  $product_id = $_POST['product_id'];
  $rating = $_POST['rating'];
  $review = $_POST['review'];
  $user_name = "مستخدم"; // يمكن استبدالها بمعلومات المستخدم المسجل
  
  // حفظ في قاعدة البيانات
  $stmt = $pdo->prepare("INSERT INTO product_reviews (product_id, user_name, rating, review) VALUES (?, ?, ?, ?)");
  $stmt->execute([$product_id, $user_name, $rating, $review]);
  
  echo json_encode(['status' => 'success']);
  exit;
}

// جلب التقييمات
$product_id = $_GET['product_id'];
$stmt = $pdo->prepare("SELECT * FROM product_reviews WHERE product_id = ? ORDER BY created_at DESC");
$stmt->execute([$product_id]);
$reviews = $stmt->fetchAll();

// حساب المتوسط
$avg_stmt = $pdo->prepare("SELECT AVG(rating) as avg_rating, COUNT(*) as total FROM product_reviews WHERE product_id = ?");
$avg_stmt->execute([$product_id]);
$avg_data = $avg_stmt->fetch();
?>