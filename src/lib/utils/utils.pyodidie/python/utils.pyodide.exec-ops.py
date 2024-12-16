import os
import sys
import traceback


def execute_file(file_path: str) -> None:
    """Execute a Python file with proper namespace."""
    # Normalize path and store current directory
    file_path = os.path.normpath(file_path)
    file_dir = os.path.dirname(file_path)
    original_dir = os.getcwd()

    try:
        # Set up Python path
        if file_dir:
            sys.path.insert(0, file_dir)
        sys.path.insert(0, ".")

        # Execute file with __main__ namespace
        with open(file_path, "r") as f:
            code = f.read()
            namespace = {"__name__": "__main__", "__file__": file_path}
            exec(code, namespace)
    except Exception as e:
        print("Python traceback:")
        traceback.print_exc()
        raise e
    finally:
        os.chdir(original_dir)
