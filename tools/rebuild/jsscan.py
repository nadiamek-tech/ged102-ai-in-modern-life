"""Tiny JS-aware scanner: find the end of a balanced {...} / [...] starting at i (handles strings, template literals, comments)."""
def match(s, i):
    opens = {'{': '}', '[': ']', '(': ')'}
    stack = [opens[s[i]]]; j = i + 1
    mode = []  # stack of string modes: '`' template, or ('expr' depth markers in stack)
    while j < len(s):
        c = s[j]
        if mode and mode[-1] == '`':
            if c == '\\': j += 2; continue
            if c == '`': mode.pop(); j += 1; continue
            if c == '$' and s[j+1:j+2] == '{': mode.append('${'); stack.append('}'); j += 2; continue
            j += 1; continue
        if c in '"\'':
            q = c; j += 1
            while s[j] != q:
                if s[j] == '\\': j += 1
                j += 1
            j += 1; continue
        if c == '`': mode.append('`'); j += 1; continue
        if c == '/' and s[j+1:j+2] == '/': j = s.index('\n', j); continue
        if c == '/' and s[j+1:j+2] == '*': j = s.index('*/', j) + 2; continue
        if c in opens: stack.append(opens[c]); j += 1; continue
        if c in '}])':
            assert stack and stack[-1] == c, (c, s[max(0,j-80):j+20])
            stack.pop()
            if c == '}' and mode and mode[-1] == '${': mode.pop()
            j += 1
            if not stack: return j
            continue
        j += 1
    raise ValueError('unbalanced')

def scenes(src):
    """Return list of dicts {nav, text, fig, video} for the scenes array of Lecture.mount."""
    k = src.index('scenes:[') + len('scenes:')
    end = match(src, k)
    body = src[k+1:end-1]; out = []; j = 0
    while True:
        j = body.find('{', j)
        if j < 0: break
        e = match(body, j); t = body[j:e]; d = {'text': t}
        import re
        m = re.search(r"nav:'((?:[^'\\]|\\.)*)'", t); d['nav'] = m.group(1) if m else None
        for key in ('fig', 'video'):
            # top-level key only: find 'key:' at depth 1
            pos = find_top(t, key + ':')
            if pos is not None:
                v = pos + len(key) + 1
                d[key] = t[v:match(t, v)] if t[v] in '{[' else None
        out.append(d); j = e
    return out

def find_top(t, needle):
    depth = 0; j = 1; mode = []
    while j < len(t):
        c = t[j]
        if mode:
            if c == '\\': j += 2; continue
            if c == mode[-1]: mode.pop()
            j += 1; continue
        if c in '"\'`':
            if c == '`':
                e = j + 1
                # skip template fully via match on a fake brace
                e = _skip_tpl(t, j); j = e; continue
            mode.append(c); j += 1; continue
        if c in '{[(': depth += 1
        elif c in '}])': depth -= 1
        elif depth == 0 and t.startswith(needle, j) and not (t[j-1].isalnum()): return j
        j += 1
    return None

def _skip_tpl(t, j):
    s = '{' + t[j:]  # wrap so match() sees a block start then the template
    # find template end: scan with match on synthetic string
    k = 1; depth = 0; mode = ['`']; k = 2
    while k < len(s):
        c = s[k]
        if mode[-1] == '`':
            if c == '\\': k += 2; continue
            if c == '`':
                mode.pop()
                if not mode: return j + k
                k += 1; continue
            if c == '$' and s[k+1:k+2] == '{':
                e = match(s, k+1); k = e; continue
        k += 1
    raise ValueError('tpl')
