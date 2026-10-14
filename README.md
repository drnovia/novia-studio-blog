<div align="center">

# ✨ NOVIA Studio Blog

<img src="https://img.shields.io/badge/Jenius-soft%20desktop%20web-FFB7C5?style=for-the-badge" alt="Jenius soft desktop web" />
<img src="https://img.shields.io/badge/Next.js-16.4-E8D5FF?style=for-the-badge&logo=next.js" alt="Next.js" />
<img src="https://img.shields.io/badge/React-19-B8E8FC?style=for-the-badge&logo=react" alt="React" />

**Blog & ruang baca NOVIA — antarmuka desktop pastel, menu bar, dock, dan halaman journal yang tenang.** 🌸

[Quickstart](docs/quickstart.md) · [Folder map](docs/folder-map.md) · [Workspace index](docs/monorepo-index.md) · [Contributing](CONTRIBUTING.md)

</div>

---

## 💖 Tentang

Experiential site (bukan CMS penuh): konten ditulis langsung di JSX per route — `journal`, `about`, `becoming`, `the-unspoken`, `find-your-words`, dan `reading-room`. Chrome global (`MenuBar`, `Dock`, `LiveClock`) hidup di `app/layout.tsx`.

## 🛠 Instalasi

```bash
git clone https://github.com/drnovia/Novia-Studio-Blog.git
cd novia-studio-blog
npm install
```

## 🚀 Pemakaian

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Build produksi |
| `npm run start` | Serve build |
| `npm run lint` | ESLint |

Langkah detail: [`docs/quickstart.md`](docs/quickstart.md).

## 📁 Struktur

```text
app/           → routes & globals.css
components/    → MenuBar, Dock, placeholders
public/images/ → foto & avatar
docs/          → panduan repo
tests/         → slot tes otomatis
```

Peta: [`docs/folder-map.md`](docs/folder-map.md).

## 🤝 Kontribusi

Ikuti [`CONTRIBUTING.md`](CONTRIBUTING.md) — utamakan konsistensi visual dan aksesibilitas.

## 📜 Lisensi

MIT — [`LICENSE`](LICENSE).

---

<p align="center"><sub>💫 NOVIA Studio · girly-tech clarity</sub></p>
