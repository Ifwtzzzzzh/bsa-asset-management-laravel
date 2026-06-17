<?php

namespace App\Filament\Resources\FacilityReports\Schemas;

use App\Models\Asset;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;

class FacilityReportForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('asset_id')
                    ->label('Asset / Unit Meluncur')
                    ->options(fn () => Asset::pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required()
                    ->helperText('Pilih armada atau alat berat yang mengalami kendala teknis.'),

                Select::make('rating')
                    ->label('Rating Kondisi Kerusakan (1-5)')
                    ->options([
                        1 => '⭐ (Sangat Parah / Rusak Total)',
                        2 => '⭐⭐ (Parah)',
                        3 => '⭐⭐⭐ (Cukup / Mengganggu Operasional)',
                        4 => '⭐⭐⭐⭐ (Ringan)',
                        5 => '⭐⭐⭐⭐⭐ (Normal / Aman)',
                    ])
                    ->required() // 🔥 SINKRON: Wajib required sesuai tinyInteger di DB lo
                    ->default(3)
                    ->helperText('Berikan rating skala kerusakan unit fisik saat ini.'),

                Textarea::make('notes')
                    ->label('Deskripsi Catatan Kerusakan / Notes')
                    ->required() // 🔥 SINKRON: Wajib required sesuai teks di DB lo
                    ->placeholder('Contoh: Ban bagian belakang kiri bocor parah dan pelek sedikit penyok akibat menghantam separator di Gudang Tanjung Priok...')
                    ->helperText('Wajib diisi. Tuliskan kronologi detail kerusakan atau catatan penanganan di sini.'),

                FileUpload::make('photo_path')
                    ->label('Bukti Foto Kerusakan')
                    ->image() // Memastikan yang diupload hanya file gambar
                    ->directory('facility-reports') // Otomatis disimpan ke folder storage/app/public/facility-reports
                    ->required() // 🔥 SINKRON: Kolom string foto wajib diisi di DB lo
                    ->helperText('Wajib melampirkan foto kondisi fisik aset yang bermasalah sebagai bukti audit HO.'),

                Select::make('status')
                    ->label('Status Laporan')
                    ->required()
                    ->options([
                        'pending' => 'Pending (Menunggu Review HO)',
                        'approved' => 'Approved (Disetujui untuk Perbaikan)',
                        'rejected' => 'Rejected (Ditolak)',
                        'resolved' => 'Resolved (Selesai Diperbaiki)',
                    ])
                    ->default('pending')
                    ->helperText('Status alur kerja verifikasi laporan operasional.'),

                // Menangkap otomatis ID User / Supervisor yang sedang login secara background
                Select::make('user_id')
                    ->label('Pelapor / Supervisor')
                    ->relationship('user', 'name')
                    ->default(fn () => Auth::id())
                    ->disabled()
                    ->dehydrated()
                    ->required(),
            ]);
    }
}
