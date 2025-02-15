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

-- 初期データ: ideas テーブル
INSERT INTO recommends (id, name, url, idea_id, content) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', '自家製麺No11', 'https://www.google.com/maps/place/%E8%87%AA%E5%AE%B6%E8%A3%BD%E9%BA%BANo11/@35.7449509,139.7054127,17z/data=!3m1!4b1!4m6!3m5!1s0x60189305a220c3df:0x6660dee34745311a!8m2!3d35.7449509!4d139.7079876!16s%2Fg%2F11h4c7bg0j?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D', 'd7a8d0ea-5b3d-4570-b9de-2b3f994527a9', 'レコメンドのテスト1'),
('98765432-10fe-dcba-0987-654321fedcba', '麺でる', 'https://www.google.com/maps/place/%E9%BA%BA%E3%81%A7%E3%82%8B+%E5%8D%97%E5%A4%A7%E6%B2%A2%E5%BA%97/@35.6084394,139.3832529,16z/data=!3m2!4b1!5s0x6018e2ca7ee11511:0xbd51d0a8725839da!4m6!3m5!1s0x6018e2ca7f433be7:0xc0014ca9d4ddb71b!8m2!3d35.6084394!4d139.3858278!16s%2Fg%2F12qg7lj7f?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D', 'd7a8d0ea-5b3d-4570-b9de-2b3f994527a9', 'レコメンドのテスト2');