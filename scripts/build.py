#!/usr/bin/env python3
"""Monta guia/index.html (PT), guia/en/index.html e guia/es/index.html.

Fonte única: src/guia.template.html + src/*.css + src/charts.js + i18n/<idioma>.json.
Valida antes de gravar: mesmas chaves do PT em cada idioma, mesmas tags HTML e os
mesmos trechos <code> por chave (a tradução não pode mexer em código), e nenhum {{ }} sobrando.
Uso: python3 scripts/build.py
"""
import json, re, sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC, I18N, GUIA = ROOT / "src", ROOT / "i18n", ROOT / "guia"

LANGS = {
    # idioma: (lang do <html>, locale dos números, saída, prefixo de assets, banner)
    "pt": ("pt-BR", "pt-BR", GUIA / "index.html", "assets/", "banner.jpg"),
    "en": ("en", "en-US", GUIA / "en" / "index.html", "../assets/", "banner-en.jpg"),
    "es": ("es", "es-ES", GUIA / "es" / "index.html", "../assets/", "banner-es.jpg"),
}
LINKS = {"pt": {"pt": "./", "en": "en/", "es": "es/"},
         "en": {"pt": "../", "en": "./", "es": "../es/"},
         "es": {"pt": "../", "en": "../en/", "es": "./"}}

TAG = re.compile(r"</?([a-z0-9]+)[^>]*>")
CODE = re.compile(r"<code>(.*?)</code>", re.S)


def load(lang):
    return json.loads((I18N / f"{lang}.json").read_text(encoding="utf-8"))


def check(lang, data, ref):
    errs = []
    for sec in ("t", "charts"):
        a, b = set(ref[sec]), set(data[sec])
        if a - b:
            errs.append(f"{lang}.{sec}: faltam {sorted(a - b)}")
        if b - a:
            errs.append(f"{lang}.{sec}: sobram {sorted(b - a)}")
        for k in a & b:
            src, dst = ref[sec][k], data[sec][k]
            if not dst.strip():
                errs.append(f"{lang}.{sec}.{k}: vazio")
            if Counter(TAG.findall(src)) != Counter(TAG.findall(dst)):
                errs.append(f"{lang}.{sec}.{k}: tags HTML diferentes do PT")
            if Counter(CODE.findall(src)) != Counter(CODE.findall(dst)):
                errs.append(f"{lang}.{sec}.{k}: trechos <code> diferentes do PT")
    return errs


def main():
    tpl = (SRC / "guia.template.html").read_text(encoding="utf-8")
    css = (SRC / "template.css").read_text(encoding="utf-8") + (SRC / "extra.css").read_text(encoding="utf-8")
    js = (SRC / "charts.js").read_text(encoding="utf-8")
    ref = load("pt")
    used = set(re.findall(r"\{\{t:([a-z0-9_]+)\}\}", tpl))
    errs = [f"template usa chave inexistente: {k}" for k in sorted(used - set(ref["t"]))]
    errs += [f"chave sem uso no template: {k}" for k in sorted(set(ref["t"]) - used)]
    datas = {}
    for lang in LANGS:
        datas[lang] = load(lang)
        if lang != "pt":
            errs += check(lang, datas[lang], ref)
    if errs:
        print("ERROS:\n  " + "\n  ".join(errs))
        sys.exit(1)

    for lang, (htmllang, locale, out, pre, banner) in LANGS.items():
        d = datas[lang]
        html = tpl.replace("{{CSS}}", css).replace("{{JS}}", js)
        html = re.sub(r"\{\{t:([a-z0-9_]+)\}\}", lambda m: d["t"][m.group(1)], html)
        rep = {"HTMLLANG": htmllang, "LOCALE": locale, "BANNER": pre + banner,
               "CHARTS": json.dumps(d["charts"], ensure_ascii=False),
               "L_PT": LINKS[lang]["pt"], "L_EN": LINKS[lang]["en"], "L_ES": LINKS[lang]["es"],
               "ON_PT": "on" if lang == "pt" else "", "ON_EN": "on" if lang == "en" else "",
               "ON_ES": "on" if lang == "es" else ""}
        for k, v in rep.items():
            html = html.replace("{{" + k + "}}", v)
        left = re.findall(r"\{\{[^}]*\}\}", html)
        if left:
            print(f"ERRO {lang}: placeholders soltos {sorted(set(left))}")
            sys.exit(1)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(html, encoding="utf-8")
        print(f"ok {lang}: {out.relative_to(ROOT)} ({len(html)//1024} KB, {len(d['t'])}+{len(d['charts'])} textos)")


if __name__ == "__main__":
    main()
