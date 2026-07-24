#!/usr/bin/env python3
"""Genera il subset Material Symbols self-hosted usato dalla libreria.

La sorgente completa e la versione di fontTools sono vendorizzate/pinnate per
rendere il WOFF2 riproducibile da un checkout pulito. GLYPHS.txt contiene i
nomi delle ligature pubbliche da conservare.
"""

from __future__ import annotations

import hashlib
import subprocess
import sys
import tempfile
from pathlib import Path

from fontTools.ttLib import TTFont


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "tools" / "font-sources" / "material-symbols-outlined-2.950.woff2"
GLYPHS = ROOT / "fonts" / "material-symbols" / "GLYPHS.txt"
OUTPUT = ROOT / "fonts" / "material-symbols" / "material-symbols-outlined.woff2"
SOURCE_SHA256 = "9e16d5cdd40f973bd1a60a0a43a936af6fbe5c3138cfeda1e8409d34734333de"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def ligature_map(font: TTFont) -> dict[str, str]:
    cmap = {
        chr(codepoint): glyph
        for codepoint, glyph in font.getBestCmap().items()
        if codepoint < 128
    }
    reverse_cmap = {glyph: character for character, glyph in cmap.items()}
    ligatures: dict[str, str] = {}

    for lookup in font["GSUB"].table.LookupList.Lookup:
        for raw_subtable in lookup.SubTable:
            subtable = getattr(raw_subtable, "ExtSubTable", raw_subtable)
            for first, values in getattr(subtable, "ligatures", {}).items():
                for value in values:
                    sequence = "".join(
                        reverse_cmap.get(glyph, "?")
                        for glyph in [first, *value.Component]
                    )
                    ligatures[sequence] = value.LigGlyph

    return ligatures


def main() -> None:
    if sha256(SOURCE) != SOURCE_SHA256:
        raise SystemExit("Sorgente Material Symbols inattesa: SHA-256 non corrispondente.")

    names = [
        line.strip()
        for line in GLYPHS.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    font = TTFont(SOURCE)
    cmap = {
        chr(codepoint): glyph
        for codepoint, glyph in font.getBestCmap().items()
        if codepoint < 128
    }
    ligatures = ligature_map(font)
    missing = sorted(name for name in names if name not in ligatures)
    if missing:
        raise SystemExit("Ligature non presenti nella sorgente: " + ", ".join(missing))

    glyph_names = {".notdef"}
    for name in names:
        glyph_names.update(cmap[character] for character in name)
        glyph_names.add(ligatures[name])

    with tempfile.TemporaryDirectory(prefix="skillpress-material-symbols-") as tmp:
        glyph_file = Path(tmp) / "glyphs.txt"
        generated = Path(tmp) / "material-symbols-outlined.woff2"
        glyph_file.write_text("\n".join(sorted(glyph_names)) + "\n", encoding="utf-8")
        subprocess.run(
            [
                sys.executable,
                "-m",
                "fontTools.subset",
                str(SOURCE),
                f"--output-file={generated}",
                f"--glyphs-file={glyph_file}",
                "--layout-features=rlig",
                "--no-layout-closure",
                "--flavor=woff2",
            ],
            check=True,
        )
        OUTPUT.write_bytes(generated.read_bytes())

    print(
        "build-material-symbols: "
        f"{len(names)} ligature, {OUTPUT.stat().st_size} byte, sha256={sha256(OUTPUT)}"
    )


if __name__ == "__main__":
    main()
