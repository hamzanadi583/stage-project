<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Abonnement extends Model
{
    protected $fillable = ['client_id', 'date_debut', 'date_fin', 'statut', 'type'];
}
