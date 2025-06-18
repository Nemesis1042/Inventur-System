import os
import re

BASE_DIR = 'backend/app'

def fix_imports_in_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Calculate relative depth (count folders inside BASE_DIR)
    rel_path = os.path.relpath(filepath, BASE_DIR)
    depth = rel_path.count(os.sep)  # how deep in folder structure?

    # Build relative prefix like: '.' or '..' or '...' etc.
    relative_prefix = '.' + ('..' * depth) if depth > 0 else '.'

    # Patterns to replace
    # from app.something import ...
    pattern_backend = re.compile(r'from backend\.app(\.[\w\.]+)? import')
    # from app.something import ...
    pattern_app = re.compile(r'from app(\.[\w\.]+)? import')

    def replace_backend(match):
        suffix = match.group(1) or ''
        return f'from {relative_prefix}{suffix} import'

    def replace_app(match):
        suffix = match.group(1) or ''
        return f'from {relative_prefix}{suffix} import'

    # First replace backend.app imports
    content = pattern_backend.sub(replace_backend, content)

    # Then replace app imports
    content = pattern_app.sub(replace_app, content)

    if content != original_content:
        print(f'Fixed imports in: {filepath}')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

def walk_and_fix():
    for root, _, files in os.walk(BASE_DIR):
        for file in files:
            if file.endswith('.py'):
                fix_imports_in_file(os.path.join(root, file))

if __name__ == '__main__':
    walk_and_fix()

