<?php

namespace App\Http\Controllers;

use App\Services\FactusService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FactusController extends Controller
{

    public function index(Request $request)
    {
        return Inertia::render('Factus/FactusTester');
    }

    /**
     * Handle any request to the Factus API.
     *
     * @param Request $request
     * @param FactusService $factus
     * @param string $endpoint
     * @return \Illuminate\Http\JsonResponse
     */
    public function testAny(Request $request, FactusService $factus, $endpoint = '')
    {
        $method = $request->query('method', 'get');
        $fullEndpoint = 'v1/' . ltrim($endpoint, '/');

        $response = $factus->request($method, $fullEndpoint, $request->all());

        if ($response->successful()) {
            return response()->json($response->json());
        }

        return response()->json([
            'error' => true,
            'status' => $response->status(),
            'message' => $response->body(),
        ], $response->status());
    }

}
