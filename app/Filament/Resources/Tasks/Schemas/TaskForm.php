<?php

namespace App\Filament\Resources\Tasks\Schemas;

use App\Models\Asset;
use App\Models\FacilityReport;
use App\Models\User;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;

class TaskForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('asset_id')
                    ->label('Asset Unit')
                    ->options(fn () => Asset::pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required()
                    ->helperText('Pilih armada atau alat berat yang akan diberikan penugasan.'),

                Select::make('type')
                    ->label('Jenis Penugasan (Type)')
                    ->required()
                    ->options([
                        'maintenance' => 'Routine Maintenance (Perawatan Rutin)',
                        'repair' => 'Heavy Repair (Perbaikan Kerusakan)',
                        'inspection' => 'Safety Inspection (Pengecekan Fisik)',
                    ])
                    ->default('maintenance')
                    ->helperText('Tentukan rumpun aktivitas operasional tugas ini.'),

                Textarea::make('description')
                    ->label('Deskripsi / Instruksi Kerja')
                    ->required()
                    ->placeholder('Contoh: Lakukan penggantian oli mesin dan kuras filter hidrolik roda kanan...')
                    ->helperText('Wajib diisi. Tuliskan detail instruksi kerja penugasan secara jelas.'),

                Select::make('status')
                    ->label('Status Progres')
                    ->required()
                    ->options([
                        'pending' => 'Pending (Menunggu Antrean)',
                        'in_progress' => 'In Progress (Sedang Dikerjakan)',
                        'completed' => 'Completed (Selesai / Tugas Kelar)',
                    ])
                    ->default('pending')
                    ->helperText('Status alur kerja eksekusi tugas di lapangan.'),

                Select::make('user_id')
                    ->label('Penanggung Jawab / Eksekutor')
                    ->options(fn () => User::pluck('name', 'id'))
                    ->searchable()
                    ->preload()
                    ->required()
                    ->default(fn () => Auth::id())
                    ->helperText('Pilih karyawan yang ditugaskan untuk menyelesaikan perintah kerja ini.'),
            ]);
    }
}
