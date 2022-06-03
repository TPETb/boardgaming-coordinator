<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Affair extends Model
{
    use HasFactory;

    protected $casts = [
        'starts_at' => 'datetime'
    ];

    public function host()
    {
        return $this->belongsTo(User::class, 'host_id');
    }


    public function game()
    {
        return $this->belongsTo(Game::class);
    }


    public function participants()
    {
        return $this->belongsToMany(User::class, 'participations')->withPivot(['id']);
    }
}
