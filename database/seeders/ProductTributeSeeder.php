<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product_tributes')->insert([
            ['code' => '01', 'name' => 'IVA', 'description' => 'Impuesto sobre la Ventas'],
            ['code' => '02', 'name' => 'IC', 'description' => 'Impuesto al Consumo Departamental Nominal'],
            ['code' => '03', 'name' => 'ICA', 'description' => 'Impuesto de Industria, Comercio y Aviso'],
            ['code' => '04', 'name' => 'INC', 'description' => 'Impuesto Nacional al Consumo'],
            ['code' => '05', 'name' => 'ReteIVA', 'description' => 'Retención sobre el IVA'],
            ['code' => '06', 'name' => 'ReteRenta', 'description' => 'Retención sobre renta'],
            ['code' => '07', 'name' => 'ReteICA', 'description' => 'Retención sobre el ICA'],
            ['code' => '08', 'name' => 'IC Porcentual', 'description' => 'Impuesto al Consumo Departamental Porcentual'],
            ['code' => '20', 'name' => 'FtoHorticultura', 'description' => 'Cuota de Fomento Hortifrutícula'],
            ['code' => '21', 'name' => 'Timbre', 'description' => 'Impuesto de Timbre'],
            ['code' => '22', 'name' => 'INC Bolsas', 'description' => 'Impuesto Nacional al Consumo de Bolsa Plástica'],
            ['code' => '23', 'name' => 'INCarbono', 'description' => 'Impuesto Nacional del Carbono'],
            ['code' => '24', 'name' => 'INCombustibles', 'description' => 'Impuesto Nacional a los Combustibles'],
            ['code' => '25', 'name' => 'Sobretasa Combustibles', 'description' => 'Sobretasa a los combustibles'],
            ['code' => '26', 'name' => 'Sordicom', 'description' => 'Contribución minoristas (Combustibles)'],
            ['code' => '30', 'name' => 'IC Datos', 'description' => 'Impuesto al Consumo de Datos'],
        ]);
    }
}
