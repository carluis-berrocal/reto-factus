<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitMeasureSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('unit_measures')->insert([
            ['code' => '70', 'name' => 'unidad'],
            ['code' => '414', 'name' => 'kilogramo'],
            ['code' => '449', 'name' => 'libra'],
            ['code' => '512', 'name' => 'metro'],
            ['code' => '874', 'name' => 'galón'],
        ]);
    }
}
