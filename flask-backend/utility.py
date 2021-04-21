from datetime import datetime

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def get_first_n_symbols_content(n, content):
    return content[:n]
