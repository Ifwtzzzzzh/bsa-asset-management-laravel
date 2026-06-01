<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Asset extends Model {
    protected $fillable = [
        'name', 'category_id', 'branch_id', 'description',
        'serial_no', 'license_plate', 'status'
    ];

    public function category(): BelongsTo {
        return $this->belongsTo(AssetCategory::class, 'category_id');
    }

    public function branch(): BelongsTo {
        return $this->belongsTo(Branch::class);
    }

    public function inventories(): HasMany {
        return $this->hasMany(Inventory::class);
    }
    public function tasks(): HasMany {
        return $this->hasMany(Task::class);
    }
    public function facilityReports(): HasMany {
        return $this->hasMany(FacilityReport::class);
    }
    public function stockOpnames(): HasMany {
        return $this->hasMany(StockOpname::class);
    }
    public function inboundItems(): HasMany {
        return $this->hasMany(InboundItem::class);}
}