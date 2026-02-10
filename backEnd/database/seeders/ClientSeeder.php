<?php

namespace Database\Seeders;

use App\Models\Client;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
    Client::create([
        'nom' => 'Hamza Nadi',
        'email' => 'hamza@example.com',
        'role' => 'admin',
        'tel' => '0612345678',
        'adresse' => '123 Rue de Rabat',
    ]);

    Client::create([
        'nom' => 'Test User',
        'email' => 'user@example.com',
        'role' => 'client',
        'tel' => '0600000000',
        'adresse' => '456 Avenue Casablanca',
    ]);
    }
}
