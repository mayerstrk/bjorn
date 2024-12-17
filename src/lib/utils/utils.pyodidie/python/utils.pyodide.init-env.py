def setup_environment():
    """Set up initial Python environment with all required directories."""
    import os

    # List all directories to create
    directories = [
        "stage_one_basic_calculator",
        "stage_two_advanced_calculator",
        "stage_three_multi_calculator",
        "stage_four_integer_division",
        "bonus_multi_digit_calculator",
    ]

    # Create each directory
    for dir_name in directories:
        os.makedirs(dir_name, exist_ok=True)

    # Add to Python path
    import sys

    sys.path.append(".")
