# BSA - Asset Management

<aside>
💡

Using NodeJS v24.16 and PHP 8.4.1

</aside>

# Tech Stacks & Packages

### Core Tech Stacks

- **PHP 8.4+** (Back-End Language)
- **Laravel 13** (Robust Back-End Framework)
- **React JS** (Front-End Library untuk Operational Portal)
- **Inertia JS** (The Bridge — Menghubungkan Laravel Controller dengan Komponen React secara Monolith)

### Packages

- **Laravel Breeze** (Package untuk scaffolding autentikasi React + Inertia bagi staff lapangan)
- **Filament PHP v3** (Package Core untuk membangun Dashboard Admin & Invoicing Management super cepat)
- **Filament Notifications** (Bawaan/Package Filament untuk kirim alert *real-time* ke dashboard Admin)
- **Filament Rating Star** (Package Filament untuk menampilkan visualisasi rating kondisi fasilitas/aset dari lapangan)
- **Laravel Notify** (Package untuk memunculkan notifikasi *flash/toast* yang estetik di sisi UI React)

# Features

**Admin**

- Authentication & Role Scope
- CMS (Content Management System)
- B2B Invoicing & Term of Payment
- Stock Opname Approval
- Smart Monitoring

FrontEnd

- Authentication
- Inbound Receiving Scanner
- Task Execution
- Field Stock Opname
- Facility Feedback & Rating

# Entity Relationship Diagram (ERD)

!Shamo Ecommerce-19.png

# Unified Modeling Language (UML)

!Usecase Diagram.png

!Activity Diagram Modul Inbound.png

# Technical Documentation

### Setup Laravel

```html
composer create-project laravel/laravel bsa-asset-management
```

### Setup Laravel Breeze

```html
composer require laravel/breeze --dev
npm install --legacy-peer-deps

rm -rf node_modules package-lock.json && npm install --legacy-peer-deps && 
npm run dev
```

### Setup Filament

```html
composer require filament/filament:"^5.0"

php artisan filament:install --panels
```

### Setup Laravel Notifiy

```html
composer require mckenziearts/laravel-notify

php artisan vendor:publish --provider="Mckenziearts\LaravelNotify\LaravelNotifyServiceProvider"
```

### Setup Filament Star Rating

```html
composer require l3aro/rating-star-for-filament

php artisan vendor:publish --tag="filament-rating-star-config"
```

### Setup Tailwind CSS

```html
npm install tailwindcss @tailwindcss/vite
```

### Setup Model

```html
php artisan make:model Branch
php artisan make:model User
php artisan make:model AssetCategory
php artisan make:model Asset
php artisan make:model Inventory
php artisan make:model Task
php artisan make:model FacilityReport
php artisan make:model StockOpname
php artisan make:model Client
php artisan make:model Invoice
php artisan make:model InboundReceipt
php artisan make:model InboundItem
```

### Setup Migrations

```html
php artisan make:migration create_branches_table
php artisan make:migration create_asset_categories_table
php artisan make:migration create_clients_table
php artisan make:migration create_assets_table
php artisan make:migration create_invoices_table
php artisan make:migration create_inbound_receipts_table
php artisan make:migration create_inventories_table
php artisan make:migration create_tasks_table
php artisan make:migration create_facility_reports_table
php artisan make:migration create_stock_opnames_table
php artisan make:migration create_inbound_items_table
```

### Setup Seeders

```html
php artisan make:seeder BranchSeeder
php artisan make:seeder UserSeeder
php artisan make:seeder AssetSeeder
php artisan make:seeder FacilityReportSeeder
php artisan make:seeder TaskSeeder

php artisan db:seed --class=AssetSeeder
```

### Setup Controller and Middleware

```html
php artisan make:controller AssetController --api
php artisan make:middleware CheckRole
```

### Setup Asset Resource Filament

```html
php artisan make:filament-resource Asset
php artisan filament:install --panels

php artisan make:filament-resource Branch --generate
php artisan make:filament-resource User --generate
php artisan make:filament-resource FacilityReport --generate
php artisan make:filament-resource Task --generate

php artisan make:filament-widget TaskStatusChart --chart
php artisan make:filament-widget StatsOverview --stats-overview
```
