<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FacilityReport extends Model {
    protected $table = 'facility_reports';
    protected $fillable = [
        'user_id',
        'asset_id',
        'title',       // 👈 Tambahkan ini
        'severity',    // 👈 Tambahkan ini
        'description', // 👈 Tambahkan ini
        'rating',
        'notes',
        'photo_path',
        'status'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
     }
    public function asset(): BelongsTo {
        return $this->belongsTo(Asset::class);
     }
}
