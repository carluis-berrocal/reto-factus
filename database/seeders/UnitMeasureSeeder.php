<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UnitMeasure;

class UnitMeasureSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['code' => '70',  'name' => 'Unidad'],
            ['code' => '414', 'name' => 'Kilogramo'],
            ['code' => '449', 'name' => 'Libra'],
            ['code' => '512', 'name' => 'Metro'],
            ['code' => '874', 'name' => 'Galón'],
        ];

        foreach ($data as $item) {
            UnitMeasure::updateOrCreate(
                ['code' => $item['code']],  // Clave única
                ['name' => $item['name']]   // Campos a crear o actualizar
            );
        }
    }
}
