<?php

namespace App\Filament\Resources\Branches\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class BranchForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
            ->label('Branch Name')
            ->required()
            ->unique(ignoreRecord: true)
            ->placeholder('Contoh: BSA Logistics - Cabang Belawan')
            ->helperText('Gunakan format: BSA Logistics - [Cabang/Head Office] [Nama Kota].'),

        TextInput::make('location')
            ->label('Location / Hub Type')
            ->required()
            ->placeholder('Contoh: Kantor Cabang, Fasilitas ILT')
            ->helperText('Pisahkan dengan koma (,) jika memiliki lebih dari satu tipe fasilitas.'),

        Textarea::make('address')
            ->label('Full Address / Description')
            ->required()
            ->placeholder('Masukkan alamat lengkap gudang atau deskripsi operasional wilayah...')
            ->helperText('Tuliskan alamat fisik atau deskripsi cakupan logistik wilayah ini secara detail.'),
            ]);
    }
}
