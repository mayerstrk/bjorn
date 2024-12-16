def normalize_path(path: str) -> str:
    """Normalize path by removing ./ if present."""
    return path.replace("./", "", 1) if path.startswith("./") else path


def read_file(path: str) -> str:
    """Read a file's contents."""
    path = normalize_path(path)
    with open(path, "r") as f:
        return f.read()


def write_file(path: str, content: str) -> None:
    """Write content to a file."""
    path = normalize_path(path)
    with open(path, "w") as f:
        f.write(content)


def verify_file(path: str) -> None:
    """Verify a file can be read."""
    with open(path, "r") as f:
        f.read()
