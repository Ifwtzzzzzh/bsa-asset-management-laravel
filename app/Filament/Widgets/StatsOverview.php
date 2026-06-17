<?php

namespace App\Filament\Widgets;

use App\Models\Asset;
use App\Models\Branch;
use App\Models\FacilityReport;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected static ?int $sort = 1;
    protected function getStats(): array
    {
        return [
            Stat::make('Jaringan Cabang', Branch::count() . ' Hub')
                ->description('Total koridor logistik aktif')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('info'),

            // 📦 METRIKS 2: Total Inventory Aset
            Stat::make('Total Inventory Aset', Asset::count())
                ->description(Asset::where('status', 'maintenance')->count() . ' Unit sedang di bengkel')
                ->descriptionIcon('heroicon-m-cube')
                ->color(Asset::where('status', 'maintenance')->count() > 0 ? 'warning' : 'success'),

            // ⚠️ METRIKS 3: Keluhan Kerusakan Lapangan
            Stat::make('Laporan Kerusakan', FacilityReport::where('status', 'pending')->count())
                ->description('Menunggu review & approval HO')
                ->descriptionIcon('heroicon-m-clipboard-document-check')
                ->color(FacilityReport::where('status', 'pending')->count() > 0 ? 'danger' : 'gray'),

            // 👥 METRIKS 4: Total Sumber Daya Manusia
            Stat::make('Manajemen Akun Staf', User::count())
                ->description('Admin, Supervisor & Staff')
                ->descriptionIcon('heroicon-m-users')
                ->color('success'),
        ];
    }
}