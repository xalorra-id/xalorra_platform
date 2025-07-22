import click
import pandas as pd
from xalorra_ml_core.trainer import train_model
from xalorra_ml_core.evaluator import evaluate_model
from xalorra_ml_core.io import save_model
from xalorra_ml_core.predictor import predict_from_csv

@click.group()
def main():
    """Xalorra CLI - Machine Learning Core Interface"""
    pass

@main.command()
@click.option('--file', required=True, help='Path ke file CSV dataset')
@click.option('--target', required=True, help='Nama kolom target/label')
@click.option('--model-type', default='xgboost', help='Tipe model (default: xgboost)')
@click.option('--output', default='model.joblib', help='Path untuk simpan model output')
def train(file, target, model_type, output):
    """Train model dari file CSV"""
    click.echo(f"[📁] Load data dari: {file}")
    df = pd.read_csv(file)

    if target not in df.columns:
        raise click.ClickException(f"Kolom target '{target}' tidak ditemukan di CSV.")

    X = df.drop(columns=[target])
    y = df[target]

    click.echo(f"[🧠] Training model {model_type} ...")
    model = train_model(X, y, model_type=model_type)

    click.echo(f"[📊] Evaluasi model ...")
    results = evaluate_model(model, X, y)

    click.echo("[✅] Hasil evaluasi:")
    for k, v in results.items():
        click.echo(f"  {k}: {v:.4f}")

    save_model(model, output)
    click.echo(f"[💾] Model disimpan ke: {output}")

@main.command()
@click.option('--model', required=True, help='Path ke file model .joblib')
@click.option('--input', required=True, help='Path ke file CSV untuk prediksi')
@click.option('--output', default='prediction.csv', help='Path hasil prediksi CSV')
def predict(model, input, output):
    """Prediksi data baru dari file CSV"""
    click.echo(f"[📁] Load model dari: {model}")
    click.echo(f"[📄] Load data dari: {input}")

    result_df = predict_from_csv(model, input)
    result_df.to_csv(output, index=False)

    click.echo(f"[✅] Prediksi selesai. Hasil disimpan ke: {output}")
