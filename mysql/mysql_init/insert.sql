-- 初期データ: events テーブル
INSERT INTO events (title, url) VALUES
('Hokkaido Trip', 'https://example.com/asia-travel2025');

-- 初期データ: users テーブル
INSERT INTO users (id, name, event_id) VALUES
('user_001', 'Sumire', 1),
('user_002', 'Koshimu', 1),
('user_003', 'Usui', 1);


-- 初期データ: ideas テーブル
INSERT INTO ideas (title, url, created_by, tag, event_id, likes, summary, memo) VALUES
('札幌時計台', 
'https://maps.app.goo.gl/xzB23gJ7HyJMCbNx6', 
'user_001', 
'行きたい場所', 
1, 
2, 
'', 
''),
('麺屋 彩未', 'https://maps.app.goo.gl/xTTx2eryTt4XWZyj8', 'user_002', '飲食店', 1, 3, 
    'めっちゃ並ぶ', 
    'こしむさんおすすめ'),
('シャトレーゼホテル', 'https://maps.app.goo.gl/hazpX1mY59pNsATC7', 'user_003', 'ホテル', 1, 1, 
    '温泉リゾートを拠点に、快適なリモートワーク環境を提供するプラン。自然に囲まれて仕事と癒しを両立。', 
    '高速Wi-Fiの提供が必須。');