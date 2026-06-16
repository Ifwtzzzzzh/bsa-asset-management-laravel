<?php

namespace App\Filament\Resources\Assets\Schemas;

use App\Models\AssetCategory;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;

class AssetForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('serial_no')
                    ->label('Asset Code / Serial No')
                    ->required()
                    ->unique(ignorable: fn ($record) => $record)
                    ->placeholder('Contoh: SN-BSA-10001')
                    ->helperText('Wajib unik. Gunakan format "SN-BSA-[Nomor]" atau nomor rangka resmi armada.'),

                TextInput::make('name')
                    ->label('Asset Name')
                    ->required()
                    ->placeholder('Contoh: Forklift Toyota 2.5 Ton')
                    ->helperText('Sebutkan merk, tipe, dan kapasitas beban jika ada (cth: Mitsubishi Fuso Wingbox #66).'),

                Select::make('category_id')
                    ->label('Category')
                    ->options(fn () => AssetCategory::pluck('name', 'id'))
                    ->required()
                    ->searchable()
                    ->preload()
                    ->helperText('Pilih rumpun kategori utama untuk mempermudah pemetaan inventory nasional.'),

                Textarea::make('description')
                    ->label('Description')
                    ->required()
                    ->placeholder('Masukkan deskripsi detail kondisi atau spesifikasi aset...')
                    ->helperText('Tuliskan detail kondisi fisik saat ini, nomor kontrak vendor, atau riwayat singkat aset.'),

                Select::make('status')
                    ->label('Status')
                    ->required()
                    ->options([
                        'available' => 'Available',
                        'in_use' => 'In Use',
                        'maintenance' => 'Maintenance',
                        'disposed' => 'Disposed',
                    ])
                    ->default('available')
                    ->helperText('Status operasional unit saat ini di area lantai gudang atau jalan raya.'),

                Select::make('branch_id')
                    ->label('Branch / Cabang')
                    ->relationship('branch', 'name')
                    ->required()
                    ->default(fn () => Auth::user()?->branch_id)
                    ->helperText('Lokasi fisik hub/terminal logistik tempat aset ini didaftarkan dan beroperasi.')
            ]);
        }
}