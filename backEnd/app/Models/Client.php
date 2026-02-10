<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    // This allows the Seeder to insert data into these columns
    protected $fillable = ['nom', 'email', 'password', 'role', 'tel', 'adresse'];
}