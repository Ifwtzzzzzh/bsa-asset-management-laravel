<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StockOpname extends Model {
    protected $table = 'stock_opnames';
    protected $fillable = [
        'user_id', 'asset_id', 'opname_date', 'system_stock',
        'physical_stock', 'adjustment_note', 'approval_status'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
     }
    public function asset(): BelongsTo {
        return $this->belongsTo(Asset::class);
     }
}