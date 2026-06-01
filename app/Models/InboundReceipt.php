<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InboundReceipt extends Model
{
    protected $table = 'inbound_receipts';
    protected $fillable = ['branch_id', 'client_id', 'receipt_date', 'document_no', 'status'];

    public function branch(): BelongsTo {
        return $this->belongsTo(Branch::class);
     }

    public function client(): BelongsTo {
        return $this->belongsTo(Client::class);
    }

    public function inboundItems(): HasMany{
        return $this->hasMany(InboundItem::class, 'receipt_id');
    }
}