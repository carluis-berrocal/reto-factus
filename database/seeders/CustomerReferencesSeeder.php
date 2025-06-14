<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\IdentificationDocument;
use App\Models\LegalOrganization;
use App\Models\Tribute;

class CustomerReferencesSeeder extends Seeder
{
    public function run(): void
    {
        // Tipos de documentos de identidad
        $documents = [
            ['id' => 1,  'name' => 'Registro civil', 'code' => 'RC'],
            ['id' => 2,  'name' => 'Tarjeta de identidad', 'code' => 'TI'],
            ['id' => 3,  'name' => 'Cédula de ciudadanía', 'code' => 'CC'],
            ['id' => 4,  'name' => 'Tarjeta de extranjería', 'code' => 'TE'],
            ['id' => 5,  'name' => 'Cédula de extranjería', 'code' => 'CE'],
            ['id' => 6,  'name' => 'NIT', 'code' => 'NIT'],
            ['id' => 7,  'name' => 'Pasaporte', 'code' => 'PA'],
            ['id' => 8,  'name' => 'Documento de identificación extranjero', 'code' => 'DIE'],
            ['id' => 9,  'name' => 'PEP', 'code' => 'PEP'],
            ['id' => 10, 'name' => 'NIT otro país', 'code' => 'NOP'],
            ['id' => 11, 'name' => 'NUIP', 'code' => 'NUIP'],
        ];

        foreach ($documents as $doc) {
            IdentificationDocument::updateOrCreate(['id' => $doc['id']], $doc);
        }

        // Tipos de organizaciones
        $organizations = [
            ['id' => 1, 'name' => 'Persona Jurídica'],
            ['id' => 2, 'name' => 'Persona Natural'],
        ];

        foreach ($organizations as $org) {
            LegalOrganization::updateOrCreate(['id' => $org['id']], $org);
        }

        // Tributos
        $tributes = [
            ['code' => 18, 'name' => 'IVA'],
            ['code' => 21, 'name' => 'No aplica'],
        ];

        foreach ($tributes as $tribute) {
            Tribute::updateOrCreate(['code' => $tribute['code']], $tribute);
        }
    }
}
