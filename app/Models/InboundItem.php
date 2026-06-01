<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InboundItem extends Model {
    protected $table = 'inbound_items';

    protected $fillable = ['receipt_id', 'asset_id', 'quantity', 'condition'];

    public function inboundReceipt(): BelongsTo
    {
        return $this->belongsTo(InboundReceipt::class, 'receipt_id');
    }

    public function asset(): BelongsTo
    {
        return $this->belongsTo(Asset::class);
    }
}