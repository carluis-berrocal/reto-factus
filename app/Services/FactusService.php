<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class FactusService
{
    protected $baseUrl;
    protected $clientId;
    protected $clientSecret;
    protected $username;
    protected $password;

    public function __construct()
    {
        $this->baseUrl = config('factus.base_url');
        $this->clientId = config('factus.client_id');
        $this->clientSecret = config('factus.client_secret');
        $this->username = config('factus.username');
        $this->password = config('factus.password');
    }

    public function authenticate()
    {
        $response = Http::asForm()->post("{$this->baseUrl}/oauth/token", [
            'grant_type' => 'password',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'username' => $this->username,
            'password' => $this->password,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            Cache::put('factus_access_token', $data['access_token'], now()->addSeconds($data['expires_in'] - 60));
            Cache::put('factus_refresh_token', $data['refresh_token']);
            return $data['access_token'];
        }

        throw new \Exception('Error al autenticar con Factus: ' . $response->body());
    }

    public function refreshToken()
    {
        $refreshToken = Cache::get('factus_refresh_token');

        $response = Http::asForm()->post("{$this->baseUrl}/oauth/token", [
            'grant_type' => 'refresh_token',
            'client_id' => $this->clientId,
            'client_secret' => $this->clientSecret,
            'refresh_token' => $refreshToken,
        ]);

        if ($response->successful()) {
            $data = $response->json();
            Cache::put('factus_access_token', $data['access_token'], now()->addSeconds($data['expires_in'] - 60));
            Cache::put('factus_refresh_token', $data['refresh_token']);
            return $data['access_token'];
        }

        // Si falla el refresh, intenta autenticarse nuevamente
        return $this->authenticate();
    }

    public function getAccessToken()
    {
        if (Cache::has('factus_access_token')) {
            return Cache::get('factus_access_token');
        }

        return $this->authenticate();
    }

    public function request($method, $endpoint, $data = [])
    {

        $token = $this->getAccessToken();
        
        $response = Http::withToken($token)->{$method}("{$this->baseUrl}/{$endpoint}", $data);

        if ($response->unauthorized()) {
            $token = $this->refreshToken();
            $response = Http::withToken($token)->{$method}("{$this->baseUrl}/{$endpoint}", $data);
        }

        return $response;
    }
}
