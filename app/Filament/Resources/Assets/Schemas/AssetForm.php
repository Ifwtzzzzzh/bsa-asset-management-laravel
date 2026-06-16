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
                    ->placeholder('Contoh: SN-BSA-10001'),

                TextInput::make('name')
                    ->label('Asset Name')
                    ->required()
                    ->placeholder('Contoh: Forklift Toyota 2.5 Ton'),

                Select::make('category_id')
                    ->label('Category')
                    ->options(fn () => AssetCategory::pluck('name', 'id')) // 🌟 Tarik data nama dan id langsung dari DB
                    ->required()
                    ->searchable()
                    ->preload(),

                Textarea::make('description')
                    ->label('Description')
                    ->required() // Buat required sesuai aturan migration lo
                    ->placeholder('Masukkan deskripsi detail kondisi atau spesifikasi aset...'),

                Select::make('status')
                    ->label('Status')
                    ->required()
                    ->options([
                        'available' => 'Available',
                        'in_use' => 'In Use',
                        'maintenance' => 'Maintenance',
                        'disposed' => 'Disposed',
                    ])
                    ->default('available'),

                Select::make('branch_id')
                    ->label('Branch / Cabang')
                    ->relationship('branch', 'name')
                    ->required()
                    ->default(fn () => Auth::user()?->branch_id)
            ]);
    }
}
