<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIds = User::pluck('id')->toArray();
        $assetIds = Asset::pluck('id')->toArray();
        if (empty($userIds) || empty($assetIds)) {
            $this->command->warn('Seeder dilewati: Pastikan UserSeeder dan AssetSeeder sudah dieksekusi duluan!');
            return;
        }

        $tasksData = [
            [
                'type' => 'maintenance',
                'description' => 'Lakukan penggantian oli mesin rutin shell rimula, kuras filter oli, dan bersihkan filter udara pada unit armada truk cargo.',
                'status' => 'completed',
            ],
            [
                'type' => 'repair',
                'description' => 'Perbaikan darurat kebocoran seal hidrolik utama pada garpu angkat forklift. Lakukan penggantian part seal kit original komatsu.',
                'status' => 'in_progress',
            ],
            [
                'type' => 'inspection',
                'description' => 'Pengecekan kelayakan fisik berkala (KIR internal) meliputi sistem pengereman, ketebalan alur ban, dan fungsi lampu hazard sebelum unit menempuh jalur lintas Sumatra.',
                'status' => 'pending',
            ],
            [
                'type' => 'maintenance',
                'description' => 'Pemberian pelumas ulang (greasing) pada komponen rantai penggerak (chain drive) dan bearing roda hand pallet jack agar tidak macet saat loading barang.',
                'status' => 'completed',
            ],
            [
                'type' => 'repair',
                'description' => 'Perbaikan sistem kelistrikan accu (aki) drop dan dinamo starter yang macet. Unit reach truck saat ini tertahan di hanggar workshop.',
                'status' => 'in_progress',
            ],
            [
                'type' => 'inspection',
                'description' => 'Audit kelayakan operasional tahunan untuk seluruh alat berat warehouse, pastikan lolos sertifikasi K3.',
                'status' => 'pending',
            ],
        ];

        $insertData = [];
        foreach ($tasksData as $index => $task) {
            $insertData[] = [
                'user_id' => $userIds[array_rand($userIds)],
                'asset_id' => $assetIds[array_rand($assetIds)],
                'type' => $task['type'],
                'description' => $task['description'],
                'status' => $task['status'],
                'created_at' => now()->subDays(rand(1, 10)),
                'updated_at' => now(),
            ];
        }

        DB::table('tasks')->insert($insertData);
        $this->command->info('Boom! 6 Data Task Operasional berhasil disuntikkan ke database!');
    }
}
