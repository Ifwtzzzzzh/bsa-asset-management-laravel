<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inventory extends Model {
    protected $fillable = ['asset_id', 'branch_id', 'current_stock', 'minimum_stock'];

    public function asset(): BelongsTo{
        return $this->belongsTo(Asset::class);
    }

    public function branch(): BelongsTo{
        return $this->belongsTo(Branch::class);
    }
}