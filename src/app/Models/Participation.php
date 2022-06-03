<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Participation extends Model
{
    use HasFactory;

    // todo add soft-deletes

    protected $attributes = [
        'confirmed' => false,
    ];

    public function affair()
    {
        return $this->belongsTo(Affair::class);
    }


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
