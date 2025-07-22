# Changelog

## [v0.1.1] - 2025-07-11
🧩 Awal penggabungan UI Web + Backend Multi-Tenant (Level 2)

### Added
- ✅ Frontend Next.js + Tailwind (`apps/web`) berhasil ditambahkan via `npx create-next-app`
- ✅ Halaman default Next.js dapat diakses di: https://dev.xalorra.com
- ✅ Struktur folder modular: `src/app`, `public/images`, dsb
- ✅ Setup `django-tenants` berhasil untuk backend multi-tenant (schema-based)
- ✅ Penambahan model `Client` dan `Domain` serta middleware resolusi domain dinamis
- ✅ Migrasi dan endpoint berhasil diuji untuk `tenant1` & `tenant2`
- ✅ Endpoint `GET /workspaces/` tersedia per tenant

### Changed
- 🔁 Struktur backend dipisahkan menjadi `core/` (apps per tenant) dan `tenants/` (client & domain)

### Verified
- 🧪 Validasi isolasi antar schema berhasil (data `tenant1` tidak terlihat di `tenant2`)
- 🧪 Endpoint via cURL dan browser menunjukkan data per tenant domain

### Next
- [ ] Tambah model `Dataset` per tenant
- [ ] Buat endpoint upload dataset dan training model per schema
- [ ] Integrasi bot Discord `/train` → API → UI Web
