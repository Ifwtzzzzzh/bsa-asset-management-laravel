<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FacilityReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIds = User::pluck('id')->toArray();
        $assetIds = Asset::pluck('id')->toArray();

        // Antisipasi jika data user atau asset ternyata kosong di DB lo
        if (empty($userIds) || empty($assetIds)) {
            $this->command->warn('Seeder dilewati: Pastikan UserSeeder dan AssetSeeder sudah dijalankan terlebih dahulu!');
            return;
        }

        // 🌟 2. Siapkan narasi catatan kerusakan riil ala operasional gudang BSA Logistics
        $dumpNotes = [
            [
                'rating' => 2,
                'notes' => 'Silinder hidrolik utama mengalami kebocoran oli pekat yang cukup deras setelah digunakan bongkar muat kontainer selama 4 jam. Tekanan angkat menurun drastis.',
                'status' => 'pending'
            ],
            [
                'rating' => 1,
                'notes' => 'Armada mogok total di jalur Trans-Sumatera. Indikator temperatur mesin mendadak overheat dan keluar asap putih dari kap mesin. Butuh towing ke bengkel rekanan terdekat.',
                'status' => 'approved'
            ],
            [
                'rating' => 4,
                'notes' => 'Lampu sorot kabin bagian depan sebelah kanan mati total. Sangat mengganggu pandangan operator saat giliran shift malam (loading malam hari di area yard).',
                'status' => 'resolved'
            ],
            [
                'rating' => 3,
                'notes' => 'Rantai penggerak (chain drive) mengeluarkan bunyi derit besi bergesekan yang sangat kasar saat garpu dinaikkan. Butuh pelumasan ulang atau pengecekan kelonggaran link.',
                'status' => 'pending'
            ],
            [
                'rating' => 2,
                'notes' => 'Rem tangan (handbrake) sudah tidak menggigit sama sekali saat unit berhenti di area tanjakan ramp gudang. Sangat berbahaya bagi safety operasional lantai gudang.',
                'status' => 'approved'
            ],
            [
                'rating' => 5,
                'notes' => 'Pengecekan rutin bulanan: Ditemukan goresan kosmetik ringan di body samping kanan akibat serempetan minor dengan palet kayu. Fungsi mekanis 100% aman dan layak pakai.',
                'status' => 'resolved'
            ],
            [
                'rating' => 1,
                'notes' => 'Ban dalam roda belakang pecah robek besar akibat melindas paku ulir baja di area depo kontainer. Unit tidak bisa dipaksakan bergerak, butuh penggantian ban luar-dalam baru.',
                'status' => 'rejected'
            ]
        ];

        $insertData = [];

        // 🌟 3. Looping data laporan ke dalam array insert massal
        foreach ($dumpNotes as $index => $data) {
            $insertData[] = [
                // Mengambil ID acak dari data user & asset lo yang nyata di DB
                'user_id' => $userIds[array_rand($userIds)],
                'asset_id' => $assetIds[array_rand($assetIds)],
                'rating' => $data['rating'],
                'notes' => $data['notes'],
                // Path foto dummy yang terformat rapi agar tidak memicu broken image di UI lo
                'photo_path' => 'facility-reports/dummy-crack-' . ($index + 1) . '.jpg',
                'status' => $data['status'],
                'created_at' => now()->subDays(rand(1, 15)), // Variasi tanggal mundur biar grafik analytics lo nanti estetik
                'updated_at' => now(),
            ];
        }

        // 🌟 4. Hantam massal langsung ke tabel database lo
        DB::table('facility_reports')->insert($insertData);

        $this->command->info('Boom! 7 Laporan Kerusakan Aset berhasil disuntikkan ke database!');
    }
}
