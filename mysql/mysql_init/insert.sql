-- 初期データ: events テーブル
INSERT INTO events (id, title, url) VALUES
('b7c6b010-91af-4f4c-bfa7-0e7c8dfea9e5', 'Hokkaido Trip', 'https://example.com/asia-travel2025');

-- 初期データ: users テーブル
INSERT INTO users (id, name, event_id) VALUES
('9e765192-f3c7-44b6-9c75-1f6f002e62b9', 'Sumire', 'b7c6b010-91af-4f4c-bfa7-0e7c8dfea9e5'),
('f1c96b63-e2b5-4b3c-99cb-b77a6d2c3bda', 'Koshimu', 'b7c6b010-91af-4f4c-bfa7-0e7c8dfea9e5'),
('8d1b1c12-4d5c-44be-85f8-7aa1b8dcb604', 'Usui', 'b7c6b010-91af-4f4c-bfa7-0e7c8dfea9e5');

-- 初期データ: ideas テーブル
INSERT INTO ideas (id, title, url, created_by, tag, event_id, likes, summary, memo) VALUES
('6f8173a2-1b3e-41c6-85a8-f97f3c7b37f8', '札幌時計台', 'https://maps.app.goo.gl/xzB23gJ7HyJMCbNx6', '9e765192-f3c7-44b6-9c75-1f6f002e62b9', 'location', 'b7c6b010-91af-4f4c-bfa7-0e7c8dfea9e5', 2, '', ''),
('d7a8d0ea-5b3d-4570-b9de-2b3f994527a9', '麺屋 彩未', 'https://maps.app.goo.gl/xTTx2eryTt4XWZyj8', 'f1c96b63-e2b5-4b3c-99cb-b77a6d2c3bda', 'restaurant', 'b7c6b010-91af-4f4c-bfa7-0e7c8dfea9e5', 3, 
    'めっちゃ並ぶ', 
    'こしむさんおすすめ'),
('a0e6df2b-c7d5-4d25-9095-4f1f45d20a4c', 'シャトレーゼホテル', 'https://maps.app.goo.gl/hazpX1mY59pNsATC7', '8d1b1c12-4d5c-44be-85f8-7aa1b8dcb604', 'hotel', 'b7c6b010-91af-4f4c-bfa7-0e7c8dfea9e5', 1, 
    '温泉リゾートを拠点に、快適なリモートワーク環境を提供するプラン。自然に囲まれて仕事と癒しを両立。', 
    '高速Wi-Fiの提供が必須。'),
('a0e6df2b-c7d5-4d25-9095-4f1f45d10a5c', '北海道大学', 'https://maps.app.goo.gl/uE32jx5MCPkCDAnF9', '8d1b1c12-4d5c-44be-85f8-7aa1b8dcb604', 'other', 'b7c6b010-91af-4f4c-bfa7-0e7c8dfea9e5', 1, 
    '', 
    '');