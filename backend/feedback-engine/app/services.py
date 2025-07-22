from app.schemas import LabelResult

async def label_texts(texts: list[str]) -> list[LabelResult]:
    results = []
    for text in texts:
        # Beri label dummy manual, misal "positive" kalau ada kata "senang"
        if "senang" in text.lower():
            label = "positif"
        elif "buruk" in text.lower() or "sedih" in text.lower():
            label = "negatif"
        else:
            label = "netral"
        results.append(LabelResult(text=text, label=label))
    return results
