<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Municipality;
use App\Services\FactusService;

class SyncMunicipalities extends Command
{
    protected $signature = 'municipalities:sync';
    protected $description = 'Sincroniza municipios desde la API de Factus';

    protected $factusService;

    public function __construct(FactusService $factusService)
    {
        parent::__construct();
        $this->factusService = $factusService;
    }

    public function handle()
    {
        $this->info('Sincronizando municipios desde Factus...');

        try {
            $response = $this->factusService->request('get', 'v1/municipalities');

            if (!$response->successful()) {
                $this->error('Error al obtener municipios: ' . $response->body());
                return 1;
            }

            $data = $response->json('data');

            if (!is_array($data)) {
                $this->error('Formato de datos inválido.');
                return 1;
            }

            $bar = $this->output->createProgressBar(count($data));
            $bar->start();

            foreach ($data as $municipio) {
                Municipality::updateOrCreate(
                    ['code' => $municipio['code']],
                    [
                        'name' => $municipio['name'],
                        'department' => $municipio['department'],
                    ]
                );
                $bar->advance();
            }

            $bar->finish();
            $this->newLine();
            $this->info('Municipios sincronizados correctamente.');
        } catch (\Exception $e) {
            $this->error('Excepción al sincronizar municipios: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
}
