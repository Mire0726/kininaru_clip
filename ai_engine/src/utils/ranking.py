from typing import List, Dict  # noqa: I001


def calculate_rrf_rankings(data: List[Dict], k: int = 50, top_n: int = 5):
    """
    辞書のリストからRRFを使用してランキングを計算し、上位N件を返します。

    Args:
        data (list of dict): ランキング対象の辞書のリスト。
        k (int): RRFのパラメータ (デフォルト: 60)。
        top_n (int): 返却する上位N件の数 (デフォルト: 5)。

    Returns:
        list of dict: RRFでランキングされた上位N件の辞書のリスト。
    """

    if not data:
        return []

    # 1. ランキングリストの作成 (rating, user_ratings_total)
    ranked_by_rating = sorted(data, key=lambda x: x.get("rating") or 0, reverse=True)
    ranked_by_user_ratings_total = sorted(data, key=lambda x: x.get("user_ratings_total") or 0, reverse=True)

    # 2. RRFスコアの計算
    rrf_scores = {}
    for item in data:
        place_id = item["place_id"]
        rrf_scores[place_id] = 0

    # ratingの方を少し高めに補正
    for rank, item in enumerate(ranked_by_rating):
        place_id = item["place_id"]
        rrf_scores[place_id] += 1.3 / (k + rank + 1)  # +1 は順位を1始まりにするため

    # totalの方を小さめに補正　チェーン店を省きたい。
    for rank, item in enumerate(ranked_by_user_ratings_total):
        place_id = item["place_id"]
        rrf_scores[place_id] += 0.8 / (k + rank + 1)  # +1 は順位を1始まりにするため

    # 3. RRFスコアによるランキング
    ranked_by_rrf = sorted(data, key=lambda x: rrf_scores[x["place_id"]], reverse=True)

    # 4. 上位N件の抽出
    return ranked_by_rrf[:top_n]
