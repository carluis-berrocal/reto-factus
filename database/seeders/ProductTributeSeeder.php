<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductTribute;

class ProductTributeSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['code' => '1',  'name' => 'EXCLUIDO',               'description' => 'Excluido'],
            ['code' => '1',  'name' => 'IVA',                    'description' => 'Impuesto sobre la Ventas'],
            ['code' => '2',  'name' => 'IC',                     'description' => 'Impuesto al Consumo Departamental Nominal'],
            ['code' => '3',  'name' => 'ICA',                    'description' => 'Impuesto de Industria, Comercio y Aviso'],
            ['code' => '4',  'name' => 'INC',                    'description' => 'Impuesto Nacional al Consumo'],
            ['code' => '5',  'name' => 'ReteIVA',                'description' => 'Retención sobre el IVA'],
            ['code' => '6',  'name' => 'ReteRenta',              'description' => 'Retención sobre renta'],
            ['code' => '7',  'name' => 'ReteICA',                'description' => 'Retención sobre el ICA'],
            ['code' => '8',  'name' => 'IC Porcentual',          'description' => 'Impuesto al Consumo Departamental Porcentual'],
            ['code' => '9',  'name' => 'FtoHorticultura',        'description' => 'Cuota de Fomento Hortifrutícula'],
            ['code' => '10', 'name' => 'Timbre',                 'description' => 'Impuesto de Timbre'],
            ['code' => '11', 'name' => 'INC Bolsas',             'description' => 'Impuesto Nacional al Consumo de Bolsa Plástica'],
            ['code' => '12', 'name' => 'INCarbono',              'description' => 'Impuesto Nacional del Carbono'],
            ['code' => '13', 'name' => 'INCombustibles',         'description' => 'Impuesto Nacional a los Combustibles'],
            ['code' => '14', 'name' => 'Sobretasa Combustibles', 'description' => 'Sobretasa a los combustibles'],
            ['code' => '15', 'name' => 'Sordicom',               'description' => 'Contribución minoristas (Combustibles)'],
            ['code' => '16', 'name' => 'IC Datos',               'description' => 'Impuesto al Consumo de Datos'],
        ];

        foreach ($data as $item) {
            ProductTribute::updateOrCreate(
                ['code' => $item['code'], 'name' => $item['name']], 
                ['description' => $item['description']]
            );
        }
    }
}
