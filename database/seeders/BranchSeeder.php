<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BranchSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            [
                "name" => "Belawan",
                "type" => ["Kantor Cabang", "Fasilitas ILT"],
                "desc" => "Kantor Cabang Utama & Fasilitas ILT Sumatera Bagian Utara. Menangani logistik jalur selat Malaka komoditas andalan.",
            ],
            [
                "name" => "Dumai",
                "type" => ["Kantor Cabang"],
                "desc" => "Hub Distribusi Logistik & Gateway utama industri hilir kelapa sawit serta energi Sumatera.",
            ],
            [
                "name" => "Pekanbaru",
                "type" => ["Kantor Cabang"],
                "desc" => "Pusat Manajemen Rantai Pasok Domestik Riau, mengintegrasikan jalur darat lintas Sumatera.",
            ],
            [
                "name" => "Siak",
                "type" => ["Kantor Cabang"],
                "desc" => "Inland Container Depot strategis untuk mendukung efisiensi operasional wilayah pesisir timur.",
            ],
            [
                "name" => "Palembang",
                "type" => ["Kantor Cabang"],
                "desc" => "Fasilitas Pergudangan Strategis Sumatera Bagian Selatan dengan interkoneksi logistik jalur sungai dan darat.",
            ],
            [
                "name" => "Lampung",
                "type" => ["Kantor Cabang"],
                "desc" => "Gerbang Utama Logistik Trans-Sumatera yang menghubungkan distribusi koridor Jawa - Sumatera.",
            ],
            [
                "name" => "Jakarta",
                "type" => ["Kantor Cabang", "Fasilitas ILT"],
                "isHeadOffice" => true,
                "desc" => "Head Office PT BSA Logistics Indonesia Tbk & Integrated Logistics Terminal terluas.",
            ],
            [
                "name" => "Semarang",
                "type" => ["Kantor Cabang", "Fasilitas ILT"],
                "desc" => "Fasilitas Gudang Berikat & Pusat Distribusi Jawa Tengah, melayani koridor ekspor-impor Tanjung Emas.",
            ],
            [
                "name" => "Surabaya",
                "type" => ["Kantor Cabang", "Fasilitas ILT"],
                "desc" => "Hub Logistik Utama Indonesia Timur, mengelola terminal kontainer dan distribusi domestik terintegrasi.",
            ],
            [
                "name" => "Makassar",
                "type" => ["Kantor Cabang", "Fasilitas ILT"],
                "desc" => "Pusat Gerbang Distribusi Multimoda Sulawesi, menggerakkan logistik untuk Kawasan Timur Indonesia.",
            ],
        ];

        // 🌟 2. Bersihkan tabel branches lama terlebih dahulu agar id-nya reset dari 1 (Opsional/Aman)
        // Jika foreign key menghalangi truncate, kita bisa langsung pakai insert normal.

        $insertData = [];

        foreach ($locations as $loc) {
            // Logika penamaan: Jika Jakarta, set Head Office. Jika bukan, set Cabang.
            $isHO = $loc['isHeadOffice'] ?? false;
            $fullName = $isHO
                ? "BSA Logistics - Head Office " . $loc['name']
                : "BSA Logistics - Cabang " . $loc['name'];

            // Mengubah array tipe ['Kantor Cabang', 'Fasilitas ILT'] menjadi string "Kantor Cabang, Fasilitas ILT"
            $locationType = implode(', ', $loc['type']);

            $insertData[] = [
                'name' => $fullName,
                'location' => $locationType, // Di-render jadi badge abu-abu minimalis lo nanti
                'address' => $loc['desc'],   // Deskripsi taktis logistik masuk kolom alamat
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        // 🌟 3. Hantam massal ke dalam database MySQL bsa_asset_management lo
        DB::table('branches')->insert($insertData);
    }
}