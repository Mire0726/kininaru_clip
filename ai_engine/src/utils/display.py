def display_star_by_rating(rating: float) -> str:
    if not 0 <= rating <= 5:
        return "評価値は0～5の範囲で入力してください。"

    rounded_value = round(rating)  # 四捨五入
    filled_stars = "★" * rounded_value
    empty_stars = "☆" * (5 - rounded_value)
    return f"\n - 評価：{filled_stars + empty_stars} ({rating}/5)"
