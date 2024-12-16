import os
import json


def scan_directory(path: str = ".") -> list:
    """Scan directory and return tree structure."""
    result = []
    for item in sorted(os.listdir(path)):
        if item.startswith("."):
            continue
        full_path = os.path.join(path, item)
        is_dir = os.path.isdir(full_path)
        node = {
            "name": item,
            "path": full_path.replace("\\", "/"),
            "type": "directory" if is_dir else "file",
            "children": scan_directory(full_path) if is_dir else [],
        }
        result.append(node)
    return result


def get_directory_tree() -> str:
    """Get directory tree as JSON string."""
    return json.dumps(scan_directory())
