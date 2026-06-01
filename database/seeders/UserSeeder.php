<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        $headOffice = Branch::create([
            'name' => 'BSA Logistics - Head Office Jakarta',
            'location' => 'Jakarta Pusat',
            'address' => 'Jl. Jend. Sudirman No. 1, Gelora, Tanah Abang'
        ]);

        $gudangTanjungPriok = Branch::create([
            'name' => 'BSA Logistics - Hub Tanjung Priok',
            'location' => 'Tanjung Priok',
            'address' => 'Jl. Laksda Yos Sudarso No. 12, Tanjung Priok'
        ]);

        User::create([
            'branch_id' => $headOffice->id,
            'name' => 'Horus Admin Ho',
            'role' => 'admin',
            'email' => 'admin@bsa.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'branch_id' => $gudangTanjungPriok->id,
            'name' => 'Russ Supervisor Tanjung Priok',
            'role' => 'supervisor',
            'email' => 'supervisor@bsa.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'branch_id' => $gudangTanjungPriok->id,
            'name' => 'Ferrus Operator Lapangan',
            'role' => 'staff',
            'email' => 'staff@bsa.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);

        User::create([
            'branch_id' => $gudangTanjungPriok->id,
            'name' => 'PT Trans Cargo Indonesia (Client)',
            'role' => 'client',
            'email' => 'client@bsa.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);
    }
}