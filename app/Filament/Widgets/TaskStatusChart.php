<?php

namespace App\Filament\Widgets;

use App\Models\Task;
use Filament\Widgets\ChartWidget;

class TaskStatusChart extends ChartWidget
{
    protected ?string $heading = 'Monitoring Progres Perbaikan Aset (Tasks)';

    // Properti ini tetap pakai 'static' karena di parent class emang statis
    protected static ?int $sort = 2;

    protected function getData(): array
    {
        // 🔥 LOGIKA INTJ: Hitung jumlah data riil langsung dari database berdasarkan statusnya
        $pendingCount = Task::where('status', 'pending')->count();
        $inProgressCount = Task::where('status', 'in_progress')->count();
        $completedCount = Task::where('status', 'completed')->count();

        return [
            'datasets' => [
                [
                    'label' => 'Jumlah Perintah Kerja (Tasks)',
                    'data' => [$pendingCount, $inProgressCount, $completedCount],
                    'backgroundColor' => [
                        '#9ca3af', // gray-400
                        '#f59e0b', // amber-500
                        '#10b981', // emerald-500
                    ],
                ],
            ],
            // Label di bagian bawah batang chart
            'labels' => ['Pending', 'In Progress', 'Completed'],
        ];
    }

    protected function getType(): string
    {
        return 'bar'; // 🔥 Mengunci tipe grafik menjadi Bar Chart (Batang)
    }
}
