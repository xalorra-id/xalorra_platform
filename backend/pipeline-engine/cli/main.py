import argparse
from registry.registry import get


def main():
    parser = argparse.ArgumentParser(description="Xalorra Orchestrator CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)

    run_p = subparsers.add_parser("run", help="Run a registered pipeline")
    run_p.add_argument("pipeline", help="Pipeline name")

    args = parser.parse_args()

    if args.command == "run":
        pipeline = get(args.pipeline)
        if pipeline:
            pipeline.run()
        else:
            print(f"Pipeline '{args.pipeline}' not found")


if __name__ == "__main__":
    main()
