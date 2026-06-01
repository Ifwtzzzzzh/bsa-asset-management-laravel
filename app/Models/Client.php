<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Client extends Model {
    protected $fillable = ['name', 'email', 'phone'];

    public function invoices(): HasMany {
        return $this->hasMany(Invoice::class);
     }
    public function inboundReceipts(): HasMany {
        return $this->hasMany(InboundReceipt::class);
     }
}
