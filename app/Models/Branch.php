<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model{
    protected $fillable = ['name', 'location', 'address'];

    public function users(): HasMany {
        return $this->hasMany(User::class);
    }

    public function assets(): HasMany {
        return $this->hasMany(Asset::class);
    }

    public function inventories(): HasMany {
        return $this->hasMany(Inventory::class);
    }

    public function inboundReceipts(): HasMany {
        return $this->hasMany(InboundReceipt::class);
    }
}