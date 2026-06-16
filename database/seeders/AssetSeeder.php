<?php

namespace Database\Seeders;

use App\Models\Asset;
use App\Models\AssetCategory;
use App\Models\Branch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categoryCheck = DB::table('asset_categories')->pluck('id')->toArray();
        if (empty($categoryCheck)) {
            DB::table('asset_categories')->insert([
                ['id' => 1, 'name' => 'Vehicle / Fleet', 'description' => 'Aset berupa armada transportasi dan kendaraan operasional logistik.', 'created_at' => now(), 'updated_at' => now()],
                ['id' => 2, 'name' => 'Heavy Equipment', 'description' => 'Alat berat operasional gudang seperti forklift, reach truck, dan container handler.', 'created_at' => now(), 'updated_at' => now()],
                ['id' => 3, 'name' => 'IT Hardware', 'description' => 'Perangkat keras teknologi pendukung scan barcode dan sistem inventaris gudang.', 'created_at' => now(), 'updated_at' => now()],
                ['id' => 4, 'name' => 'Warehouse Tools', 'description' => 'Peralatan pendukung lantai gudang dan penyimpanan pallet.', 'created_at' => now(), 'updated_at' => now()],
            ]);
            $categoryIds = [1, 2, 3, 4];
        } else {
            $categoryIds = $categoryCheck;
        }

        $branchCheck = DB::table('branches')->pluck('id')->toArray();
        if (empty($branchCheck)) {
            try {
                DB::table('branches')->insert([
                    ['id' => 1, 'name' => 'BSA Logistics Jakarta HO', 'description' => 'Kantor Pusat Utama Jakarta', 'created_at' => now(), 'updated_at' => now()],
                    ['id' => 2, 'name' => 'BSA Logistics Surabaya Warehouse', 'description' => 'Gudang Hub Operasional Surabaya', 'created_at' => now(), 'updated_at' => now()],
                ]);
            } catch (\Exception $e) {
                DB::table('branches')->insert([
                    ['id' => 1, 'name' => 'BSA Logistics Jakarta HO', 'created_at' => now(), 'updated_at' => now()],
                    ['id' => 2, 'name' => 'BSA Logistics Surabaya Warehouse', 'created_at' => now(), 'updated_at' => now()],
                ]);
            }
            $branchIds = DB::table('branches')->pluck('id')->toArray();
        } else {
            $branchIds = $branchCheck;
        }

        $logisticsAssets = [
            1 => ['Hino Ranger Cargo Truck', 'Isuzu Elf Box Truck', 'Mitsubishi Fuso Wingbox'],
            2 => ['Toyota Forklift 2.5 Ton', 'Komatsu Electric Forklift', 'Caterpillar Reach Truck'],
            3 => ['Zebra Barcode Scanner Wireless', 'Honeywell Mobile Computer PDA'],
            4 => ['Hand Pallet Jack 3 Ton', 'Hydraulic Dock Leveler', 'Industrial Drum Lifter']
        ];

        $statuses = ['available', 'in_use', 'maintenance', 'disposed'];
        for ($i = 1; $i <= 50; $i++) {
            $randomCategoryId = $categoryIds[array_rand($categoryIds)];
            $availableNames = $logisticsAssets[$randomCategoryId] ?? ['General Warehouse Tools'];
            $randomName = $availableNames[array_rand($availableNames)] . ' #' . rand(10, 99);
            $serialNo = 'SN-BSA-' . (10000 + $i);
            $licensePlate = ($randomCategoryId == 1) ? 'B ' . rand(1000, 9999) . ' SAA' : null;

            Asset::create([
                'name' => $randomName,
                'category_id' => $randomCategoryId,
                'branch_id' => $branchIds[array_rand($branchIds)],
                'description' => 'Unit ' . $randomName . ' operasional resmi PT BSA Logistics Indonesia.',
                'serial_no' => $serialNo,
                'license_plate' => $licensePlate,
                'status' => $statuses[array_rand($statuses)],
                'created_at' => now()->subDays(rand(1, 30)),
                'updated_at' => now(),
            ]);
        }
    }
}
