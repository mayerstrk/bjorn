import os
import sys


def setup_environment():
    """Set up initial Python environment."""
    os.makedirs("test_dir", exist_ok=True)
    os.makedirs("test_dir_2", exist_ok=True)
    os.makedirs("test_dir/nested_test_dir", exist_ok=True)
    sys.path.append(".")
