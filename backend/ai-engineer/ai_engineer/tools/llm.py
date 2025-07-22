import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def call_llm(prompt: str):
    res = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Kamu adalah AI Lead Engineer proyek Xalorra."},
            {"role": "user", "content": prompt}
        ]
    )
    return res['choices'][0]['message']['content'].strip().split("\\n")
