<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Models\Branch;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Pages\CreateRecord;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Full Name')
                    ->required()
                    ->placeholder('Contoh: Ahmad Supervisor')
                    ->helperText('Masukkan nama lengkap karyawan sesuai dengan ID Card atau database HRD BSA Logistics.'),

                TextInput::make('email')
                    ->label('Email Address')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->placeholder('contoh@bsalogistics.co.id')
                    ->helperText('Wajib unik. Disarankan menggunakan alamat email resmi perusahaan.'),

                TextInput::make('password')
                    ->label('Password')
                    ->password()
                    ->revealable()
                    ->required(fn ($livewire) => $livewire instanceof CreateRecord)
                    ->dehydrateStateUsing(fn ($state) => Hash::make($state))
                    ->dehydrated(fn ($state) => filled($state))
                    ->placeholder('Masukkan password kuat...')
                    ->helperText(fn ($livewire) => $livewire instanceof CreateRecord
                        ? 'Wajib diisi. Gunakan kombinasi minimal 8 karakter berupa huruf, angka, dan simbol.'
                        : 'Biarkan kosong jika tidak ingin mengubah password user saat ini.'
                    ),

                Select::make('role')
                    ->label('Role Akses')
                    ->required()
                    ->options([
                        'admin_ho' => 'Admin HO (Head Office)',
                        'supervisor' => 'Supervisor Cabang',
                        'staff' => 'Staff Lapangan',
                        'client' => 'Client / Vendor External',
                    ])
                    ->default('supervisor')
                    ->helperText('Menentukan batasan menu dashboard dan tingkat otoritas akses data di dalam sistem.'),

                Select::make('branch_id')
                    ->label('Assignment Branch / Cabang')
                    ->required(fn (Get $get) => $get('role') === 'supervisor')
                    ->options(fn () => Branch::pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->placeholder('Pilih cabang khusus untuk Supervisor...')
                    ->helperText('Wajib diisi bagi akun tingkatan Supervisor/Staff untuk mengunci scope aset wilayah mereka.'),
            ]);
    }
}
